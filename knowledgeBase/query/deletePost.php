
<?php
// API endpoint to delete a topic from the Topics table.
include '../../config/db-setup.php';

//POST method to gather all data from Form of topic name well as User data
$postID = $conn->real_escape_string($_GET['postId']);

// using data from the Post modal form add a post to the knowledge base table
$sql = "
DELETE FROM Knowledgebase_Posts
WHERE Post_ID = '$postID'
";

if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error deleting from Knowledgebase_Posts: " . mysqli_error($conn)]);
    exit();
}

echo json_encode(["status" => "success", "message" => "Post deleted successfully"]);
?>
