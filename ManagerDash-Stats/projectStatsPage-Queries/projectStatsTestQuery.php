<?php
// Created by Quinn Little 23/12/24

    include '../../config/db-setup.php';
    
    $sql = "SELECT COUNT(projects.Project_ID) AS projectCount
            FROM projects   
            INNER JOIN tasks 
            ON projects.Project_ID = tasks.Project_ID  
            WHERE projects.Project_ID >= 1
            ";


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