<?php
// API endpoint to get all the topics from the Topics table.
include '../../config/db-setup.php';

$query = isset($_GET['query']) ? $conn->real_escape_string($_GET['query']) : null;

// select all the topics from the Topics table
$sql = "
SELECT
    Topic_Name, 
    Topic_ID
FROM 
    Topics
WHERE 1=1
";

if ($query !== null) {
    $sql .= " AND LOWER(Topic_Name) LIKE LOWER('%$query%')";
}

$sql .= " 
ORDER BY (
    SELECT Count(Post_ID) 
    FROM Post_Topic 
    WHERE Topic_ID = Topics.Topic_ID
) DESC";

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>