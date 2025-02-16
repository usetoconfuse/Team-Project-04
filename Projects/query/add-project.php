<?php
// Include database setup
include '../../config/db-setup.php';

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$title = $input['title'] ?? '';
$teamLeader = $input['teamLeader'] ?? '';
$startDate = $input['startDate'] ?? '';
$dueDate = $input['dueDate'] ?? '';

// Validate required fields
if (empty($title) || empty($teamLeader) || empty($startDate) || empty($dueDate)) {
    http_response_code(400);
    echo json_encode(['message' => 'Please fill in all fields.']);
    exit;
}




// Prepare and execute SQL query
$stmt = $conn->prepare("INSERT INTO Projects (Project_Title,Start_Date, Due_Date,Project_Leader) VALUES (?, ?, ?, ?)");
$stmt->bind_param('sssi', $title, $startDate, $dueDate, $teamLeader);

if ($stmt->execute()) {
    $projectID = $stmt->insert_id;
    $stmtTeams = $conn->prepare("INSERT INTO User_Teams (Project_ID, User_ID) VALUES (?, ?)");
    $stmtTeams->bind_param('ii', $projectID, $teamLeader);


    if ($stmtTeams->execute()) {
        http_response_code(200);
        echo json_encode(['message' => 'Project and UserTeams entry added successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to add entry to UserTeams.']);
    }

    $stmtTeams->close();
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to add project']);
}



// Close statement and connection
$stmt->close();
$conn->close();
?>