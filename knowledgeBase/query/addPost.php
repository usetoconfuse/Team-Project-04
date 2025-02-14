<?php
session_start();
include '../../config/db-setup.php';

//POST method to gather all data from Form as well as User data
$title = $_POST['title'];
$content = $_POST['content'];
$type = $_POST['type'];
$topic = $_POST['topic'];
$visibility = $_POST['visibility'];
$protected = $_POST['protected'];
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
    //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
    echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
    exit();
}
if (!mysqli_query($conn, $sql2)) {
    //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
    echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
    exit();
}

echo json_encode(["success" => "Topic added successfully"]);
?>