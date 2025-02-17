<?php
// Created by Toby Tischler 13/02/25

    include '../../config/db-setup.php';

    $projID = $_GET['ID'];

    $sql = "SELECT
                User_Teams.User_ID,
                Users.Email,
                Users.Forename,
                Users.Surname,
                Users.User_Type,
                Users.Employee_Status,
                COUNT(Tasks.Task_ID) AS Tasks,
                IF(
                EXISTS(
                    SELECT Tasks.Task_ID
                    FROM Tasks
                    WHERE Tasks.Stuck = 1
                    AND Tasks.Assignee_ID = Users.User_ID),
                'Yes', 'No') AS Stuck
            FROM
                Users,
                User_Teams,
                Tasks
            WHERE
                User_Teams.Project_ID = ?
                AND Users.User_ID = User_Teams.User_ID
                AND Users.User_ID = Tasks.Assignee_ID
                AND Tasks.Project_ID = User_Teams.Project_ID
            GROUP BY
                Users.User_ID
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