<?php
// Made by Quinn Little 14/02/2025

    include '../../config/db-setup.php';

    if (isset($_GET['searchParams'])) {
        // Retrieve parameter
        $searchParams = htmlspecialchars($_GET['searchParams']); // Sanitize input
    }


    //$type = "Non-Technical"; // placeholder , will be fetched from button clicked

    //Select the first 45 projects
   $sql = "SELECT
                Projects.Project_ID,
                Projects.Project_Title,
                Projects.Project_Leader,
                Projects.Due_Date,
                IF (Projects.Status = 'Completed', 'Yes', 'No') AS Completed,
                CASE
                    WHEN Projects.Status = 'Completed'
                    AND DATEDIFF(Projects.Due_Date, Projects.Completion_Date) >= 0
                        THEN 'No'
                    WHEN Projects.Status != 'Completed'
                    AND DATEDIFF(Projects.Due_Date, CURRENT_DATE) >= 0
                        THEN 'No'
                    ELSE 'Yes'
                END AS Overdue,
                Leader.Forename,
                Leader.Surname,
                IFNULL(big.Members, 0) AS Members,
                IFNULL(big.Tasks, 0) AS Tasks
            FROM
                Projects
            LEFT JOIN
                Users AS Leader
            ON Leader.User_ID = Projects.Project_Leader
            LEFT JOIN
                (SELECT
                    Projects.Project_ID,
                    COUNT(DISTINCT Users.User_ID) AS Members,
                    COUNT(DISTINCT Tasks.Task_ID) AS Tasks
                FROM
                    Projects,
                    Users,
                    Tasks,
                    User_Teams
                WHERE
                    User_Teams.User_ID = Users.User_ID
                    AND User_Teams.Project_ID = Projects.Project_ID
                    AND Tasks.Project_ID = Projects.Project_ID
                GROUP BY
                    Projects.Project_ID) AS big
            ON Projects.Project_ID = big.Project_ID
            WHERE Projects.Project_ID LIKE '%$searchParams%'
            ";


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