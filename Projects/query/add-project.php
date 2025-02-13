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


$currentDate = date('Y-m-d');
$status = "";
if ($startDate > $currentDate) {
    $status = "Not Started";
} else {
    $status = "Active";
}

// Prepare and execute SQL query
$stmt = $conn->prepare("INSERT INTO Projects (Project_Title,Start_Date, Due_Date,Project_Leader, Status) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param('sssis', $title, $startDate, $dueDate, $teamLeader, $status);

$stmt->execute();



// Close statement and connection
$stmt->close();
$conn->close();
?>