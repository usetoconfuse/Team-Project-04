<?php
// Created by Toby Tischler 12/02/25

    include '../../config/db-setup.php';

    $projID = $_GET['ID'];

    // We will increment date from the project's start date to end date
    $weekDate = date_create($_GET['START']);

    // End date is either completion date or current date if not completed
    $endDate = date_create($_GET['END']);

    // Get the following for a given date:
    //     week: current date
    //     comp: total hours of completed tasks up to this date
    //     scope: total hours of all tasks up to this date
    $sql = "SELECT
                ? AS week,
                SUM(CASE
                        WHEN Tasks.Project_ID = ?
                        AND DATEDIFF(?, Tasks.Start_Date) >= 0
                        AND Tasks.Status = 'Completed'
                            THEN Tasks.Man_Hours
                        ELSE 0
                    END) AS comp,
                SUM(CASE
                        WHEN Tasks.Project_ID = ?
                        AND DATEDIFF(?, Tasks.Start_Date) >= 0
                            THEN Tasks.Man_Hours
                        ELSE 0
                    END) AS scope
            FROM 
                Tasks
            GROUP BY
                week
            ";

    $stmt = $conn->prepare($sql);

    // Get burnup stats for each week of project history
    while ($weekDate <= $endDate) {

        // Convert date to string for binding
        $dateStr = $weekDate->format("Y-m-d");

        $stmt->bind_param("sisis", 
        $dateStr, $projID, $dateStr, $projID, $dateStr);

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

        // Increment date by 1 week
        date_add($weekDate,
        date_interval_create_from_date_string("1 week"));
    }
    

    $stmt->close();
    
    // Return the results as a JSON array
    header('Content-Type: application/json');
    echo json_encode($results);
?>