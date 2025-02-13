<?php
// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 12/02/25

    include '../../config/db-setup.php';
    
    $projID = $_GET['ID'];

    $sql = "SELECT
                Projects.Project_Title,
                Projects.Start_Date,
                Projects.Due_Date,
                Projects.Creation_Date,
                Projects.Completion_Date,
                Projects.Project_Leader
            FROM
                Projects
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