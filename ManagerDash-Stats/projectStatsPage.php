<!-- Created By Quinn Little 07/02/2025 -->
<!-- Updated By Toby Tischler 13/02/2025 -->

<!-- Tab for project statistics -->

<link rel="stylesheet" href="ManagerDash-Stats/projectStatsPage.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />

<div id="prjStContainer">

    <!-- Header -->
    <div id="prjStHeader">

        <!-- Numerical stats -->
        <div id="prjStHeaderNums">
        </div>

        <!-- Task dial -->
        <div id="prjStTaskDialCell">
            <div id="prjStTaskDialChartBox">
                <canvas id="prjStTaskDialChart"></canvas>
            </div>

            <div id="prjStTaskDialPercentage">
                <h1 id="prjStTaskDialPercentageText"></h1>
                <p id="prjStatsPercentText">Of Tasks Complete</p>
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
    </div>

    <!-- Main grid -->
    <div id="prjStGrid">

        <!-- Burnup chart -->
        <div id="prjStBurnupCell" class="prjStGridCells">
            <div id="prjStBurnupChartBox">
                <canvas id="prjStBurnupChart"></canvas>
            </div>
        </div>

        <!-- Contribution by member chart -->
        <div id="prjStPrevWeekCell" class="prjStGridCells">
            <div id="prjStPrevWeekChartBox">
                <canvas id="prjStPrevWeekChart"></canvas>
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
</div>




<script src="ManagerDash-Stats/projectStatsPage.js"></script>