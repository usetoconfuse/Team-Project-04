<?php
include '../../config/db-setup.php';

$VALID_TYPES = ['Technical', 'Non-Technical'];

$searchedPost = $_GET['searchedPost'] ?? null ;

//need to check how to ensure that it will only show the searches within the selected type

//$type = $_GET['selectedType'] ?? null;



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
WHERE
    LOWER(kb.Title) LIKE LOWER('%$searchedPost%')
";

/*
if ($type) {
    $sql .= " WHERE kb.Type = '$type'";
} */

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>