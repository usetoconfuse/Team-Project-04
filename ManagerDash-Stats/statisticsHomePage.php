<!-- Updated by Quinn Little 03/02/25 -->
<!-- Updated by Quinn Little 07/02/2025 -->
<!-- Renamed by Quinn Little 07/02/2025 -->
<!-- Updated by Toby Tischler 09/02/2025 -->
 <!-- Updated by Quinn Little 09/02/2025 -->

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
                Project Filters Here
            </div>
            <div id="statsHomeTableProj">
                <table id='projectStatsHomeTbl' class="statsHome-table">
                    <!--Fetch Project Data Here-->
                </table>
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
                User Filters Here
            </div>
            <div id="statsHomeTableUser">
                <table id='userStatsHomeTbl' class="statsHome-table">
                    <!--Fetch User Data Here-->
                </table>
            </div>
        </div>

        <!-- View User Stats Page -->
        <div id="userViewStats" class="statsHome-view">
            <?php include 'userStatsPage.php'; ?>
        </div>
    </div>

</div>



















               