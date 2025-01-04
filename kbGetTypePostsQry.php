<?php
<<<<<<< HEAD

include 'config/db-setup.php';

$conn = mysqli_connect($servername, $username, $password, $dbname);
=======
    include 'config/db-setup.php';
>>>>>>> 9821264a5895177a8d926ad77e6c14e481c32c8f

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$type = isset($_GET['type']) ? $_GET['type'] : null; // placeholder , will be fetched from button clicked

error_log("Received type: " . $type);

// select all relevant field from KnowledgeBase table that have Type of Technical or Non-Technical depeding on user choice, and that create array of json data
if ($type == "Technical" || $type == "Non-Technical") {
    $sql = "SELECT kb.Post_ID, kb.Title, kb.Description, kb.Type, t.Topic_Name, usr.Forename, usr.Surname, kb.Date_Created, kb.Is_Protected 
                FROM Knowledgebase_Posts kb  
                INNER JOIN Post_Topic pt ON kb.Post_ID = pt.Post_ID  
                INNER JOIN Topics t ON pt.Topic_ID = t.Topic_ID  
                INNER JOIN Users usr ON kb.User_ID = usr.User_ID ";
}

if ($type == "Technical") {
    $sql .= " WHERE kb.Type = 'Technical' ";
}

if ($type == "Non-Technical") {
    $sql .= " WHERE kb.Type = 'Non-Technical' ";
}


$result = mysqli_query($conn, $sql);

if (!$result) {
    error_log("Query failed: " . mysqli_error($conn));
    echo json_encode(["error" => "Database query failed"]);
    http_response_code(500); // Send a proper HTTP response code
    exit;
}

$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>