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

//the topic name provided when clicking on a topic item within the topic list
$clicked_topic = isset($_GET['clicked_topic']) ? $_GET['clicked_topic'] : null;

// select all relevant field from KnowledgeBase table that have the topic which was clicked on, and that create array of json data
$sql = "SELECT kb.Post_ID, kb.Title, kb.Description, kb.Type, t.Topic_Name, usr.Forename, usr.Surname, kb.Date_Created, kb.Is_Protected 
    FROM Knowledgebase_Posts kb  
    INNER JOIN Post_Topic pt ON kb.Post_ID = pt.Post_ID  
    INNER JOIN Topics t ON pt.Topic_ID = t.Topic_ID  
    INNER JOIN Users usr ON kb.User_ID = usr.User_ID  
    WHERE t.Topic_Name = '$clicked_topic' ";

$result = mysqli_query($conn, $sql);
$allDataArray = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    $allDataArray[] = $row;
}

echo json_encode($allDataArray);
?>