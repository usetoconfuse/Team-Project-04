
<?php

    include 'localDBData.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $type = "Technical"; // placeholder , will be fetched from button clicked

    if($type == "Technical" || $type == "Non-Technical"){
        $sql = "SELECT kb.Title, kb.Description, kb.Type, t.Topic_Name, usr.Forename, usr.Surname, kb.Date_Created, kb.Is_Protected 
                FROM Knowledgebase_Posts kb  
                INNER JOIN Post_Topic pt ON kb.Post_ID = pt.Post_ID  
                INNER JOIN Topics t ON pt.Topic_ID = t.Topic_ID  
                INNER JOIN Users usr ON kb.User_ID = usr.User_ID ";
    }
    
    if ($type == "Technical"){
	    $sql .= " WHERE kb.Type = 'Technical' ";  
    }

    if ($type == "Non-Technical"){
        $sql .=  " WHERE kb.Type = 'Non-Technical' ";  
    }


    $result = mysqli_query($conn,$sql);

    if(!$result){
        die("Query failed ". mysqli_error($conn));
    }

    $allDataArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $allDataArray[] = $row;
    }
    
    echo json_encode($allDataArray);
?>