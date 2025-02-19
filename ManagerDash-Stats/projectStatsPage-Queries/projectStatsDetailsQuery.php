<?php
// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 16/02/25

    include '../../config/db-setup.php';
    
    $projID = $_GET['ID'];

    $sql = "SELECT
                Projects.Project_Title,
                Projects.Start_Date,
                Projects.Due_Date,
                Projects.Creation_Date,
                Projects.Completion_Date,
                Projects.Project_Leader,
                Users.Forename,
                Users.Surname
            FROM
                Projects, Users
            WHERE
                Project_ID = ?
                AND Projects.Project_Leader = Users.User_ID
            ";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $projID);

    if ($stmt->execute()) {
        http_response_code(200);
        $data = [];
        $result = $stmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $results[] = $data;
        $result->free();
    } else {
        http_response_code(500);
        echo "Query failed ". $stmt->error;
    }
    

    $stmt->close();
    
    // Return the results as a JSON array
    header('Content-Type: application/json');
    echo json_encode($results);
?>