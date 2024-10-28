<!-- Displays a list of all projects on the left. A manager selects a project
 to view project progress, project team members and contributions by member. -->

<link rel="stylesheet" href="managerDashContent.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />

<div id="mdGrid">


    <!-- List of all projects -->
    <div id="mdProjectListBox">
        <h1>All Projects</h1>

        <div class="mdListContainer" id="mdProjectList">
            <div class="mdListItem mdActive">
                <h3>Project #1</h3>
                <i class="fa fa-solid fa-arrow-right"></i>
            </div>
        </div>
    </div>


    <!-- Graph showing project progress with number of tasks
     completed/in progress/overdue/not started -->
    <div id="mdProjectProgressBox">

        <h1>Project #1</h1>
        <div id="mdProgressChartContainer">
            <canvas id="mdProgressBarChart"></canvas>
        </div>
        <div id="mdProgressPercentageText">
            <h1>25%</h1>
            <p>Completed</p>
        </div>

        <div id="mdProgressChartLegend">
            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdGreen"></i>
                    <h1>5</h1>
                </div>
                <p>Done</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdYellow"></i>
                    <h1>7</h1>
                </div>
                <p>In Progress</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdRed"></i>
                    <h1>4</h1>
                </div>
                <p>Overdue</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdGrey"></i>
                    <h1>4</h1>
                </div>
                <p>Not Started</p>
            </div>
        </div>
    </div>


    <!-- List of team members -->
    <div id="mdProjectMembersBox">
        <h1>Team Members</h1>
        <div class="mdListContainer" id="mdMemberList">
            <div class="mdListItem">
                <div>
                    <div class="user" style="background-color:#9F6464">
                        <i class="fa fa-solid fa-user"></i>
                    </div>
                    <h3>John Little</h3>
                    <i class="fa fa-solid fa-crown"></i>
                </div>
                <p>4 Tasks</p>
            </div>
        </div>
    </div>


    <!-- Graph showing how many tasks in each category are assigned to each member -->
    <div id="mdProjectContributionBox">
        <h1>Project Contribution Graph</h1>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="managerDashContent.js"></script>