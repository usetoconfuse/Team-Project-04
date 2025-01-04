<?php
    include 'config/db-setup.php';

<<<<<<< HEAD
include '/config/db-setup.php';

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// select all the topics from the Topics table
$sql = "SELECT Topic_Name, Topic_ID
=======
    
    // select all the topics from the Topics table
    $sql = "SELECT Topic_Name, Topic_ID
>>>>>>> 9821264a5895177a8d926ad77e6c14e481c32c8f
            FROM Topics ";

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>