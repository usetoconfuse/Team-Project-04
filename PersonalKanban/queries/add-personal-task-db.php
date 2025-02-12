<?php

include '../../config/db-setup.php';

$taskData = json_decode(file_get_contents("php://input"), true);

if (isset($taskData['Name']) && isset($taskData['Description']) && isset($taskData['Priority']) && isset($taskData['Due_Date']) && isset($taskData['User_ID']) && isset($taskData['Status'])) {
    $name = $taskData['Name'];
    $description = $taskData['Description'];
    $priority = $taskData['Priority'];
    $due_date = $taskData['Due_Date'];
    $user_id = $taskData['User_ID'];
    $status = $taskData['Status'];

    $insertTaskSQL = "INSERT INTO personal_tasks (Name, Description, Priority, Due_Date, User_ID, Status) VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($insertTaskSQL);
    $stmt->bind_param("ssssis", $name, $description, $priority, $due_date, $user_id, $status);
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