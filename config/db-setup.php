<?php
// Made by F328049 23/12/24
// Moved and edited by F328049 02/01/2025


    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
