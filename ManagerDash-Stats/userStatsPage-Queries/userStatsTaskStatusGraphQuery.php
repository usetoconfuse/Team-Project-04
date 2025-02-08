<?php
// Made by Quinn Little 08/02/2025

    include '../../config/db-setup.php';

// Check if ID parameter exists in the URL
if (isset($_GET['ID'])) {
    // Retrieve parameter
    $userID = htmlspecialchars($_GET['ID']); // Sanitize input
}

    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

//Select all To Do tasks for that user
    $queries = ["SELECT SUM(Task_ID) AS 'tasks'
    FROM tasks 
    WHERE tasks.Assignee_ID = '$userID'
    AND tasks.Status = 'To Do'
    ",
    "SELECT SUM(Task_ID) AS 'tasks'
    FROM tasks 
    WHERE tasks.Assignee_ID = '$userID'
    AND tasks.Status = 'In Progress'
    ",
    "SELECT SUM(Task_ID) AS 'tasks'
    FROM tasks 
    WHERE tasks.Assignee_ID = '$userID'
    AND tasks.Status = 'Completed'
    ", 
    "SELECT SUM(Task_ID) AS 'tasks'
    FROM tasks 
    WHERE tasks.Assignee_ID = '$userID'
    AND tasks.Stuck = 1
    "];


    $results = [];

    // Execute each query
    foreach ($queries as $query) {
        if ($result = $conn->query($query)) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $results[] = $data;
            $result->free();
        } else {
            echo "Error: " . $conn->error;
        }
}
    
    // if ($type == "Technical"){
	//     $sql .= " WHERE kb.Type = 'Technical' ";  
    // }

    // if ($type == "Non-Technical"){
    //     $sql .=  " WHERE kb.Type = 'Non-Technical' ";  
    // }


    // Close the connection
    $conn->close();

    // Return the results as a JSON array
    header('Content-Type: application/json');
    echo json_encode($results);
?>