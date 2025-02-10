<?php
// Made by Quinn Little 08/02/2025

    include '../../config/db-setup.php';

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 20 Projects, and select project leader name
    $sql = "SELECT projects.Project_ID, projects.Project_Title, projects.Start_Date, projects.Due_Date, projects.Project_Leader, Users.Forename, Users.Surname
FROM projects INNER JOIN users
ON users.User_ID = projects.Project_Leader
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