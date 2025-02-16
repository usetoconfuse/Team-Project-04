<?php


include '../config/db-setup.php';

$statusData = json_decode(file_get_contents("php://input"), true);

if (isset($statusData['Task_ID']) && isset($statusData['Status'])) {
    $task_id = $statusData['Task_ID'];
    $status = $statusData['Status'];
    if ($status == 'Completed') {
        $comp_date = date("Y-m-d");
    }
    else {
        $comp_date = null;
    }

    $updateStatusSQL = "UPDATE Tasks SET Status = ?, Completion_Date = ? WHERE Task_ID = ?";

    $stmt = $conn->prepare($updateStatusSQL);
    $stmt->bind_param("ssi", $status, $comp_date, $task_id);
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