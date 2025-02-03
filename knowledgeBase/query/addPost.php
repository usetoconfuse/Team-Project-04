<?php
include '../../config/db-setup.php';

//POST method to gather all data from Form as well as User data
$title = $_POST['title'];
$content = $_POST['content'];
$type = $_POST['type'];
$topic = $_POST['topic'];
$visibility = $_POST['visibility'];
$userId = 1;

// using data from the Post modal form add a post to the knowledge base table
$sql = "
INSERT INTO 
Knowledgebase_Posts 
(Title, Description, Type, User_ID, Visibility) 
VALUES ( 
    '$title',  
    '$content',  
    '$type',    
     $userId,  
    '$visibility'
);

INSERT INTO Post_Topic (Post_ID, Topic_ID) 
VALUES ( 
    (SELECT MAX(Post_ID) FROM Knowledgebase_Posts),  
    (SELECT Topic_ID FROM Topics WHERE Topic_Name = '$topic')
)
";

if (!mysqli_query($conn, $sql1)) {
    //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
    echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
    exit();
}
?>