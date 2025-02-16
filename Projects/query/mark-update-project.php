<?php

include '../../config/db-setup.php';

$projectData = json_decode(file_get_contents("php://input"), true);

if (isset($projectData['projectID']) && isset($projectData['status'])) {
    $projectID = $projectData['projectID'];
    $status = $projectData['status'];


    if ($status === 'complete') {
        $markStatusSQL = "UPDATE Projects SET Completion_Date = NOW() WHERE Project_ID = ?";
        $stmt = $conn->prepare($markStatusSQL);
        $stmt->bind_param("i", $projectID);
    } else if ($status === 'archive') {
        $markStatusSQL = "UPDATE Projects SET Status = 'Archived' WHERE Project_ID = ?";
        $stmt = $conn->prepare($markStatusSQL);
        $stmt->bind_param("i", $projectID);
    }


    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Project marked as complete successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to mark project as complete"]);
    }

    $stmt->close();

} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();

?>