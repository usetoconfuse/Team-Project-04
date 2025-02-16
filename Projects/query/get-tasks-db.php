<?php


include '../../config/db-setup.php';

$projectId = isset($_GET['projectID']) ? intval($_GET['projectID']) : null;
$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;



$taskSQL = "SELECT Man_Hours, Status, Priority FROM Tasks WHERE Project_ID = ? AND Start_Date <= CURDATE()";

if ($userId !== null) {
    $taskSQL .= " AND Assignee_ID = ?";
}
$stmt = $conn->prepare($taskSQL);

if ($userId !== null) {
    $stmt->bind_param("ii", $projectId, $userId);
} else {
    $stmt->bind_param("i", $projectId);
}


$stmt->execute();
$taskResult = $stmt->get_result();

if (!$taskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$taskDataArray = array();
while ($row = mysqli_fetch_array($taskResult, MYSQLI_ASSOC)) {
    $taskDataArray[] = $row;
}

echo json_encode($taskDataArray);
$stmt->close();
$conn->close();
?>