<?php
include '../../config/db-setup.php';

$VALID_TYPES = ['Technical', 'Non-Technical'];

$topic = $_GET['topic'] ?? null;
$type = $_GET['type'] ?? null;
$query = $_GET['query'] ?? null;

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
    t.Topic_Name,
    usr.User_ID,
    usr.Forename,
    usr.Surname,
    kb.Date_Created
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

if ($topic) {
    $sql .= " AND t.Topic_Name = '$topic'";
}
if ($type) {
    $sql .= " AND kb.Type = '$type'";
}
if ($query) {
    $sql .= " AND LOWER(kb.Title) LIKE LOWER('%$query%')";
}

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>