<?php


include '../../config/db-setup.php';

$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;
$priority = isset($_GET['filterPriority']) ? $_GET['filterPriority'] : null;
$date = isset($_GET['filterDate']) ? $_GET['filterDate'] : null;
$stuck = isset($_GET['filterStuck']) ? $_GET['filterStuck'] : null;
$orderBy = isset($_GET['orderByValue']) ? $_GET['orderByValue'] : null;


//Emp Dashboard Stats Query
$empTaskSQL = "SELECT t.*, p.Project_ID, p.Project_Title, u.Forename, u.Surname
                FROM Tasks t
                JOIN Projects p ON t.Project_ID = p.Project_ID
                JOIN Users u ON t.Author_ID = u.User_ID
                WHERE t.Assignee_ID = $userId
                AND t.Start_Date <= CURDATE()";

if (!empty($priority)) {
    $empTaskSQL .= " AND t.Priority = '$priority'";
}

if (!empty($date)) {
    switch ($date) {
        case 'Today':
            $empTaskSQL .= " AND t.Due_Date = CURDATE()";
            break;
        case 'Tomorrow':
            $empTaskSQL .= " AND t.Due_Date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)";
            break;
        case 'This Week':
            $empTaskSQL .= " AND YEARWEEK(t.Due_Date, 1) = YEARWEEK(CURDATE(), 1)";
            break;
        case 'Next Week':
            $empTaskSQL .= " AND t.Due_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 WEEK)";
            break;
        case 'Later':
            $empTaskSQL .= " AND t.Due_Date > CURDATE()";
            break;
        default:
            break;
    }
}

if (!empty($stuck)) {
    switch ($stuck) {
        case 'Yes':
            $empTaskSQL .= " AND t.Stuck IN (1,2)";
            break;
        case 'No':
            $empTaskSQL .= " AND t.Stuck = 0";
            break;
        default:
            break;
    }
}

if ($orderBy !== 'None') {
    if (!empty($orderBy)) {
        switch ($orderBy) {
            case 'Priority High to Low':
                $empTaskSQL .= " ORDER BY t.Priority DESC";
                break;
            case 'Priority Low to High':
                $empTaskSQL .= " ORDER BY t.Priority ASC";
                break;
            case 'Due First':
                $empTaskSQL .= " ORDER BY t.Due_Date ASC";
                break;
            case 'Due Last':
                $empTaskSQL .= " ORDER BY t.Due_Date DESC";
                break;
            case 'Most Overdue':
                $empTaskSQL .= " ORDER BY t.Due_Date ASC";
                break;
            default:
                break;
        }
    }
}

$empTaskResult = mysqli_query($conn, $empTaskSQL);

if (!$empTaskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$empTaskData = array();
while ($row = mysqli_fetch_array($empTaskResult, MYSQLI_ASSOC)) {
    $empTaskData[] = $row;
}

echo json_encode($empTaskData);
?>