<?php
session_start();
include '../../config/db-setup.php';

$userID = isset($_GET['userID']) ? intval($_GET['userID']) : null;
$role = isset($_SESSION['role']) ? $_SESSION['role'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : null;

//Filter Fields
$date = isset($_GET['dateValue']) ? $_GET['dateValue'] : null;


if ($role === 'Employee') {
    $sql = "SELECT Projects.*, COUNT(Tasks.Task_ID) AS Task_Count FROM `User_Teams`
    INNER JOIN Projects ON User_Teams.Project_ID = Projects.Project_ID
    LEFT JOIN Tasks ON Projects.Project_ID = Tasks.Project_ID AND (Tasks.Status = 'To Do' OR Tasks.Status = 'In Progress')
    WHERE User_ID = $userID AND Projects.Start_Date <= CURDATE() AND Projects.Status = '$status'";
} else {
    $sql = "SELECT Projects.* FROM Projects WHERE 1=1";
    if ($status) {
        if ($status === 'Active') {
            $sql .= " AND Projects.Status = '$status'";
        } elseif ($status === 'Not Started') {
            $sql .= " AND Projects.Status = '$status'";
        } elseif ($status === 'Archived') {
            $sql .= " AND Projects.Status = '$status'";
        }
    }
}

if (!empty($date)) {
    $sql .= " AND Projects.Due_Date <= '$date'";  
}

if ($role === 'Employee') {
    $sql .= " GROUP BY Projects.Project_ID;";
}

$result = mysqli_query($conn, $sql);

if (!$result) {
    die("Query failed " . mysqli_error($conn));
}

$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);




?>