<div id="emp-dash-content" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>"
    data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <div class="dash-intro">
        <div class="dash-txt">
            <p>Good Morning, <?= $_SESSION['user_forename']; ?></p>
        </div>
    </div>


    <section class="emp-dash-top">
        <!--Emp Stats-->
        <section class="empdash-stats-container emp-item-container">
            <div class="emp-item-top">
                <p>Your Statistics</p>
                <a href="employeeView.php?page=projects" class="black-btn">All Projects</a>
            </div>
            <div class="emp-grid-stat-content">
                <div class="emp-stat" id="emp-stat-to-do">
                    <div style="background-color: #E6757E;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">To Do</p>
                    <div class="emp-stat-nums"></div>
                    <div style="background-color: #E6757E;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat" id="emp-stat-in-progress">
                    <div style="background-color: #EAB385;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">In Progress</p>
                    <div class="emp-stat-nums"></div>
                    <div style="background-color: #EAB385;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat" id="emp-stat-completed">
                    <div style="background-color: #ADDA9D;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">Completed</p>
                    <div class="emp-stat-nums"></div>
                    <div style="background-color: #ADDA9D;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat" id="emp-stat-overdue">
                    <div style="background-color:#E6757E;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">Overdue</p>
                    <div class="emp-stat-nums"></div>
                    <div style="background-color:#E6757E;" class="emp-stat-line"></div>
                </div>
            </div>
        </section>


        <!--Personal Board Clip-->
        <section class="emp-kanban-container emp-item-container" id="emp-personalkanban-container">
            <div class="emp-item-top">
                <p>Personal Tasks</p>
                <a href="employeeView.php?page=personal" class="black-btn">All Tasks</a>
            </div>
            <div class="emp-kanban-bottom">

            </div>
        </section>
    </section>

    <!--Filter Posts -->
    <div id="filter-modal" class="modal">
        <div class="modal-box">
            <!--Header-->
            <div class="modal-header">
                <p>Filter Tasks</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <!--Body-->
            <form id="filter-modal-form" class="modal-body">
                <div class="task-dropdowns-form" id="post-dropdowns-form">


                    <!--DropDown 1-->
                    <div class="task-dropdown task-dropdown-priority">
                        <label for="priority">Priority</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-priority-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-star"></i>
                            </div>
                            <select name="priority" id="priority">
                                <option value="All" selected>Show All</option>

                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <!--DropDown 2-->
                    <div class="task-dropdown task-dropdown-date">
                        <label for="date">Due Date</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-calendar-days"></i>
                            </div>
                            <select name="date" id="date-task">
                                <option value="All" selected>Show All</option>
                                <option value="Today">Today</option>
                                <option value="Tomorrow">Tomorrow</option>
                                <option value="This Week">This Week</option>
                                <option value="Next Week">Next Week</option>
                                <option value="Later">Later</option>
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

    <section class="emp-dash-bottom">
        <section class="emp-projectKanban-container emp-item-container" id="emp-projectKanban-container">
            <div class="emp-item-top">
                <p>All Tasks</p>
                <div class="projects-intro-buttons">
                    <div class="order-by-dropdown">
                        <select>
                            <option value="None" selected>None</option>
                            <option value="Priority High to Low">Priority High to Low</option>
                            <option value="Priority Low to High">Priority Low to High</option>
                            <option value="Due First">Due First</option>
                            <option value="Due Last">Due Last</option>
                            <option value="Most Overdue">Most Overdue</option>
                        </select>
                        <a href="#" class="order-by-confirm black-btn">Order By</a>
                    </div>

                    <div class="filter-task-btn black-btn">Filter
                        <i class="fa fa-solid fa-sliders"></i>
                    </div>
                    <div class="filter-applied-container">
                        <p class="filter-applied-msg"></p>
                        <div class="remove-filters-btn">
                            <i class='fa fa-solid fa-x'></i>
                        </div>
                    </div>
                </div>
                <div class="task-search-container">

                    <p class="search-task-error-msg">No Tasks Found</p>

                    <div class="task-search">
                        <i class="fa fa-solid fa-search"></i>
                        <input type="text" placeholder="Search Tasks" id="searched-task">
                    </div>
                </div>
            </div>

            <div class="emp-projectKanban-bottom">

                <table>
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Task Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Stuck</th>
                            <th>Project ID/Title</th>
                            <th>Assigned By</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>


        </section>
    </section>



</div>


<script src="EmployeeDashboard/employeeDashContent.js"></script>