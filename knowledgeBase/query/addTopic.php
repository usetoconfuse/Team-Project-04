<?php
include '../../config/db-setup.php';

//POST method to gather all data from Form of topic name well as User data
$newTopic = $_POST['name'];

// using data from the Post modal form add a post to the knowledge base table
$sql = "
INSERT INTO Topics (Topic_Name) 
VALUES ('$newTopic')
";

if (!mysqli_query($conn, $sql)) {
    //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
    echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
    exit();
}

echo json_encode(["success" => "Topic added successfully"]);
?>