<?php
// Include database connection
include '../../config/db-setup.php';

// Fetch only employees (not admins) with Employee_Status = 1
$sql = "SELECT User_ID, Forename, Surname FROM users WHERE Employee_Status = 1 AND User_Type = 'Employee'";
$result = mysqli_query($conn, $sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch users']);
    exit;
}

$users = [];
while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

echo json_encode($users);

// Close connection
mysqli_close($conn);
?>
