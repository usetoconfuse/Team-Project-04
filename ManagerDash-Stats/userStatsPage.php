<!-- Created by Quinn Little 07/02/2025 -->
<!-- Updated by Toby Tischler 08/02/2025 -->

<!-- Tab for User Statistics -->

<link rel="stylesheet" href="ManagerDash-Stats/userStatsPage.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
   

<div id="mgrStatsUser-grid-container">
        <!-- <div id="userStats-Flex-Item1"> -->

        <div id="userStats-buttons" class="mgrStatsUser-grid-item">
        <h1>User Statistics</h1>
            <div id='userStatsFlexTitle'>
                    <div id="backButton" class="all-projects-btn black-btn">
                        <i class='fa fa-solid fa-arrow-left'></i>
                        Back
                    </div>
                <div class='all-projects-btn black-btn'>
                    change password
                </div>
                <div class='all-projects-btn black-btn' >
                    Promote
                </div>
            </div>
        </div>


        
            <!-- <canvas id="weeklyManHrsChart" width="400" height="200"></canvas> -->
            <!-- Graph showing how many tasks in each category are assigned to each member -->
            <div id="userStats-weeklyGraph" class="mgrStatsUser-grid-item">

                <!-- Dropdown for graphs -->
                <!-- <div id="userStats-graphChangeButton">
                    <i class="fa fa-solid fa-sort"></i>
                    <select name="userStats-chooseGraph" id="userStats-chooseGraph">
                        <option value="userStats-chooseGraph-weekHrs">Task Status Graph</option>
                        <option value="userStats-chooseGraph-overlap">Project Gantt Chart</option>
                    </select>
                </div> -->

                <div id="userStats-weekHrsContainer"> <!-- Task Status Graph -->
                    <!-- <canvas id="userStats-weekHrsContainerGraph"></canvas> -->
                                        <!-- Task dial -->
                                        <div id="userStTaskDialCell">
                                            <div id="userStTaskDialChartBox">
                                                <canvas id="userStTaskDialChart"></canvas>
                                            </div>

                                            <div id="userStTaskDialPercentage">
                                                <h1 id="userStTaskDialPercentageText"></h1>
                                                <p id="userStatsPercentText">Complete</p>
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

            </div>





<!-- //TABLE OF EVERY PROJECT FOR THAT USER, AND MAN HOURS -->
            <div id='userStats-ganttChart' class='mgrStatsUser-grid-item'>

            <div id="userStats-overlapContainer">
                    <canvas id="userStats-overlapContainerGraph"></canvas>
                </div>




                <!-- <table class="userStats-tr" id="userStats-projHrsTable"> -->
            <!-- Fetch Data Here -->
                <!-- </table> -->
        <!-- </div> -->
            </div>


<!-- modal -->
            <!-- FILTER -->
            <!--Filter Posts -->
            <div id="filter-modal" class="modal">
                <div class="modal-box">
                    <!--Header-->
                    <div class="modal-header">
                        <p>Filter Tasks</p>
                        <div class="close-modal-btn">
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <!--Body-->
                    <form id="filter-modal-form" class="modal-body">
                        <div class="task-dropdowns-form" id="post-dropdowns-form">


                            <!--DropDown 1-->
                            <div class="task-dropdown task-dropdown-priority">
                                <label for="priority">Priority</label>
                                <div class="task-dropdown-select-options">
                                    <div class="task-dropdown-priority-icon task-dropdown-icon">
                                        <i class="fa fa-solid fa-star"></i>
                                    </div>
                                    <select name="priority" id="priority">
                                        <option value="All" selected>Show All</option>

                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <!--DropDown 2-->
                            <div class="task-dropdown task-dropdown-date">
                                <label for="date">Due Date</label>
                                <div class="task-dropdown-select-options">
                                    <div class="task-dropdown-date-icon task-dropdown-icon">
                                        <i class="fa fa-solid fa-calendar-days"></i>
                                    </div>
                                    <select name="date" id="date-task">
                                        <option value="All" selected>Show All</option>
                                        <option value="Today">Today</option>
                                        <option value="Tomorrow">Tomorrow</option>
                                        <option value="This Week">This Week</option>
                                        <option value="Next Week">Next Week</option>
                                        <option value="Later">Later</option>
                                    </select>
                                </div>
                            </div>
                            <!--DropDown 3-->
                            <div class="task-dropdown task-dropdown-stuck">
                                <label for="date">Show Stuck</label>
                                <div class="task-dropdown-select-options">
                                    <div class="task-dropdown-stuck-icon task-dropdown-icon">
                                        <i class="fa fa-solid fa-exclamation"></i>
                                    </div>
                                    <select name="stuck" id="stuck-task">
                                        <option value="All" selected>Show All</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>

                            <div class="task-dropdown task-dropdown-proj">
                                <label for="userProj">User's Projects</label>
                                <div class="task-dropdown-select-options">
                                    <div class="task-dropdown-stuck-icon task-dropdown-icon">
                                        <i class="fa fa-solid fa-exclamation"></i>
                                    </div>
                                    <select name="userProj" id="user-proj">
                                            <!-- Auto Fill Options  -->

                                    
                                    </select>
                                </div>
                            </div>

                        </div>
                    </form>
                    <div class="task-submit-buttons">
                        <a class="add-filter-btn" id="add-filter-btn">
                            Filter Tasks
                            <i class="fa fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>















<div id="userStats-allTasksFilters" class="mgrStatsUser-grid-item">
<!-- ORDER BY DROPDOWN -->
         <div class="projects-intro-buttons">
            <div class="order-by-dropdown">
                <select>
                    <option value="None" selected>None</option>
                    <option value="Priority High to Low">Priority High to Low</option>
                    <option value="Priority Low to High">Priority Low to High</option>
                    <option value="Due First">Due First</option>
                    <option value="Due Last">Due Last</option>
                    <option value="Most Overdue">Most Overdue</option>
                </select>
                <div>
                    <a href="#" class="order-by-confirm black-btn">Order By</a>
                </div>
            </div>

            <!-- FILTER BTNS -->
            <div class="filter-task-btn black-btn">Filter
                <i class="fa fa-solid fa-sliders"></i>
            </div>



            <div class="filter-applied-container">
                <p class="filter-applied-msg"></p>
                <div class="remove-filters-btn">
                    <i class='fa fa-solid fa-x'></i>
                </div>
            </div>
</div>

<!-- Table of all tasks for specific user -->
    <div id="userStats-allTasksUser" class="mgrStatsUser-grid-item">
    <!-- <div class="userStats-type-btns">
            <button id="userStats-type-showall-btn" class="active">All</button>
            <button id="userStats-type-earliest-btn" value="earliest">Earliest Start Date</button>
            <button id="userStats-type-high-btn" value="high">High Priority</button>
            <button id="userStats-type-stuck-btn" value="stuck">Stuck</button>

        </div> -->
         
        <div class="statsHome-table">

       

            <table class="userStats-tr" id="allTaskTable-userStats">
            
            </table>
        </div>
    </div>

</div>


<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script> -->
<script src="ManagerDash-Stats/userStatsPage.js"></script>

