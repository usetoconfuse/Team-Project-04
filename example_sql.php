<?php
   //For error reporting 
   ini_set('display_errors', 1);
   ini_set('display_startup_errors', 1);
   error_reporting(E_ALL);
   
    //Details to connect 
    $servername = 'link to server';
    $username = 'db username';
    $password = 'db password';
    $dbname = 'db name';

    //Create a connection to database
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    //if connection fails, print error
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    header('Content-Type: application/json');

    //These are values inputted in the front end and sent to the PHP from JavaScript 
    // via Fetch parameters. isset() checks if it is set or not in the front end. 
    $price = isset($_GET['price']) ? $_GET['price'] : null;
    $capacity = isset($_GET['capacity']) ? $_GET['capacity'] : null;
    $rating = isset($_GET['rating']) ? $_GET['rating'] : null;
    $cateringGrade = isset($_GET['cateringGrade']) ? $_GET['cateringGrade'] : null;
    $licensed = isset($_GET['licensed']) ? $_GET['licensed'] : null;
    $dateSelector = isset($_GET['dateSelectorValue']) ? $_GET['dateSelectorValue'] : null;
    $dateType = isset($_GET['dateTypeValue']) ? $_GET['dateTypeValue'] : 'any';

    //Depending on the values inputted, we dynamically build an SQL query

    //Start with Select statement. Select all the ones we definitely want to return 
    $venuesSql = "SELECT v.venue_id, v.name, v.capacity, AVG(r.score) AS average_rating,v.licensed, v.latitude, v.longitude, v.weekend_price, v.weekday_price, COUNT(b.venue_id) AS popularity";

    //if catering grade is set, then we also add this to the Select statement
    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= ", c.grade";
    }

    //After the Select statement, add FROM and any JOINS that are always necessary
    $venuesSql .=  " FROM venue v 
                    LEFT JOIN venue_review_score r ON v.venue_id = r.venue_id
                    LEFT JOIN venue_booking b ON v.venue_id = b.venue_id";
    
    //If catering grade is set, then we also Join with the Catering table
    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= " LEFT JOIN catering c ON v.venue_id = c.venue_id";
    }

    //MUST set this as it then allows you to add as many WHERE statements as you like
    //ie WHERE 1=1 AND -- AND -- AND -- (etc)
    $venuesSql .= " WHERE 1=1";

    //If the dateSelector is set, then we add this to the WHERE statement
    if (!empty($dateSelector)) {
        $venuesSql .= " AND v.venue_id NOT IN ( /*check ID isn't in table for date*/
                                                SELECT venue_id
                                                FROM venue_booking
                                                WHERE booking_date = '$dateSelector')";
    }

    //If catering grade is set, we add this to the WHERE statement
    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= " AND c.grade = $cateringGrade";
    }

    //ETC ETC - can add as many WHEREs as needed

    //Add Group By statement
    $venuesSql .= " GROUP BY v.venue_id, v.name, v.capacity, v.weekend_price, v.weekday_price, v.licensed ,v.latitude, v.longitude";

    //If catering grade is set, we also want to group by Catering Grade
    if (!empty($cateringGrade) && $cateringGrade !== 'any') {
        $venuesSql .= ", c.grade";
    }

    //Add any having statements
    if (!empty($rating)) {
        $venuesSql .= " HAVING average_rating >= $rating";
    }

    //Add any Order By statements
    //Order By statements usually make sense one at a time, so you cannot have multiple. 

    //Get the value of the Order By statement if it is set
    $order = isset($_GET['order']) ? $_GET['order'] : null;

    //If it is set and order by capacity, then append Order By Capacity to the SQL
    if ($order == 'capacityOrder') {
        $venuesSql .= " ORDER BY v.capacity DESC";
    }
    //ETC
    if ($order == 'capacityOrderReverse') {
        $venuesSql .= " ORDER BY v.capacity ASC";
    }

    if ($order == 'ratingOrder') {
        $venuesSql .= " ORDER BY average_rating DESC";
    }


    //Get the results of the query from the database
    $venuesResult = mysqli_query($conn, $venuesSql);
   

    //Add the results to an array 
    $venuesArray = array();
    while ($row = mysqli_fetch_array($venuesResult, MYSQLI_ASSOC)) {
        $venuesArray[] = $row;
    }

    $allVenueData = array("venues" => $venuesArray); 

    //Close connection
    mysqli_close($conn);
    
    //Send JSON back to the JavaScript 
    echo json_encode($allVenueData);

?>