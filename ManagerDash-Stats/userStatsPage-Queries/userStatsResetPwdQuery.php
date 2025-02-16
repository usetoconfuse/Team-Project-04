<?php 
//Created by Quinn Little 16/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }

    // $type = "Non-Technical"; // placeholder , will be fetched from button clicked

    $inputted_password ='MakeItAll123!';
    $hashed_PWD = password_hash($inputted_password, PASSWORD_DEFAULT);

    // Select the first 20 tasks for the given UserID
    $sql = "UPDATE Users 
    SET Password = '$hashed_PWD'
    WHERE User_ID = '$userID'";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Password has been Reset"]);
    } else {
        echo json_Encode(["success" => false, "message" => "Error, password not updated: " . $conn->error]);
    }

    