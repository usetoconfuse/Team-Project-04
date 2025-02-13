<?php


include '../../config/db-setup.php';


$userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;
$priority = isset($_GET['priorityValue']) ? $_GET['priorityValue'] : null;
$date = isset($_GET['dateValue']) ? $_GET['dateValue'] : null;
$orderBy = isset($_GET['orderByValue']) ? $_GET['orderByValue'] : null;

$taskSQL = "SELECT * FROM Personal_Tasks WHERE User_ID = $userId";


if (!empty($priority)) {
    $taskSQL .= " AND Priority = '$priority'";
}

if (!empty($date)) {
    switch ($date) {
        case 'Today':
            $taskSQL .= " AND Due_Date = CURDATE()";
            break;
        case 'Tomorrow':
            $taskSQL .= " AND Due_Date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)";
            break;
        case 'This Week':
            $taskSQL .= " AND YEARWEEK(Due_Date, 1) = YEARWEEK(CURDATE(), 1)";
            break;
        case 'Next Week':
            $taskSQL .= " AND Due_Date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 1 WEEK)";
            break;
        case 'Later':
            $taskSQL .= " AND Due_Date > CURDATE()";
            break;
        default:
            break;
    }
}
if ($orderBy !== 'None') {
    if (!empty($orderBy)) {
        switch ($orderBy) {
            case 'Priority High to Low':
                $taskSQL .= " ORDER BY Priority DESC";
                break;
            case 'Priority Low to High':
                $taskSQL .= " ORDER BY Priority ASC";
                break;
            case 'Due First':
                $taskSQL .= " ORDER BY Due_Date ASC";
                break;
            case 'Due Last':
                $taskSQL .= " ORDER BY Due_Date DESC";
                break;
            case 'Most Overdue':
                $taskSQL .= " ORDER BY Due_Date ASC";
                break;
            default:
                break;
        }
    }
}



$taskResult = mysqli_query($conn, $taskSQL);

if (!$taskResult) {
    die("Query failed for Task Results" . mysqli_error($conn));
}

$taskDataArray = array();
while ($row = mysqli_fetch_array($taskResult, MYSQLI_ASSOC)) {
    $taskDataArray[] = $row;
}



echo json_encode($taskDataArray);
?>