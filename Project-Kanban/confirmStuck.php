<?php

include '../config/db-setup.php';

$stuckData = json_decode(file_get_contents("php://input"), true);


if (isset($stuckData['Task_ID']) && isset($stuckData['Stuck_Status'])) {
    $task_id = $stuckData['Task_ID'];
    $stuck_status = $stuckData['Stuck_Status'];

    $updateStuckSQL = "UPDATE Tasks SET Stuck = ? WHERE Task_ID = ?";

    $stmt = $conn->prepare($updateStuckSQL);
    $stmt->bind_param("si", $stuck_status, $task_id);
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