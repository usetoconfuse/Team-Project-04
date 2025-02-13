<?php
// Made by Quinn Little 11/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 20 tasks for the given UserID
    $sql = "SELECT Projects.Project_Title, Projects.Project_ID, Projects.Start_Date, Projects.Due_Date
            FROM User_Teams INNER JOIN Projects
            ON User_Teams.Project_ID = Projects.Project_ID
            WHERE User_Teams.User_ID = '$userID'
            ORDER BY Projects.Start_Date;
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