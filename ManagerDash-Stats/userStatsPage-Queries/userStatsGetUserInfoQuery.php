<?php
// Created by Toby Tischler 09/02/2025

    include '../../config/db-setup.php';
    
    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }

    // Select employee name, email, role, and status (are they still working here)
    $sql = "SELECT
	users.Forename,
    users.Surname,
    users.Email,
    users.User_Type,
    users.Employee_Status
    FROM users
    WHERE users.User_ID = '$userID'
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