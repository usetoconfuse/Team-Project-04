<!-- Created by Quinn Little 03/02/25 -->
<!-- Updated by Toby Tischler 09/02/2025 -->
<!-- Updated by Quinn Little 14/02/2025 -->

<!-- Tabs -->
<div id="mgrStatsAll">

    <!-- Header -->
    <div class="mgrStats-header-section">
        <p id="stats-title" class="mgrStats-title">Statistics</p>
        <div id="mgrStats-tabBtn">
            <button class="mgrStats-activeTab" id="mgrProjStats" onclick="switchTab('projects')">Project</button>
            <button id="mgrUserStats" onclick="switchTab('users')">User</button>
        </div>
    </div>


    <!-- Tab for Project Statistics -->
    <div id='tabGroupProjectStats' class="tabGroup">
        <!-- Project List Page -->
        <div id="statsHomeGridProject" class="statsHome-grid">
            <div id="statsHomeFiltersProj">
                <p class="instruction-txt">Click a project for details</p>

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
            <p class="instruction-txt">Click a user for details</p>
            <div id="statsHomeFiltersUser">
                <div class="stats-listing-search userStats-search"> <!-- Filters here -->
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search user" class="stats-search-colour " id="searched-user">
                </div>
                <!-- ORDER BY DROPDOWN -->
                <div id="userStatsHome-filterAll">

                    <!-- modal -->
                    <!-- FILTER -->
                    <!--Filter Posts -->
                    <div id="filter-modal" class="modal">
                        <div class="modal-box">
                            <!--Header-->
                            <div class="modal-header">
                                <p>Filter Users</p>
                                <div class="close-modal-btn">
                                    <i class="fa-solid fa-x"></i>
                                </div>
                            </div>
                            <!--Body-->
                            <form id="filter-modal-form" class="modal-body">
                                <div class="task-dropdowns-form" id="post-dropdowns-form">


                                    <!--DropDown 1-->
                                    <div class="task-dropdown task-dropdown-priority">
                                        <label for="priority">Completed</label>
                                        <div class="task-dropdown-select-options">
                                            <div class="task-dropdown-priority-icon task-dropdown-icon">
                                                <i class="fa fa-solid fa-star"></i>
                                            </div>
                                            <select name="priority" id="priority">
                                                <option value="All" selected>Show All</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--DropDown 2-->
                                    <div class="task-dropdown task-dropdown-date">
                                        <label for="date">Overdue</label>
                                        <div class="task-dropdown-select-options">
                                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                                <i class="fa fa-solid fa-calendar-days"></i>
                                            </div>
                                            <select name="date" id="date-task">
                                                <option value="All" selected>Show All</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <!--DropDown 3-->
                                    <div class="task-dropdown task-dropdown-stuck">
                                        <label for="date">Show Stuck</label>
                                        <div class="task-dropdown-select-options">
                                            <div class="task-dropdown-stuck-icon task-dropdown-icon">
                                                <i class="fa fa-solid fa-exclamation"></i>
                                            </div>
                                            <select name="stuck" id="stuck-task">
                                                <option value="All" selected>Show All</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            <div class="task-submit-buttons">
                                <a class="add-filter-btn" id="add-filter-btn">
                                    Filter Tasks
                                    <i class="fa fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- FILTERS -->
                    <div class="projects-intro-buttons">
                        <div class="order-by-dropdown">
                            <select>
                                <option value="None" selected>User ID</option>
                                <option value="MostOverdue">Most Overdue Tasks</option>
                                <option value="MostCompleted">Most Completed Tasks</option>
                                <option value="MostStuck">Most Stuck Tasks</option>
                            </select>
                            <a href="#" class="order-by-confirm black-btn">Order By</a>
                        </div>

                        <!-- FILTER BTNS -->
                        <div class="filter-task-btn black-btn">Filter
                            <i class="fa fa-solid fa-sliders"></i>
                        </div>



                    </div>
                </div>
            </div>
            <div class="filter-applied-container">
                <p class="filter-applied-msg"></p>
                <div class="remove-filters-btn">
                    <i class='fa fa-solid fa-x'></i>
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