<?php
include "config/db-setup.php";
$passwordData = json_decode(file_get_contents("php://input"), true);

$currentPass = $passwordData['currentPass'];
$newPass = $passwordData['newPass'];
$user_ID = $passwordData['userID'];

$user = getUserById($user_ID);

if (!password_verify($currentPass, $user['Password'])) {
    echo json_encode(['success' => false, 'error' => 'Current Password Incorrect']);
    exit;
}

if (password_verify($newPass, $user['Password'])) {
    echo json_encode(['success' => false, 'error' => 'New password cannot be the same as the current password']);
    exit;
}

$password_regex = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?\":{}|<>]).{12,}$/";

if (!preg_match($password_regex, $newPass)) {
    echo json_encode(['success' => false, 'error' => "New Password doesn't meet criteria"]);
}

$newPasswordHashed = password_hash($newPass, PASSWORD_DEFAULT);


$updatePasswordSQL = "UPDATE Users SET Password = ? WHERE User_ID = ?";
$stmt = $conn->prepare($updatePasswordSQL);
$stmt->bind_param("si", $newPasswordHashed, $user_ID);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update password']);
}

$stmt->close();


function getUserById($user_id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM Users WHERE User_ID = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc(); //we only want the first result (only 1 result but array access index 0)
}
?>
