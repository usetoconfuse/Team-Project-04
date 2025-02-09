<?php


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$priority = isset($_GET['priorityValue']) ? $_GET['priorityValue'] : null;
$date = isset($_GET['dateValue']) ? $_GET['dateValue'] : null;
$stuck = isset($_GET['stuckValue']) ? $_GET['stuckValue'] : null;
$orderBy = isset($_GET['orderByValue']) ? $_GET['orderByValue'] : null;

$taskSQL = "SELECT t.Task_ID, t.Name, t.Description, t.Status, t.Due_Date, t.Start_Date, t.Priority, t.Author_ID, t.Stuck, t.Project_ID,
            t.Assignee_ID, p.Project_Title, u1.Forename AS User_Forename, u1.Surname AS User_Surname, u2.Forename AS Author_Forename, u2.Surname AS Author_Surname
            FROM Tasks t
            JOIN Projects p ON t.Project_ID = p.Project_ID
            LEFT JOIN Users u1 ON t.Assignee_ID = u1.User_ID
            LEFT JOIN Users u2 ON t.Author_ID = u2.User_ID
            WHERE t.Project_ID = $projectId AND t.Assignee_ID = $userId AND t.Start_Date <= CURDATE()";

if (!empty($priority)) {
    $taskSQL .= " AND t.Priority = '$priority'";  
}

if (!empty($date)) {
    switch ($date) {
        case 'Today':
            $taskSQL .= " AND t.Due_Date = CURDATE()";
            break;
        case 'Tomorrow':
            $taskSQL .= " AND t.Due_Date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)";
            break;
        case 'This Week':
            $taskSQL .= " AND YEARWEEK(t.Due_Date, 1) = YEARWEEK(CURDATE(), 1)";
            break;
        case 'Next Week':
            $taskSQL .= " AND t.Due_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 WEEK)";
            break;
        case 'Later':
            $taskSQL .= " AND t.Due_Date > CURDATE()";
            break;
        default:
            break;
    }
}

if (!empty($stuck)) {
    switch ($stuck) {
        case 'Yes':
            $taskSQL .= " AND t.Stuck IN (1, 2)";
            break;
        case 'No':
            $taskSQL .= " AND t.Stuck = 0";
            break;
        default:
            break;
    }
}

if ($orderBy !== 'None') {
    if (!empty($orderBy)) {
        switch ($orderBy) {
            case 'Priority High to Low':
                $taskSQL .= " ORDER BY t.Priority DESC";
                break;
            case 'Priority Low to High':
                $taskSQL .= " ORDER BY t.Priority ASC";
                break;
            case 'Due First':
                $taskSQL .= " ORDER BY t.Due_Date ASC";
                break;
            case 'Due Last':
                $taskSQL .= " ORDER BY t.Due_Date DESC";
                break;
            case 'Most Overdue':
                $taskSQL .= " ORDER BY t.Due_Date ASC";
                break;
            default: 
                break;
        }
    }
}


$taskResult = mysqli_query($conn, $taskSQL);

if (!$taskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$taskDataArray = array();
while ($row = mysqli_fetch_array($taskResult, MYSQLI_ASSOC)) {
    $taskDataArray[] = $row;
}

echo json_encode($taskDataArray);
?>