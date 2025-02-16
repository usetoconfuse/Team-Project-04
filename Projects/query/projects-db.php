<?php
session_start();
include '../../config/db-setup.php';

$userID = isset($_GET['userID']) ? intval($_GET['userID']) : null;
$role = isset($_SESSION['role']) ? $_SESSION['role'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : null;

// Filter Fields
$date = isset($_GET['dateValue']) ? $_GET['dateValue'] : null;

if ($role === 'Employee') {
    $sql = "SELECT Projects.Project_ID, Projects.*, COUNT(Tasks.Task_ID) AS Task_Count 
            FROM `User_Teams`
            INNER JOIN Projects ON User_Teams.Project_ID = Projects.Project_ID
            LEFT JOIN Tasks ON Projects.Project_ID = Tasks.Project_ID 
            AND ((Tasks.Status = 'To Do' OR Tasks.Status = 'In Progress') 
            AND Assignee_ID = $userID AND Tasks.Start_Date <= CURDATE())
            WHERE User_Teams.User_ID = $userID 
            AND Projects.Start_Date <= CURDATE()";

    if ($status) {
        $sql .= " AND Projects.Status = '$status'";
    }

    if (!empty($date)) {
        $sql .= " AND Projects.Due_Date <= '$date'";
    }

    $sql .= " GROUP BY Projects.Project_ID";
} else {
    $sql = "SELECT Projects.Project_ID, Projects.* FROM Projects WHERE 1=1";

    if ($status) {
        if ($status === 'Active') {
            $sql .= " AND Projects.Status = '$status' AND Projects.Start_Date <= CURDATE() AND Projects.Completion_Date IS NULL";
        } elseif ($status === 'Not Started') {
            $sql .= " AND Projects.Start_Date > NOW() AND Projects.Status = 'Active'";
        } elseif ($status === 'Archived') {
            $sql .= " AND Projects.Status = '$status'";
        } elseif ($status === 'Completed') {
            $sql .= " AND Projects.Completion_Date IS NOT NULL AND Projects.Status <> 'Archived'";
        }
    }

    if (!empty($date)) {
        $sql .= " AND Projects.Due_Date <= '$date'";
    }
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