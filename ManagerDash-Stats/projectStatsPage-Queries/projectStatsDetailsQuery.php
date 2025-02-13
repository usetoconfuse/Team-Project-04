<?php
// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 12/02/25

    include '../../config/db-setup.php';
    
    $projID = $_GET['ID'];

    $sql = "SELECT
                projects.Project_Title,
                projects.Start_Date,
                projects.Due_Date,
                projects.Creation_Date,
                projects.Completion_Date,
                projects.Project_Leader
            FROM
                projects
            WHERE Project_ID = '$projID'
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