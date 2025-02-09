<!-- Updated by Quinn Little 03/02/25 -->
<!-- Updated by Quinn Little 07/02/2025 -->
<!-- Renamed by Quinn Little 07/02/2025 -->
<!-- Updated by Toby Tischler 08/02/2025 -->
 <!-- Updated by Quinn Little 08/02/2025 -->

<!-- Tabs -->
<div id="mgrStatsAll">

    <!-- Header -->
    <div class="mgrStats-header-section">
        <h1 class="mgrStats-title">Statistics</h1>
        <div class="mgrStats-post-type-btns">
            <button class="mgrStats-activeTab" id="mgrProjStats" value="tabGroupProjectStats">Project</button>
            <button id="mgrUserStats" value="tabGroupUserStats">User</button>
        </div>
    </div>



<!-- Tab for Project Statistics -->
<div id='tabGroupProjectStats'>

    <table id='projectStatsHomeTbl' class="statsHome-table"> <!--Fetch Project Data Here-->
    </table>

        <div id="projectViewStats" class="statsHome-view">
            <?php include 'projectStatsPage.php'; ?>
        </div>

    </div>


<!-- Tab for User Statistics -->
<div id='tabGroupUserStats'>

<table id='userStatsHomeTbl' class="statsHome-table"> <!--Fetch User Data Here-->
</table>

        <div id="userViewStats" class="statsHome-view">
            <?php include 'userStatsPage.php'; ?>
        </div>

    </div>

</div>



















               