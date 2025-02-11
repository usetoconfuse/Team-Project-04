<?php


include '../../config/db-setup.php';


$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$taskSQL = "SELECT * FROM personal_tasks WHERE User_ID = $userId";

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