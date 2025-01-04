<?php

include '/config/db-setup.php';


// select all the topics from the Topics table
$sql = "SELECT Topic_Name, Topic_ID
        FROM Topics ";

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>