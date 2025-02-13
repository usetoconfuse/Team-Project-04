<?php

include '../config/db-setup.php';

$projectID = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;

//Emp Dashboard Stats Query
$projectTaskSQL = "SELECT * FROM Tasks WHERE Project_ID = '$projectID'";



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