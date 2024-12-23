<link rel="stylesheet" href="statisticsContent.css">

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


    <div class="statOutput stat-grid-item">
        <p style="text-align: center;">Graph Here</p>
</div>