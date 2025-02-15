<?php

include '../config/db-setup.php';

$taskData = json_decode(file_get_contents("php://input"), true);

/*

Data Received from Frontend:
Name: taskName,
Description: taskDescription,
Status: "To Do",
Due_Date: taskDueDate,
Priority: taskPriority,
Author_ID: authorID,
Project_ID: projectID,
Assignee_ID: Assignee_ID,
Man_Hours: manHours,
Start_Date: startDate,

*/

if (isset($taskData['Name']) && isset($taskData['Description']) && isset($taskData['Status']) && isset($taskData['Due_Date']) && isset($taskData['Priority']) && isset($taskData['Author_ID']) && isset($taskData['Project_ID']) && isset($taskData['Assignee_ID']) && isset($taskData['Man_Hours']) && isset($taskData['Start_Date'])) {
    $name = $taskData['Name'];
    $description = $taskData['Description'];
    $status = $taskData['Status'];
    $due_date = $taskData['Due_Date'];
    $priority = $taskData['Priority'];
    $author_id = $taskData['Author_ID'];
    $project_id = $taskData['Project_ID'];
    $assignee_id = $taskData['Assignee_ID'];
    $man_hours = $taskData['Man_Hours'];
    $start_date = $taskData['Start_Date'];

    $insertTaskSQL = "INSERT INTO Tasks (Name, Description, Status, Due_Date, Priority, Author_ID, Project_ID, Assignee_ID, Man_Hours, Start_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($insertTaskSQL);
    $stmt->bind_param("sssssiiiis", $name, $description, $status, $due_date, $priority, $author_id, $project_id, $assignee_id, $man_hours, $start_date);
    if ($stmt->execute()) {
        // Add user to User_Teams table if not already present
        $checkUserTeamSQL = "SELECT * FROM User_Teams WHERE Project_ID = ? AND User_ID = ?";
        $checkStmt = $conn->prepare($checkUserTeamSQL);
        $checkStmt->bind_param("ii", $project_id, $assignee_id);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows === 0) {
            $insertUserTeamSQL = "INSERT INTO User_Teams (Project_ID, User_ID) VALUES (?, ?)";
            $insertStmt = $conn->prepare($insertUserTeamSQL);
            $insertStmt->bind_param("ii", $project_id, $assignee_id);
            $insertStmt->execute();
            $insertStmt->close();
        }

        $checkStmt->close();

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