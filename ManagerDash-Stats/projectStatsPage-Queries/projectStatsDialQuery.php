<?php
// Created by Toby Tischler 13/02/25

    include '../../config/db-setup.php';

    $projID = $_GET['ID'];

    $sql = "SELECT
                COUNT(CASE WHEN Tasks.Status = 'To Do' THEN 1 END) AS Todo,
                COUNT(CASE WHEN Tasks.Status = 'In Progress' THEN 1 END) AS Inprog,
                COUNT(CASE WHEN Tasks.Status = 'Completed' THEN 1 END) AS Done
            FROM
                Tasks
            WHERE
                Tasks.Project_ID = ?
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