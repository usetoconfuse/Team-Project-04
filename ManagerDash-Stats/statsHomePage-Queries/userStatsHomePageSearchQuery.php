<?php
// Made by Quinn Little 10/02/2025
// Updated by Quinn Little 14/02/2025

    include '../../config/db-setup.php';

    // $userId = isset($_GET['userID']) ? intval($_GET['userID']) : null;

    $priority = isset($_GET['priorityValueHome']) ? $_GET['priorityValueHome'] : null;
    $date = isset($_GET['dateValueHome']) ? $_GET['dateValueHome'] : null;
    $stuck = isset($_GET['stuckValueHome']) ? $_GET['stuckValueHome'] : null;
    $orderBy = isset($_GET['orderByValueHome']) ? $_GET['orderByValueHome'] : null;
    $searchParam = isset($_GET['searchParam']) ? $_GET['searchParam'] : null;

    // echo $stuck;
    // echo $orderBy;

    $taskSQL = "SELECT Users.User_ID, Users.Forename, Users.Surname, 
                SUM(CASE WHEN Tasks.Stuck = 2 or Tasks.Stuck = 1 Then 1 ELSE 0 END) AS count_stuck, 
                SUM(CASE WHEN Tasks.Due_Date < CURDATE() THEN 1 ELSE 0 END) AS count_overdue, 
                SUM(CASE WHEN Tasks.Status = 'Completed' THEN 1 ELSE 0 END) AS count_completed, 
                SUM(CASE WHEN Tasks.Status = 'To Do' OR Tasks.Status = 'In Progress' THEN 1 ELSE 0 END) AS count_remaining FROM Users LEFT JOIN Tasks
            ON Users.User_ID = Tasks.Assignee_ID
            WHERE (CONCAT(Users.Forename, ' ', Users.Surname) LIKE '%$searchParam%' OR Users.User_ID LIKE '%$searchParam%')
                AND Users.User_Type <> 'Admin'
            ";

    if (!empty($priority)) { //COMPLETED OR NOT COMPLETED
        switch ($priority) {
            case 'Yes':
                $taskSQL .= " AND Tasks.Status = 'Completed'";
                break;
            case 'No':
                $taskSQL .= " AND NOT Tasks.Status = 'Completed'";
                break;
            default:
                break;
        }  
    }

    if (!empty($date)) { //OVERDUE OR NOT OVERDUE
        switch ($date) {
            case 'Yes':
                $taskSQL .= " AND Tasks.Due_Date < CURDATE()";
                break;
            case 'No':
                $taskSQL .= " AND Tasks.Due_Date >= CURDATE()";
                break;
            default:
                break;
        }
    }
    

    if (!empty($stuck)) { //STUCK OR NOT STUCK
        switch ($stuck) {
            case 'Yes':
                $taskSQL .= " AND Tasks.Stuck IN (1,2)"; //Stuck reported to an Admin/Leader
                break;
            case 'No':
                $taskSQL .= " AND Tasks.Stuck = 0";
                break;
            default:
                break;
        }
    }

    $taskSQL .= " GROUP BY Users.User_ID";


    if ($orderBy !== 'None') {
        if (!empty($orderBy)) {
            switch ($orderBy) {
                case 'MostStuck':
                    $taskSQL .= " ORDER BY count_stuck DESC;";
                    break;
                case 'MostCompleted':
                    $taskSQL .= " ORDER BY count_completed DESC;";
                    break;
                
                case 'MostOverdue': //Order by  Users with the Highest amount of overdue tasks
                    $taskSQL .= " ORDER BY count_overdue DESC;";
                    break;
                default: 
                    break;
            }
        }
    }





    // echo $taskSQL;

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