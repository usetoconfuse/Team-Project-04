<!-- Created By Quinn Little 07/02/2025 -->
<!-- Updated By Toby Tischler 16/02/2025 -->

<!-- Tab for project statistics -->

<link rel="stylesheet" href="ManagerDash-Stats/projectStatsPage.css" />

<!-- Error message if project not found -->
<h1 id="prjStErrorBox">Project not found</h1>

<!-- Main content -->
<div id="prjStContainer">

    <!-- Project header -->
    <div id="pjStHeaderCell">
        <!-- Header content -->
        <div id="prjStHeader">
        </div>
    </div>

    <hr>
    

    <div id="prjStMainContentWrapper">

        <!-- Main content -->
        <div id="prjStContentGrid">

        

            <!-- Task dial -->  
            <div id="prjStTaskDialCell" class="prjStCell">

                <!-- Task dial content -->
                <div id="prjStTaskDialDisplay">

                    <div id="prjStTaskDialChartBox" class="prjStChartBox">
                        <canvas id="prjStTaskDialChart"></canvas>

                        <div id="prjStTaskDialPercentage">
                            <h1 id="prjStTaskDialPercentageText"></h1>
                            <p id="prjStatsPercentText">Complete</p>
                        </div>
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
                            <p>To Do</p>
                        </div>
                    </div>
                </div>

                <!-- No tasks message box -->
                <h1 id="prjStTaskDialEmptyText">
                </h1>
            </div>

            <!-- Burnup chart -->
            <div id="prjStBurnupCell" class="prjStCell">
                <div id="prjStBurnupChartBox" class="prjStChartBox">
                    <canvas id="prjStBurnupChart"></canvas>
                </div>
            </div>



            <!-- Weekly contribution breakdown chart -->
            <div id="prjStPrevWeekCell" class="prjStCell">
                <div id="prjStPrevWeekChartBox" class="prjStChartBox">
                    <canvas id="prjStPrevWeekChart"></canvas>
                </div>
            </div>
            


            <!-- Member list -->
            <div id="prjStMembersCell" class="prjStCell">
                <h4>Tasks by Project Member | <span id="prjStUserViewPrompt">click a member for details</span></h4>

                <div id="prjStMembersList">
                </div>
            </div>

        </div>

    </div>

</div>




<script src="ManagerDash-Stats/projectStatsPage.js"></script>