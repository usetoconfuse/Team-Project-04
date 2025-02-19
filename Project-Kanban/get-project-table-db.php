<?php
session_start();
include '../config/db-setup.php';

$projectID = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;

$priority = isset($_GET['filterPriority']) ? $_GET['filterPriority'] : null;
$date = isset($_GET['filterDate']) ? $_GET['filterDate'] : null;
$stuck = isset($_GET['filterStuck']) ? $_GET['filterStuck'] : null;
$orderBy = isset($_GET['orderByValue']) ? $_GET['orderByValue'] : null;


//Emp Dashboard Stats Query
$projectTaskSQL = "SELECT
        Tasks.*, 
        assignee.forename AS assignee_forename, 
        assignee.surname AS assignee_surname, 
        assigned_by.forename AS assigned_by_forename, 
        assigned_by.surname AS assigned_by_surname 
    FROM 
        Tasks 
    LEFT JOIN 
        Users AS assignee ON Tasks.Assignee_ID = assignee.user_id 
    LEFT JOIN 
        Users AS assigned_by ON Tasks.Author_ID = assigned_by.user_id 
    WHERE 
        Tasks.Project_ID = $projectID";



if (!empty($priority)) {
    $projectTaskSQL .= " AND Tasks.Priority = '$priority'";
}

if (!empty($date)) {
    switch ($date) {
        case 'Today':
            $projectTaskSQL .= " AND Tasks.Due_Date = CURDATE()";
            break;
        case 'Tomorrow':
            $projectTaskSQL .= " AND Tasks.Due_Date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)";
            break;
        case 'This Week':
            $projectTaskSQL .= " AND YEARWEEK(t.Due_Date, 1) = YEARWEEK(CURDATE(), 1)";
            break;
        case 'Next Week':
            $projectTaskSQL .= " AND Tasks.Due_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 WEEK)";
            break;
        case 'Later':
            $projectTaskSQL .= " AND Tasks.Due_Date > CURDATE()";
            break;
        default:
            break;
    }
}

// 0 = not stuck
// 1 = stuck: raised to team leader
// 2 = stuck: raised to admin
if (!empty($stuck)) {
    switch ($stuck) {
        case 'Yes':
            if ($_SESSION['role'] == 'Admin') {
                $projectTaskSQL .= " AND Tasks.Stuck = 2";
            } else {
                $projectTaskSQL .= " AND Tasks.Stuck IN (1, 2)";
            }
            break;
        case 'No':
            if ($_SESSION['role'] == 'Admin') {
                $projectTaskSQL .= " AND Tasks.Stuck IN (0, 1)";
            } else {
                $projectTaskSQL .= " AND Tasks.Stuck = 0";
            }
            break;
        default:
            break;
    }
}

if ($orderBy !== 'None') {
    if (!empty($orderBy)) {
        switch ($orderBy) {
            case 'Priority High to Low':
                $projectTaskSQL .= " ORDER BY Tasks.Priority DESC";
                break;
            case 'Priority Low to High':
                $projectTaskSQL .= " ORDER BY Tasks.Priority ASC";
                break;
            case 'Due First':
                $projectTaskSQL .= " ORDER BY Tasks.Due_Date ASC";
                break;
            case 'Due Last':
                $projectTaskSQL .= " ORDER BY Tasks.Due_Date DESC";
                break;
            case 'Most Overdue':
                $projectTaskSQL .= " ORDER BY Tasks.Due_Date ASC";
                break;
            default:
                break;
        }
    }
}

$projectTaskResult = mysqli_query($conn, $projectTaskSQL);

if (!$projectTaskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$projectTaskData = array();
while ($row = mysqli_fetch_array($projectTaskResult, MYSQLI_ASSOC)) {
    $projectTaskData[] = $row;
}

echo json_encode($projectTaskData);

?>