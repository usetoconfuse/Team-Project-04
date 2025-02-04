<?php


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$taskSQL = "SELECT * FROM Tasks WHERE Project_ID = $projectId AND Assignee_ID = $userId";


$taskResult = mysqli_query($conn, $taskSQL);

if (!$taskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$taskDataArray = array();
while ($row = mysqli_fetch_array($taskResult, MYSQLI_ASSOC)) {
    $taskDataArray[] = $row;
}

//Project SQL
$projectNameSQL = "SELECT Project_Title FROM Projects WHERE Project_ID = $projectId";

$projectNameResult = mysqli_query($conn, $projectNameSQL);

if (!$projectNameResult) {
    die("Query failed for Project Results" . mysqli_error($conn));
}

$projectDataArray = array();
while ($row = mysqli_fetch_array($projectNameResult, MYSQLI_ASSOC)) {
    $projectDataArray[] = $row;
}

//Combined
$allDataArray = array("tasks" => $taskDataArray, "project" => $projectDataArray);


echo json_encode($allDataArray);
?>