<?php

include '../config/db-setup.php';

$stuckData = json_decode(file_get_contents("php://input"), true);


if (isset($stuckData['Task_ID'])) {
    $task_id = $stuckData['Task_ID'];


    $updateStuckSQL = "UPDATE Tasks SET Stuck = 1 WHERE Task_ID = ?";

    $stmt = $conn->prepare($updateStuckSQL);
    $stmt->bind_param("i", $task_id);
    if ($stmt->execute()) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }

    $stmt->close();

} else {
    http_response_code(404);
}



?>