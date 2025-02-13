<?php
// Created by Quinn Little 08/02/2025

    include '../../config/db-setup.php';

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 20 Projects, and select project leader name
    $sql = "SELECT Projects.Project_ID, Projects.Project_Title, Projects.Start_Date, Projects.Due_Date, Projects.Project_Leader, Users.Forename, Users.Surname
FROM Projects INNER JOIN Users
ON Users.User_ID = Projects.Project_Leader
LIMIT 20;
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