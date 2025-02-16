<?php 
//Created by Quinn Little 16/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }




    // Delete user (their data still exists, but they can no-longer log in)
    $sql = "UPDATE Users 
    SET Employee_Status = 0
    WHERE User_ID = '$userID'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "User has been removed"]);
    } else {
        echo json_Encode(["success" => false, "message" => "Error, user has not been removed: " . $conn->error]);
    }

    ?>