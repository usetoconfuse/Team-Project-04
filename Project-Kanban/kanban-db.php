<?php


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$sql = "SELECT * FROM Tasks WHERE Project_ID = $projectId AND Assignee_ID = $userId";


$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Query failed " . mysqli_error($conn));
}

$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>