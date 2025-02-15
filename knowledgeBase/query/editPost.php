<?php
// API endpoint to edit a post in the knowledge base table.
include '../../config/db-setup.php';

//POST method to gather all data from Form as well as User data
$id = $conn->real_escape_string($_POST['id']);
$title = isset($_POST['title']) ? $conn->real_escape_string($_POST['title']) : null;
$content = isset($_POST['content']) ? $conn->real_escape_string($_POST['content']) : null;
$type = isset($_POST['type']) ? $conn->real_escape_string($_POST['type']) : null;
$topic = isset($_POST['topic']) ? $conn->real_escape_string($_POST['topic']) : null;
$visibility = isset($_POST['visibility']) ? $conn->real_escape_string($_POST['visibility']) : null;
$protected = isset($_POST['protected']) ? $conn->real_escape_string($_POST['protected']) : null;
$userId = 1;

$setQuery = "";

if ($title !== null) {
    $setQuery .= "Title = '$title', ";
}
if ($content !== null) {
    $setQuery .= "Description = '$content', ";
}
if ($type !== null) {
    $setQuery .= "Type = '$type', ";
}
if ($visibility !== null) {
    $setQuery .= "Visibility = '$visibility', ";
}
if ($protected !== null) {
    $setQuery .= "Is_Protected = '$protected'";
}

// using data from the Post modal form add a post to the knowledge base table
$sql = "
UPDATE Knowledgebase_Posts
SET
    $setQuery
WHERE
    Post_ID = $id
";
if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error updating Knowledgebase_Posts: " . mysqli_error($conn)]);
    exit();
}

$sql2 = "
UPDATE Post_Topic SET Topic_ID = (SELECT Topic_ID FROM Topics WHERE Topic_Name = '$topic')
WHERE Post_ID = $id
";

if (!mysqli_query($conn, $sql2)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error updating Post_Topic: " . mysqli_error($conn)]);
    exit();
}

echo json_encode(["status" => "success", "message" => "Post updated successfully"]);
?>