
<?php

    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    // select all relevant field from KnowledgeBase table and that create array of json data
    $sql = "SELECT kb.Post_ID, kb.Title, kb.Description, kb.Type, t.Topic_Name, usr.Forename, usr.Surname, kb.Date_Created, kb.Is_Protected 
            FROM Knowledgebase_Posts kb  
            INNER JOIN Post_Topic pt ON kb.Post_ID = pt.Post_ID  
            INNER JOIN Topics t ON pt.Topic_ID = t.Topic_ID  
            INNER JOIN Users usr ON kb.User_ID = usr.User_ID ";

    $result = mysqli_query($conn,$sql);
    $allDataArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $allDataArray[] = $row;
    }
    
    echo json_encode($allDataArray);
?>