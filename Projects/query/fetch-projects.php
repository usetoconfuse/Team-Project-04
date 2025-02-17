<?php
// Include database connection
include '../../config/db-setup.php';

// Fetch only active projects
$sql = "SELECT Project_ID, Project_Title FROM Projects WHERE Status = 'Active'";
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch projects']);
    exit;
}

$projects = [];
while ($row = mysqli_fetch_assoc($result)) {
    $projects[] = $row;
}

echo json_encode($projects);

// Close connection
mysqli_close($conn);
?>