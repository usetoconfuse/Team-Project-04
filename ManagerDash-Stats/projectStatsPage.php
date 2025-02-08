<!-- Created By Quinn Little 07/02/2025 -->
<!-- Updated By Toby Tischler 08/02/2025 -->

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


<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
<script src="ManagerDash-Stats/projectStatsPage.js"></script>