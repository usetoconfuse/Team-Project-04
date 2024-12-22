
<?php

    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $clicked_topic = "Database Management"; //placeholder for the clicked topic value 

    $sql = "SELECT kb.Title, kb.Description, kb.Type, t.Topic_Name, usr.Forename, usr.Surname, kb.Date_Created, kb.Is_Protected 
    FROM Knowledgebase_Posts kb  
    INNER JOIN Post_Topic pt ON kb.Post_ID = pt.Post_ID  
    INNER JOIN Topics t ON pt.Topic_ID = t.Topic_ID  
    INNER JOIN Users usr ON kb.User_ID = usr.User_ID  
    WHERE t.Topic_Name = '$clicked_topic' ";

    $result = mysqli_query($conn,$sql);
    $allDataArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $allDataArray[] = $row;
    }
    
    echo json_encode($allDataArray);
?>