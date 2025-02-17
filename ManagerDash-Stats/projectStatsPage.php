<!-- Created By Quinn Little 07/02/2025 -->
<!-- Updated By Toby Tischler 16/02/2025 -->

<!-- Tab for project statistics -->

<link rel="stylesheet" href="ManagerDash-Stats/projectStatsPage.css" />

<!-- Error message if project not found -->
<h1 id="prjStErrorBox">Project not found</h1>

<!-- Main content -->
<div id="prjStContainer">

    <!-- Header -->
    <div id="prjStHeader">

        <!-- Header info -->
        <div id="pjStHeaderInfoContainer">
            <div id="prjStHeaderInfo">
            </div>
        </div>

        <!-- Task dial -->
        <div id="prjStTaskDialContainer">

            <!-- Task dial content -->
            <div id="prjStTaskDialDisplay">

                <div id="prjStTaskDialChartBox">
                    <canvas id="prjStTaskDialChart"></canvas>
                </div>

                <div id="prjStTaskDialPercentage">
                    <h1 id="prjStTaskDialPercentageText"></h1>
                    <p id="prjStatsPercentText">Complete</p>
                </div>

                <div id="prjStTaskDialLegend">
                    <div class="prjStTaskDialLegendItem">
                        <div class="prjStTaskDialLegendCounter">
                            <i class="fa-solid fa-circle fa-2xs prjStG"></i>
                            <h3 id="prjStLegendDone"></h3>
                        </div>
                        <p>Done</p>
                    </div>

                    <div class="prjStTaskDialLegendItem">
                        <div class="prjStTaskDialLegendCounter">
                            <i class="fa-solid fa-circle fa-2xs prjStY"></i>
                            <h3 id="prjStLegendInprog"></h3>
                        </div>
                        <p>In Progress</p>
                    </div>

                    <div class="prjStTaskDialLegendItem">
                        <div class="prjStTaskDialLegendCounter">
                            <i class="fa-solid fa-circle fa-2xs prjStGray"></i>
                            <h3 id="prjStLegendTodo"></h3>
                        </div>
                        <p>Not Started</p>
                    </div>
                </div>
            </div>

            <!-- No tasks message box -->
            <h1 id="prjStTaskDialEmptyText">
            </h1>
        </div>
    </div>

    <!-- Main grid -->
    <div id="prjStGrid">

        <!-- Burnup chart -->
        <div id="prjStBurnupCell" class="prjStGridCells">
            <div id="prjStBurnupChartBox" class="prjStGridChartBox">
                <canvas id="prjStBurnupChart"></canvas>
            </div>
        </div>

        <!-- Weekly contribution breakdown chart -->
        <div id="prjStPrevWeekCell" class="prjStGridCells">
            <div id="prjStPrevWeekChartBox" class="prjStGridChartBox">
                <canvas id="prjStPrevWeekChart"></canvas>
            </div>
        </div>
    </div>
    <!-- Member list -->
    <div id="prjStMembersCell" class="prjStGridCells">
        <div id="prjStMembersHeader">
        </div>

        <div id="prjStMembersList">
        </div>
    </div>
</div>




<script src="ManagerDash-Stats/projectStatsPage.js"></script>