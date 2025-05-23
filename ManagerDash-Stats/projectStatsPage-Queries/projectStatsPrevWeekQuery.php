<?php
// Created by Toby Tischler 16/02/25

    include '../../config/db-setup.php';

    $projID = $_GET['ID'];

    $sql = "SELECT
                Users.User_ID,
                Users.Forename,
                Users.Surname,
                SUM(IF(
                    DATEDIFF(CURRENT_DATE, Tasks.Completion_Date) <= 7,
                    Tasks.Man_Hours, 0)) AS Hours
            FROM
                Users, Tasks
            WHERE
                Tasks.Project_ID = ?
                AND Users.User_ID = Tasks.Assignee_ID
            GROUP BY
                Users.User_ID
            ORDER BY
                Hours DESC
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