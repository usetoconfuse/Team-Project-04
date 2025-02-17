<?php 
//Created by Quinn Little 16/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }


    // Select projects relating a specific user
    $sql = "SELECT DISTINCT Projects.Project_ID, Projects.Project_Title
    FROM Tasks INNER JOIN Projects 
    ON Tasks.Project_ID = Projects.Project_ID 
    WHERE Tasks.Assignee_ID = '$userID'";
    
 

    $result = mysqli_query($conn,$sql);

    if(!$result){
        die("Query failed ". mysqli_error($conn));
    }

    $allDataArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $allDataArray[] = $row;
    }
    
    echo json_encode($allDataArray);