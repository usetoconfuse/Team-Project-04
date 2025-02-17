<?php 
//Created by Quinn Little 16/02/2025

    include '../../config/db-setup.php';

    // Check if ID parameter exists in the URL
    if (isset($_GET['ID'])) {
        // Retrieve parameter
        $userID = htmlspecialchars($_GET['ID']); // Sanitize input
    }


    $inputted_password ='MakeItAll123!';
    $hashed_PWD = password_hash($inputted_password, PASSWORD_DEFAULT);

    // Set user's password
    $sql = "UPDATE Users 
    SET Password = '$hashed_PWD'
    WHERE User_ID = '$userID'";
    

    // Define success and failure responses
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Password has been Reset"]);
    } else {
        echo json_Encode(["success" => false, "message" => "Error, password not updated: " . $conn->error]);
    }

    ?>