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


    <section class="emp-dash-bottom">
        <section class="emp-projectKanban-container emp-item-container" id="emp-projectKanban-container">
            <div class="emp-item-top">
                <p>All Tasks</p>
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