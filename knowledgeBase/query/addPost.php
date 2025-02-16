<?php
// API endpoint to add a post to the knowledge base table.
session_start();
include '../../config/db-setup.php';

//POST method to gather all data from Form as well as User data
$title = $conn->real_escape_string($_POST['title']);
$content = $conn->real_escape_string($_POST['content']);
$type = $conn->real_escape_string($_POST['type']);
$topic = $conn->real_escape_string($_POST['topic']);
$visibility = $conn->real_escape_string($_POST['visibility']);
$protected = $conn->real_escape_string($_POST['protected']);
$userId = $_SESSION['user_id'];

// using data from the Post modal form add a post to the knowledge base table
$sql1 = "
INSERT INTO 
Knowledgebase_Posts 
(Title, Description, Type, User_ID, Visibility, Is_Protected) 
VALUES ( 
    '$title',  
    '$content',  
    '$type',    
     $userId,  
    '$visibility',
    '$protected'
);
";

$sql2 = "INSERT INTO Post_Topic (Post_ID, Topic_ID) 
VALUES ( 
    (SELECT MAX(Post_ID) FROM Knowledgebase_Posts),  
    (SELECT Topic_ID FROM Topics WHERE Topic_Name = '$topic')
)";

if (!mysqli_query($conn, $sql1)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn)]);
    exit();
}
if (!mysqli_query($conn, $sql2)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error inserting into Post_Topic: " . mysqli_error($conn)]);
    exit();
}

echo json_encode(["success" => "Topic added successfully"]);
?>