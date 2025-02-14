<?php

include '../config/db-setup.php';

$taskID = isset($_GET['taskID']) ? intval($_GET['taskID']) : null;

//Emp Dashboard Stats Query
$projectTaskSQL = "DELETE FROM Tasks WHERE Task_ID = $taskID";



if (!mysqli_query($conn, $projectTaskSQL)) {

    echo json_encode(["success" => false, "message" => "Task not deleted successfully"]);
    exit();
}

echo json_encode(["success" => true, "message" => "Task deleted successfully"]);

?>