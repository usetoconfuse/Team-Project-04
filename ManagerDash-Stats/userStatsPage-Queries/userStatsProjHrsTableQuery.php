<?php
// Created by Quinn Little 08/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 20 tasks for the given UserID
    $sql = "SELECT 
    Projects.Project_ID, 
    Projects.Project_Title, 
    COALESCE(SUM(Tasks.Man_Hours), 0) AS 'TotalHrs', 
    COALESCE(COUNT(Tasks.Task_ID), 0) AS 'TotalTasksCompleted'
    FROM 
        Projects

    LEFT JOIN 
        Tasks ON Tasks.Project_ID = Projects.Project_ID 
        AND Tasks.Assignee_ID = '$userID' 
        AND Tasks.Status = 'Completed'
        INNER JOIN 
        User_Teams ON Projects.Project_ID = User_Teams.Project_ID
        AND User_Teams.User_ID='$userID'

    GROUP BY 
        Projects.Project_ID;
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