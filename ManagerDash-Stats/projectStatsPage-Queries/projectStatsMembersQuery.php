<?php
// Created by Toby Tischler 13/02/25

    include '../../config/db-setup.php';

    $projID = $_GET['ID'];

    $sql = "SELECT
                user_teams.User_ID,
                users.Email,
                users.Forename,
                users.Surname,
                users.User_Type,
                users.Employee_Status,
                COUNT(tasks.Task_ID) AS Tasks,
                IF(
                EXISTS(
                    SELECT tasks.Task_ID
                    FROM tasks
                    WHERE tasks.Stuck = 1
                    AND tasks.Assignee_ID = users.User_ID),
                'Yes', 'No') AS Stuck
            FROM
                users,
                user_teams,
                tasks
            WHERE
                user_teams.Project_ID = ?
                AND users.User_ID = user_teams.User_ID
                AND users.User_ID = tasks.Assignee_ID
            GROUP BY
                users.User_ID
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