<?php

    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //POST method to gather all data from Form of topic name well as User data
    $newTopic = $_POST['topic-name'];

    // using data from the Post modal form add a post to the knowledge base table
    $sql = " INSERT INTO Topics (Topic_ID, Topic_Name) 
        VALUES ( 
        (SELECT MAX_ID FROM (SELECT COALESCE(MAX(Topic_ID), 0) + 1 AS MAX_ID FROM 	Topics) AS DerivedTable) , 
        '$newTopic') " ;

    if (!mysqli_query($conn,$sql)){
        //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
        echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
        exit();
    }
?>