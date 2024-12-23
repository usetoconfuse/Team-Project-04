<?php

    include 'stats-db-setup.php';

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    $sql = "SELECT COUNT(projects.Project_ID) AS projectCount
            FROM projects   
            INNER JOIN tasks 
            ON projects.Project_ID = tasks.Project_ID  
            WHERE projects.Project_ID >= 1
            ";
    
    // if ($type == "Technical"){
	//     $sql .= " WHERE kb.Type = 'Technical' ";  
    // }

    // if ($type == "Non-Technical"){
    //     $sql .=  " WHERE kb.Type = 'Non-Technical' ";  
    // }


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