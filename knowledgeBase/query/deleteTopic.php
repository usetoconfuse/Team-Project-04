<?php
// API endpoint to add a topic to the Topics table.
include '../../config/db-setup.php';

//POST method to gather all data from Form of topic name well as User data
$topic = $conn->real_escape_string($_GET['id']);

// using data from the Post modal form add a post to the knowledge base table
$sql = "DELETE FROM Topics WHERE Topic_ID = '$topic'";

if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error deleting topic: " . mysqli_error($conn)]);
    exit();
}

echo json_encode(["status" => "success", "message" => "Topic deleted successfully"]);
?>