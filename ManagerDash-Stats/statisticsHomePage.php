<!-- Updated by Quinn Little 03/02/24 -->
<!-- Updated by Quinn Little 07/02/2025 -->
<!-- Renamed by Quinn Little 07/02/2025 -->

<!-- Tabs -->
 <div id="mgrStatsAll">


    <div class="mgrStats-header-section">
        <h1 class="mgrStats-title">Statistics</h1>
        <div class="mgrStats-post-type-btns">
            <button class="mgrStats-active" id="mgrProjStats" value="mgrProjStats">Project</button>
            <button id="mgrUserStats" value="mgrUserStats">User</button>
   
        </div>
    </div>



<!-- Tab for Project Statistics -->
<div id='tabGroupProjectStats'>
    
    <table class="statsHome-table">
    <thead>
        <tr>
        <th>Project ID</th>
        <th>Project Name</th>
        <th>Header 3</th>
        <th>Header 4</th>
        <th>Header 5</th>
        </tr>
    </thead>
    <tbody>
        <tr onclick="redirectToPage('ManagerDash-Stats/projectStatsPage.php')">
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
        <td>Row 1, Cell 3</td>
        <td>Row 1, Cell 4</td>
        <td>Row 1, Cell 5</td>
        </tr>
        <tr onclick="redirectToPage('ManagerDash-Stats/projectStatsPage.php')">
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
        <td>Row 2, Cell 3</td>
        <td>Row 2, Cell 4</td>
        <td>Row 2, Cell 5</td>
        </tr>
        <!-- Continue adding rows up to Row 20 -->
        <tr onclick="redirectToPage('ManagerDash-Stats/projectStatsPage.php')">
        <td>Row 20, Cell 1</td>
        <td>Row 20, Cell 2</td>
        <td>Row 20, Cell 3</td>
        <td>Row 20, Cell 4</td>
        <td>Row 20, Cell 5</td>
    </tbody>
    </table>


</div>

<div id='tabGroupUserStats'>

<table id='userStatsHomeTbl' class="statsHome-table"> <!--Fetch Data Here-->
</table>

</div>

























               