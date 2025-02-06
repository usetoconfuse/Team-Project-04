<?php
include '../../config/db-setup.php';

$query = $_GET['query'] ?? null;

// select all the topics from the Topics table
$sql = "
SELECT
    Topic_Name, 
    Topic_ID
FROM 
    Topics
WHERE 1=1
";

if ($query) {
    $sql .= " AND LOWER(Topic_Name) LIKE LOWER('%$query%')";
}

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>