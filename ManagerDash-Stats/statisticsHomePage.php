<!-- Created by Quinn Little 03/02/25 -->
<!-- Updated by Toby Tischler 09/02/2025 -->
<!-- Updated by Quinn Little 14/02/2025 -->

<!-- Tabs -->
<div id="mgrStatsAll">

    <!-- Header -->
    <div class="mgrStats-header-section">
        <h1 class="mgrStats-title">Statistics</h1>
        <div id="mgrStats-tabBtn">
            <button class="mgrStats-activeTab" id="mgrProjStats" value="tabGroupProjectStats">Project</button>
            <button id="mgrUserStats" value="tabGroupUserStats">User</button>
        </div>
    </div>


    <!-- Tab for Project Statistics -->
    <div id='tabGroupProjectStats' class="tabGroup">
        <!-- Project List Page -->
        <div id="statsHomeGridProject" class="statsHome-grid">
            <div id="statsHomeFiltersProj">
            <h1 class="instruction-txt">Click a Project to view it's Statistics</h1>

                <div class="stats-listing-search projStats-search"> <!-- Filters here -->
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search project" class="stats-search-colour " id="searched-proj">
                </div>
            </div>

            <div class="statsHome-table" id="statsHomeTableProj">

                <!--Fetch Project Table Here-->
            </div>
        </div>

        <!-- View Project Stats Page -->
        <div id="projectViewStats" class="statsHome-view">
            <?php include 'projectStatsPage.php'; ?>
        </div>
    </div>


    <!-- Tab for User Statistics -->
    <div id='tabGroupUserStats' class="tabGroup">

        <!-- User List Page -->
        <div id="statsHomeGridUser" class="statsHome-grid">

            <div id="statsHomeFiltersUser">
            <h1 class="instruction-txt">Click an employee to view their Statistics</h1>

                <div class="stats-listing-search userStats-search"> <!-- Filters here -->
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search user" class="stats-search-colour " id="searched-user">
                </div>            
            </div>
            <div class="statsHome-table" id="statsHomeTableUser">
                <!--Fetch User Table Here-->
            </div>
        </div>

        <!-- View User Stats Page -->
        <div id="userViewStats" class="statsHome-view">
            <?php include 'userStatsPage.php'; ?>
        </div>
    </div>

</div>



















               