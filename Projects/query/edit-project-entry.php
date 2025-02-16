<?php

include '../../config/db-setup.php';

$projectData = json_decode(file_get_contents("php://input"), true);

if (isset($projectData['projectId']) && isset($projectData['title']) && isset($projectData['leader']) && isset($projectData['start']) && isset($projectData['due'])) {
    $projectID = $projectData['projectId'];
    $title = $projectData['title'];
    $leader = $projectData['leader'];
    $start = $projectData['start'];
    $due = $projectData['due'];

    $startFormatted = date('Y-m-d', strtotime($start));
    $dueFormatted = date('Y-m-d', strtotime($due));

    $updateProjectSQL = "UPDATE Projects SET Project_Title = ?, Project_Leader = ?, Start_Date = ?, Due_Date = ? WHERE Project_ID = ?";
    $stmt = $conn->prepare($updateProjectSQL);
    $stmt->bind_param("sissi", $title, $leader, $startFormatted, $dueFormatted, $projectID);

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