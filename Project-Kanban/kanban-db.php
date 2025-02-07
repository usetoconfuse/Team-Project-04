<?php


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$priority = isset($_GET['priorityValue']) ? $_GET['priorityValue'] : null;

$taskSQL = "SELECT t.Task_ID, t.Name, t.Description, t.Status, t.Due_Date, t.Priority, t.Author_ID, t.Stuck, t.Project_ID,
            t.Assignee_ID, p.Project_Title, u1.Forename AS User_Forename, u1.Surname AS User_Surname, u2.Forename AS Author_Forename, u2.Surname AS Author_Surname
            FROM Tasks t
            JOIN Projects p ON t.Project_ID = p.Project_ID
            LEFT JOIN Users u1 ON t.Assignee_ID = u1.User_ID
            LEFT JOIN Users u2 ON t.Author_ID = u2.User_ID
            WHERE t.Project_ID = $projectId AND t.Assignee_ID = $userId";

if (!empty($priority)) {
    $taskSQL .= " AND t.Priority = '$priority'";  
}

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