<?php

include '../config/db-setup.php';

$projectID = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;

//Emp Dashboard Stats Query
$projectTaskSQL = "
    SELECT 
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
        Tasks.Project_ID = $projectID;
";

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