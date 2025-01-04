<?php
include '../config/db-setup.php';

$userID = isset($_GET['userID']) ? intval($_GET['userID']) : null;
$sql = "SELECT Projects.* FROM `User_Teams`
        INNER JOIN Projects ON User_Teams.Team_ID = Projects.Team_ID
        WHERE User_ID = $userID;";


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