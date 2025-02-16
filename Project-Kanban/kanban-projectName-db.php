<?php


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;



$projectNameSQL = "SELECT Project_Title, Due_Date
            FROM Projects
            WHERE Project_ID = $projectId";


$projectNameResult = mysqli_query($conn, $projectNameSQL);

if (!$projectNameResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$projectNameDataArray = array();
while ($row = mysqli_fetch_array($projectNameResult, MYSQLI_ASSOC)) {
    $projectNameDataArray[] = $row;
}

echo json_encode($projectNameDataArray);
?>