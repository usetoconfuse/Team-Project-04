<!-- Created by Quinn Little 07/02/2025 -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Specific User Statistics</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
<link rel="stylesheet" href="statisticsContent.css">

</head>
<body>




<!-- Tab for User Statistics -->

    <h1>User Statistics</h1>
    <div id="mgrStatsUser-grid-container">
            <!-- <div id="userStats-Flex-Item1"> -->
            
                <!-- <canvas id="weeklyManHrsChart" width="400" height="200"></canvas> -->
                <!-- Graph showing how many tasks in each category are assigned to each member -->
                <div id="userStats-weeklyGraph" class="mgrStatsUser-grid-item">
                <div id="userStats-weekHrsContainer">
                    <canvas id="userStats-weekHrsContainerGraph"></canvas>
                </div>
                </div>

                <div id='userStats-projectHrsTable' class='mgrStatsUser-grid-item'>
                    <table>
                    <thead>
                        <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                        <th>Header 4</th>
                        <th>Header 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Row 1, Cell 1</td>
                        <td>Row 1, Cell 2</td>
                        <td>Row 1, Cell 3</td>
                        <td>Row 1, Cell 4</td>
                        <td>Row 1, Cell 5</td>
                        </tr>
                        <tr>
                        <td>Row 2, Cell 1</td>
                        <td>Row 2, Cell 2</td>
                        <td>Row 2, Cell 3</td>
                        <td>Row 2, Cell 4</td>
                        <td>Row 2, Cell 5</td>
                        </tr>
                        <!-- Continue adding rows up to Row 20 -->
                        <tr>
                        <td>Row 20, Cell 1</td>
                        <td>Row 20, Cell 2</td>
                        <td>Row 20, Cell 3</td>
                        <td>Row 20, Cell 4</td>
                        <td>Row 20, Cell 5</td>
                    </tbody>
                    </table>
            <!-- </div> -->
                </div>


<!-- test -->

        <div id="userStats-allTasksUser" class="mgrStatsUser-grid-item">
        <table>
                <th>ID</th><th>Project</th><th>Task</th><th>Man Hours</th>
            <tr><td>1</td><td>Proj A</td><td>make python</td><td>5</td></tr>    
            </table>
        </div>
   
    </div>




<script src="UserStatsPage.js"></script>

</body>
</html>