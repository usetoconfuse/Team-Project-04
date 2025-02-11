<?php


include '../../config/db-setup.php';

$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

//Emp Dashboard Stats Query
$empTaskSQL = "SELECT t.*, p.Project_ID, p.Project_Title, u.Forename, u.Surname
                FROM Tasks t
                JOIN Projects p ON t.Project_ID = p.Project_ID
                JOIN Users u ON t.Author_ID = u.User_ID
                WHERE t.Assignee_ID = $userId
                AND t.Start_Date <= CURDATE();";



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