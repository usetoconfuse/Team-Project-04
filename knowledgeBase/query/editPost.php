<?php
// API endpoint to edit a post in the knowledge base table.
include '../../config/db-setup.php';

//POST method to gather all data from Form as well as User data
$id = $_POST['id'] ?? null;
$title = $_POST['title'] ?? null;
$content = $_POST['content'] ?? null;
$type = $_POST['type'] ?? null;
$topic = $_POST['topic'] ?? null;
$visibility = $_POST['visibility'] ?? null;
$protected = $_POST['protected'] ?? null;
$userId = 1;

$setQuery = "";

if ($title) {
    $setQuery .= "Title = '$title', ";
}
if ($content) {
    $setQuery .= "Description = '$content', ";
}
if ($type) {
    $setQuery .= "Type = '$type', ";
}
if ($visibility) {
    $setQuery .= "Visibility = '$visibility', ";
}
if ($protected) {
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