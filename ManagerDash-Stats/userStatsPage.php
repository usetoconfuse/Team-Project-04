<!-- Created by Quinn Little 07/02/2025 -->
<!-- Updated by Toby Tischler 08/02/2025 -->

<!-- Tab for User Statistics -->

<link rel="stylesheet" href="ManagerDash-Stats/userStatsPage.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
   
<h1>User Statistics</h1>
<div id="mgrStatsUser-grid-container">
        <!-- <div id="userStats-Flex-Item1"> -->




        
            <!-- <canvas id="weeklyManHrsChart" width="400" height="200"></canvas> -->
            <!-- Graph showing how many tasks in each category are assigned to each member -->
            <div id="userStats-weeklyGraph" class="mgrStatsUser-grid-item">

                <!-- Dropdown for graphs -->
                <div id="userStats-graphChangeButton">
                    <i class="fa fa-solid fa-sort"></i>
                    <select name="userStats-chooseGraph" id="userStats-chooseGraph">
                        <option value="userStats-chooseGraph-weekHrs">Task Status Graph</option>
                        <option value="userStats-chooseGraph-overlap">Project Gantt Chart</option>
                    </select>
                </div>

                <div id="userStats-weekHrsContainer"> <!-- Task Status Graph -->
                    <!-- <canvas id="userStats-weekHrsContainerGraph"></canvas> -->
                                        <!-- Task dial -->
                                        <div id="userStTaskDialCell">
                                            <div id="userStTaskDialChartBox">
                                                <canvas id="userStTaskDialChart"></canvas>
                                            </div>

                                            <div id="userStTaskDialPercentage">
                                                <h1 id="userStTaskDialPercentageText"></h1>
                                                <p id="userStatsPercentText">Of Tasks Complete</p>
                                            </div>

                                            <div id="userStTaskDialLegend">
                                                <div class="userStTaskDialLegendItem">
                                                    <div class="userStTaskDialLegendCounter">
                                                        <i class="fa-solid fa-circle fa-2xs prjStGray"></i>
                                                        <h3 id="userStLegendDone"></h3>
                                                    </div>
                                                    <p>To Do</p>
                                                </div>

                                                <div class="userStTaskDialLegendItem">
                                                    <div class="userStTaskDialLegendCounter">
                                                        <i class="fa-solid fa-circle fa-2xs prjStY"></i>
                                                        <h3 id="userStLegendInprog"></h3>
                                                    </div>
                                                    <p>In Progress</p>
                                                </div>

                                                <div class="userStTaskDialLegendItem">
                                                    <div class="userStTaskDialLegendCounter">
                                                        <i class="fa-solid fa-circle fa-2xs  prjStG"></i>
                                                        <h3 id="userStLegendTodo"></h3>
                                                    </div>
                                                    <p>Completed</p>
                                                </div>
                                            </div>
                                        </div>
                </div>
                <div id="userStats-overlapContainer">
                    <canvas id="userStats-overlapContainerGraph"></canvas>
                </div>

            </div>





<!-- //TABLE OF EVERY PROJECT FOR THAT USER, AND MAN HOURS -->
            <div id='userStats-projHrs' class='mgrStatsUser-grid-item'>
                <table class="userStats-tr" id="userStats-projHrsTable">
            <!-- Fetch Data Here -->
                </table>
        <!-- </div> -->
            </div>


<!-- test -->
<!-- Table of all tasks for specific user -->
    <div id="userStats-allTasksUser" class="mgrStatsUser-grid-item">
    <div class="userStats-type-btns">
            <button id="userStats-type-showall-btn" class="active">All</button>
            <button id="userStats-type-earliest-btn" value="earliest">Earliest Start Date</button>
            <button id="userStats-type-high-btn" value="high">High Priority</button>
            <button id="userStats-type-stuck-btn" value="stuck">Stuck</button>

        </div>
        <div class="statsHome-table">
            <!-- <div class="filter-task-btn black-btn">Filter
                <i class="fa fa-solid fa-sliders"></i>
            </div> -->
            <table class="userStats-tr" id="allTaskTable-userStats">
            
            </table>
        </div>
    </div>

</div>
</div>


<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script> -->
<script src="ManagerDash-Stats/userStatsPage.js"></script>

