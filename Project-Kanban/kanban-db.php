<?php

//NEW PLAN:
//When we click View button, don't do the fetch request then, but we
//add to the URL the project ID (attribute of the card). 

//Do the Fetch request when the new kanban page opens and then
//In Kanban JS we do the fetch request to get all data and populate the page.
//The fetch request in Kanban JS will take in a parameter whcih is the
//project ID which can be gotten from the URL. 


include '../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

$sql = "SELECT * FROM Tasks WHERE project_id = $projectId AND assignee_id = $userId";


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