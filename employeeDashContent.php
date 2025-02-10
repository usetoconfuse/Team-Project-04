<div id="emp-dash-content" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>" data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <div class="dash-intro">
        <div class="dash-txt">
            <p>Good Morning, <?=$_SESSION['user_forename'];?></p>
        </div>
    </div>

    <section class="emp-dash-top">
        <!--Emp Stats-->
        <section class="empdash-stats-container emp-item-container">
            <div class="emp-item-top">
                <p>Your Statistics</p>
                <a href="employeeDashboard.php?page=projects" class="black-btn">All Projects</a>
            </div>
            <div class="emp-grid-stat-content">
                <div class="emp-stat">
                    <div style="background-color: #E6757E;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">To Do</p>
                    <div class="emp-stat-nums">3 Tasks</div>
                    <div style="background-color: #E6757E;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat">
                    <div style="background-color: #EAB385;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">In Progress</p>
                    <div class="emp-stat-nums">5 Tasks</div>
                    <div style="background-color: #EAB385;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat">
                    <div style="background-color: #ADDA9D;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">Completed</p>
                    <div class="emp-stat-nums">17 Tasks</div>
                    <div style="background-color: #ADDA9D;" class="emp-stat-line"></div>
                </div>

                <div class="emp-stat">
                    <div style="background-color:#E6757E;" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">Overdue</p>
                    <div class="emp-stat-nums">4 Tasks</div>
                    <div style="background-color:#E6757E;" class="emp-stat-line"></div>
                </div>
            </div>
        </section>


        <!--Personal Board Clip-->
        <section class="emp-kanban-container emp-item-container">
            <div class="emp-item-top">
                <p>Personal Tasks</p>
                <a href="employeeDashboard.php?page=personal" class="black-btn">All Tasks</a>
            </div>
            <div class="emp-kanban-bottom">

                <div class="emp-task">
                    <div class="emp-task-top">
                        <p>Book Meeting with Jenny</p>
                        <div class="emp-task-priority emp-high-priority">High</div>
                        <!--<div class="emp-task-status emp-to-do">To Do</div>-->
                    </div>
                    <div class="emp-task-line"></div>
                </div>

                <div class="emp-task">
                    <div class="emp-task-top">
                        <p>Reassign John's Tasks</p>
                        <div class="emp-task-priority emp-medium-priority">Medium</div>
                        <!--<div class="emp-task-status emp-in-progress">In Progress</div>-->
                    </div>
                    <div class="emp-task-line"></div>
                </div>

                <div class="emp-task">
                    <div class="emp-task-top">
                        <p>Fire Oliver due to incompetence</p>
                        <div class="emp-task-priority emp-low-priority">Low</div>
                        <!--<div class="emp-task-status emp-in-progress">In Progress</div>-->
                    </div>
                    <div class="emp-task-line"></div>
                </div>


            </div>
        </section>




    </section>

       

</div>