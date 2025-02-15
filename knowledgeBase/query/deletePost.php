
<?php
include '../../config/db-setup.php';

//POST method to gather all data from Form of topic name well as User data
$postID = $_GET['postId'];

// using data from the Post modal form add a post to the knowledge base table
$sql = "
DELETE FROM KnowledgeBase_Posts
WHERE Post_ID = '$postID'
";

if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error deleting from Knowledgebase_Posts: " . mysqli_error($conn)]);
    exit();
}

echo json_encode(["status" => "success", "message" => "Post deleted successfully"]);
?>