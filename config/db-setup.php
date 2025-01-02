<?php
// Made by Quinn Little 23/12/24
// Moved and edited by Quinn Little 02/01/2025


    include 'config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
