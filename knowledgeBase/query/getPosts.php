<?php
// API endpoint to get posts from the knowledge base table.
session_start();
include '../../config/db-setup.php';

$VALID_TYPES = ['Technical', 'Non-Technical'];

$topic = isset($_GET['topic']) ? $conn->real_escape_string($_GET['topic']) : null;
$type = isset($_GET['type']) ? $conn->real_escape_string($_GET['type']) : null;
$query = isset($_GET['query']) ? $conn->real_escape_string($_GET['query']) : null;

if ($type && !in_array($type, $VALID_TYPES)) {
    echo json_encode(["error" => "Invalid type"]);
    http_response_code(400);
    exit;
}

$sql = "
SELECT
    kb.Post_ID,
    kb.Title,
    kb.Description,
    kb.Type,
    kb.Visibility,
    t.Topic_Name,
    t.Topic_ID,
    usr.User_ID,
    usr.Forename,
    usr.Surname,
    kb.Date_Created,
    kb.Is_Protected
FROM
    Knowledgebase_Posts kb
LEFT JOIN
    Post_Topic pt ON kb.Post_ID = pt.Post_ID
LEFT JOIN
    Topics t ON pt.Topic_ID = t.Topic_ID
LEFT JOIN
    Users usr ON kb.User_ID = usr.User_ID
WHERE 1=1
";

if ($topic !== null) {
    $sql .= " AND t.Topic_Name = '$topic'";
}
if ($type !== null) {
    $sql .= " AND kb.Type = '$type'";
}
if ($query !== null) {
    $sql .= " AND LOWER(kb.Title) LIKE LOWER('%$query%')";
}
if ($_SESSION['role'] !== 'Admin') {
    $sql .= " AND kb.Visibility = 'All Users'";
}

$sql .= " ORDER BY kb.Date_Created DESC";

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>