<?php

include '../config/db-setup.php';

$taskData = json_decode(file_get_contents("php://input"), true);

if (isset($taskData['Name']) && isset($taskData['Description']) && isset($taskData['Priority']) && isset($taskData['Due_Date']) && isset($taskData['Assignee_ID']) && isset($taskData['Task_ID'])) {
    $name = $taskData['Name'];
    $description = $taskData['Description'];
    $priority = $taskData['Priority'];
    $due_date = $taskData['Due_Date'];
    $assignee_id = $taskData['Assignee_ID'];
    $task_id = $taskData['Task_ID'];
    $updateTaskSQL = "UPDATE Tasks SET Name = ?, Description = ?, Priority = ?, Due_Date = ?, Assignee_ID = ? WHERE Task_ID = ?";


    $stmt = $conn->prepare($updateTaskSQL);
    $stmt->bind_param("ssssii", $name, $description, $priority, $due_date, $assignee_id, $task_id);
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Task added successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to add task"]);
    }

    $stmt->close();

} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();

?>