<?php


include '../../config/db-setup.php';

$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

//Emp Dashboard Stats Query
$statsSQL = "SELECT
                COUNT(CASE WHEN Status = 'To Do' THEN 1 END) AS to_do_count,
                COUNT(CASE WHEN Status = 'In Progress' THEN 1 END) AS in_progress_count,
                COUNT(CASE WHEN Status = 'Completed' THEN 1 END) AS completed_count,
                COUNT(CASE WHEN Due_Date < CURDATE() AND status <> 'Completed' THEN 1 END) AS overdue_count 
            FROM Tasks
            WHERE Assignee_ID = $userId;";



$statsResult = mysqli_query($conn, $statsSQL);

if (!$statsResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$statsDataArray = array();
while ($row = mysqli_fetch_array($statsResult, MYSQLI_ASSOC)) {
    $statsDataArray[] = $row;
}

//Emp Dashboard Stats Query
$personalTasksSQL = "SELECT Name, Priority
                     FROM Tasks
                     WHERE Assignee_ID = $userId
                     ORDER BY Priority DESC
                     LIMIT 3";



$personalTasksResult = mysqli_query($conn, $personalTasksSQL);

if (!$personalTasksResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$tasksDataArray = array();
while ($row = mysqli_fetch_array($personalTasksResult, MYSQLI_ASSOC)) {
    $tasksDataArray[] = $row;
}

//Combine both queries into one array
$allEmpDashData = array("stats" => $statsDataArray, "personalTasks" => $tasksDataArray);

echo json_encode($allEmpDashData);
?>