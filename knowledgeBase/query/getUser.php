<?php
// API endpoint to get the user data from the session.
session_start();

echo json_encode([
    "user_id" => $_SESSION['user_id'] ?? null,
    "role" => $_SESSION['role'] ?? null,
    "user_forename" => $_SESSION['user_forename'] ?? null,
    "user_name" => $_SESSION['user_name'] ?? null
]);
?>