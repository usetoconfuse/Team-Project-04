
<?php

    //NEW PLAN:
    //When we click View button, don't do the fetch request then, but we
    //add to the URL the project ID (attribute of the card). 

    //Do the Fetch request when the new kanban page opens and then
    //In Kanban JS we do the fetch request to get all data and populate the page.
    //The fetch request in Kanban JS will take in a parameter whcih is the
    //project ID which can be gotten from the URL. 

    
    include '../config.php';

    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }


    $projectId = isset($_GET['projectId']) ? intval($_GET['projectId']) : null;

    $sql = "SELECT * FROM Tasks WHERE project_id = ?";

   
    $result = mysqli_query($conn,$sql);

    if(!$result){
        die("Query failed ". mysqli_error($conn));
    }

    $allDataArray = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        $allDataArray[] = $row;
    }
    
    echo json_encode($allDataArray);
?>