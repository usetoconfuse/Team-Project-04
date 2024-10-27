<!-- Displays a list of all projects on the left. A manager selects a project
 to view project progress, project team members and contributions by member. -->

<link rel="stylesheet" href="managerDashContent.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />

<div id="mdGrid">


    <!-- List of all projects -->
    <div id="mdProjectListBox">
        <h1>All Projects</h1>

        <div id="mdProjectListItems">
            <div class="mdProjectListItem mdActive">
                <h3>Project #1</h3>
                <i class="fa fa-solid fa-arrow-right"></i>
            </div>
            <div class="mdProjectListItem">
                <h3>Project #2</h3>
            </div>
            <div class="mdProjectListItem">
                <h3>Project #3</h3>
            </div>
            <div class="mdProjectListItem">
                <h3>Project #4</h3>
            </div>
            <div class="mdProjectListItem">
                <h3>Project #5</h3>
            </div>
        </div>
    </div>


    <!-- Graph showing project progress with number of tasks
     completed/in progress/overdue/not started -->
    <div id="mdProjectProgressBox">

        <h1>Project Progress</h1>
        <div id="mdProgressChartContainer">
            <canvas id="mdProgressBarChart"></canvas>
        </div>
        <div id="mdProgressPercentageText">
            <h1>25%</h1>
            <p>Completed</p>
        </div>

        <div id="mdProgressChartLegend">
            <div class="mdLegendItem" id="mdDone">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs"></i>
                    <h1>5</h1>
                </div>
                <p>Done</p>
            </div>

            <div class="mdLegendItem" id="mdInProgress">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs"></i>
                    <h1>7</h1>
                </div>
                <p>In Progress</p>
            </div>

            <div class="mdLegendItem" id="mdOverdue">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs"></i>
                    <h1>4</h1>
                </div>
                <p>Overdue</p>
            </div>

            <div class="mdLegendItem" id="mdNotStarted">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs"></i>
                    <h1>4</h1>
                </div>
                <p>Not Started</p>
            </div>
        </div>
    </div>


    <!-- List of team members with team leader highlighted -->
    <div id="mdProjectMembersBox">
        <h1>Team Members</h1>
    </div>


    <!-- Graph showing how many tasks in each category are assigned to each member -->
    <div id="mdProjectContributionBox">
        <h1>Project Contribution Graph</h1>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="managerDashContent.js"></script>