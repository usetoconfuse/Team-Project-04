<!-- Updated by F328049 03/02/24 -->
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
    <h1>Project Statistics</h1>
    <div id="statGrid">
        <!-- Filter 1 -->
        <div class="statFilter1 stat-grid-item ">
            <h1>Select Project</h1>
            <form>
                <select id="statProjectSelect" name="statProjSel">
                    <option value="ProjectA">Project A</option>
                </select>
            </form>
        </div>

        <!-- Filter 2 -->
        <div class="statFilter2 stat-grid-item ">
            <h1>Select Employee</h1>
            <form>
                <select id="statEmpSelect" name="statEmpSel">
                    <option value="ProjectA">John Little</option>
                </select>
            </form>
        </div>

        <!-- Filter 3 -->
        <div class="statFilter3 stat-grid-item ">
            <h1>Select statistic objective</h1>
            <form>
                <select id="statObjSelect" name="statObjSel">
                    <option value="ProjectA">Sum</option>
                </select>

                <br>
                <br>
                <input type="submit" value="apply filters">
            </form>
        </div>

        <div id="dataContainer">
            <p>Click the "Fetch Test" button</p>
        </div> <!--Data from fetch goes here-->

        <button id='fetchDataTest'>Fetch Test</button> <!--Fetches data-->


        <div class="statOutput stat-grid-item">
            <canvas id="myChart" width="400" height="200" style="text-align: center;"></canvas>

        </div>
    </div>
</div>




<!-- Tab for User Statistics -->
<div id='tabGroupUserStats'>
    <h1>User Statistics</h1>
    <div id="statGrid">

    </div>
</div>

</div>


