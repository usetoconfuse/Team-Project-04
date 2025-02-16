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


    $getCurrentLeader = "SELECT Project_Leader FROM Projects WHERE Project_ID = ?";
    $stmtCurrLeader = $conn->prepare($getCurrentLeader);
    $stmtCurrLeader->bind_param('i', $projectID);
    $stmtCurrLeader->execute();
     $stmtCurrLeader->bind_result($currentLeader);
    $stmtCurrLeader->fetch();
    $stmtCurrLeader->close();

    $updateProjectSQL = "UPDATE Projects SET Project_Title = ?, Project_Leader = ?, Start_Date = ?, Due_Date = ? WHERE Project_ID = ?";
    $stmt = $conn->prepare($updateProjectSQL);
    $stmt->bind_param("sissi", $title, $leader, $startFormatted, $dueFormatted, $projectID);

 if ($stmt->execute()) {

        if ($leader != $currentLeader) {
            $stmtTeams = $conn->prepare("INSERT INTO User_Teams (Project_ID, User_ID) VALUES (?, ?)");
            $stmtTeams->bind_param('ii', $projectID, $leader);

            if ($stmtTeams->execute()) {
                http_response_code(200);
                echo json_encode(['message' => 'Project updated and UserTeams entry edited successfully.']);
            } else {
                http_response_code(500);
                echo json_encode(['message' => 'Failed to add entry to UserTeams.']);
            }
            $stmtTeams->close();
        } else {
            http_response_code(200);
            echo json_encode(['message' => 'Project updated successfully.']);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to edit project"]);
    }

    $stmt->close();

} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid input"]);
}

$conn->close();

?>