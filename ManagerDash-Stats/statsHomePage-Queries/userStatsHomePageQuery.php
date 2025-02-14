<?php
// Created by Quinn Little 08/02/2025

    include '../../config/db-setup.php';

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 45 users
    $sql = "SELECT User_ID, Forename, Surname, User_Type FROM Users;
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