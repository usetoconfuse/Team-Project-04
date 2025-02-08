<!-- Created by Quinn Little 07/02/2025 -->
<!-- Updated by Toby Tischler 08/02/2025 -->

<!-- Tab for User Statistics -->

<h1>User Statistics</h1>
<div id="mgrStatsUser-grid-container">
        <!-- <div id="userStats-Flex-Item1"> -->
        
            <!-- <canvas id="weeklyManHrsChart" width="400" height="200"></canvas> -->
            <!-- Graph showing how many tasks in each category are assigned to each member -->
            <div id="userStats-weeklyGraph" class="mgrStatsUser-grid-item">
            <div id="userStats-weekHrsContainer"> <!--GRAPH OVERALL MAN HOURS LAST 7 DAYS-->
                <canvas id="userStats-weekHrsContainerGraph"></canvas>
            </div>
            </div>
<!-- //TABLE OF EVERY PROJECT FOR THAT USER, AND MAN HOURS -->
            <div id='userStats-projHrs' class='mgrStatsUser-grid-item'>
                <table id="userStats-projHrsTable">
            <!-- Fetch Data Here -->
                </table>
        <!-- </div> -->
            </div>


<!-- test -->
<!-- Table of all tasks for specific user -->
    <div id="userStats-allTasksUser" class="mgrStatsUser-grid-item">
    <table id="allTaskTable-userStats">
        
        </table>
    </div>

</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
<script src="ManagerDash-Stats/userStatsPage.js"></script>