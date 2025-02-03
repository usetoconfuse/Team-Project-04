<?php
include '../../config/db-setup.php';

$VALID_TYPES = ['Technical', 'Non-Technical'];

$topic = $_GET['topic'] ?? null;
$type = $_GET['type'] ?? null;

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
";

if ($topic && $type) {
    $sql .= " WHERE t.Topic_Name = '$topic' AND kb.Type = '$type'";
}
else if ($topic) {
    $sql .= " WHERE t.Topic_Name = '$topic'";
}
else if ($type) {
    $sql .= " WHERE kb.Type = '$type'";
}

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>