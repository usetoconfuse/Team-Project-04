<?php
include '../config/db-setup.php';

$userID = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$sql = "SELECT Projects.*, COUNT(Tasks.Task_ID) AS Task_Count FROM `User_Teams`
        INNER JOIN Projects ON User_Teams.Team_ID = Projects.Team_ID
        LEFT JOIN Tasks ON Projects.Project_ID = Tasks.Project_ID AND (Tasks.Status = 'To Do' OR Tasks.Status = 'In Progress')
        WHERE User_ID = $userID
        GROUP BY Projects.Project_ID;";


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