<?php


include '../../config/db-setup.php';

$statusData = json_decode(file_get_contents("php://input"), true);

if (isset($statusData['Task_ID']) && isset($statusData['Status'])) {
    $task_id = $statusData['Task_ID'];
    $status = $statusData['Status'];

    $updateStatusSQL = "UPDATE Personal_Tasks SET Status = ? WHERE PersonalTask_ID = ?";

    $stmt = $conn->prepare($updateStatusSQL);
    $stmt->bind_param("si", $status, $task_id);
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