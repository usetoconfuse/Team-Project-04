<?php

    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    //POST method to gather all data from Form as well as User data
    $title = $_POST['title'];
    $content = $_POST['content'];
    $type = $_POST['type'];
    $topic = $_POST['topic'];
    $visibility = $_POST['visibility'];
    $userId = 1; 

    // using data from the Post modal form add a post to the knowledge base table
    $sql1 = " INSERT INTO Knowledgebase_Posts (Post_ID, Title, Description, Type,User_ID, Is_Protected, Date_Created, Last_Updated, Visibility) 
    VALUES ( 
        (SELECT MAX_ID FROM (SELECT COALESCE(MAX(Post_ID), 0) + 1 AS MAX_ID FROM 	Knowledgebase_Posts) AS DerivedTable),  
        '$title',  
        '$content',  
        '$type',    
        $userId,  
        DEFAULT,  
        CURRENT_TIMESTAMP,  
        CURRENT_TIMESTAMP,
        '$visibility' ) " ;

    $sql2 = "INSERT INTO Post_Topic (Post_ID, Topic_ID) 
        VALUES ( 
        (SELECT MAX(Post_ID) FROM Knowledgebase_Posts),  
        (SELECT Topic_ID FROM Topics WHERE Topic_Name = '$topic')) ";

    if (!mysqli_query($conn,$sql1)){
        //die("Error inserting into Knowledgebase_Posts: " . mysqli_error($conn));
        echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
        exit();
    }
    if (!mysqli_query($conn, $sql2)) {
        //die("Error inserting into Post_Topic: " . mysqli_error($conn));
        echo "Error inserting into Knowledgebase_Posts: " . mysqli_error($conn);
        exit();
    }
?>