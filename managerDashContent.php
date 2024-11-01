<!-- Displays a list of all projects on the left. A manager selects a project
 to view project progress, project team members and contributions by member. -->

<link rel="stylesheet" href="managerDashContent.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />

<div id="mdGrid">


    <!-- List of all projects -->
    <div id="mdProjectListBox">
        <h1 class="mdTitle">All Projects</h1>
        <div class="mdListContainer" id="mdProjectList"></div>
    </div>


    <!-- Overview information about the current project -->
     <div i="mdProjectInfoBox">
        <h1 id="mdSelectedProjectName" class="mdTitle"></h1>
        <div id="mdInfoContainer">
            <h4 id="mdProjectMemberCountText"></h4>
            <h4 id="mdProjectCreationDateText"></h4>
            <h4 id="mdProjectDeadlineDateText"></h4>
            <br>
            <h4 id="mdProjectCreatorText"></h4>
            <h4 id="mdTeamLeaderText"></h4>
        </div>
     </div>


    <!-- Graph showing project progress with number of tasks
     completed/in progress/overdue/not started -->
    <div id="mdProjectProgressBox">

        <h1 class="mdTitle">Progress</h1>
        <div id="mdProgressChartContainer">
            <canvas id="mdProgressChart"></canvas>
        </div>
        <div id="mdProgressPercentage">
            <h1 id="mdProgressPercentageText"></h1>
            <p>Completed</p>
        </div>

        <div id="mdProgressChartLegend">
            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdGreen"></i>
                    <h3 id="mdLegendDoneText"></h3>
                </div>
                <p>Done</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdYellow"></i>
                    <h3 id="mdLegendInProgressText"></h3>
                </div>
                <p>In Progress</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdRed"></i>
                    <h3 id="mdLegendOverdueText"></h3>
                </div>
                <p>Overdue</p>
            </div>

            <div class="mdLegendItem">
                <div class="mdLegendCounter">
                    <i class="fa-solid fa-circle fa-2xs mdGrey"></i>
                    <h3 id="mdLegendNotStartedText"></h3>
                </div>
                <p>Not Started</p>
            </div>
        </div>
    </div>


    <!-- List of team members -->
    <div id="mdProjectMembersBox">
        <h1 id="mdProjectMembersBoxText" class="mdTitle"></h1>
        <div class="mdListContainer" id="mdMemberList"></div>
    </div>


    <!-- Graph showing how many tasks in each category are assigned to each member -->
    <div id="mdProjectContributionBox">
        <h1 class="mdTitle">Tasks by Member</h1>
        <div id="mdContributionGraphContainer">
            <div id="mdContributionGraphArea">
                <canvas id="mdContributionGraph"></canvas>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="managerDashContent.js"></script>