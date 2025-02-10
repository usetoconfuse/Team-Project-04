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
                    <div style="background-color:rgb(0, 0, 0);" class="emp-stat-circle"></div> <!--Circle-->
                    <p class="emp-stat-txt">??</p>
                    <div class="emp-stat-nums">??</div>
                    <div style="background-color:rgb(0, 0, 0);" class="emp-stat-line"></div>
                </div>
            </div>
        </section>


        <!--Personal Board Clip-->
        <section class="emp-kanban-container emp-item-container">
            <div class="emp-item-top">
                <p>Personal Tasks</p>
                <a href="employeeDashboard.php?page=personal" class="white-btn">All tasks</a>
            </div>
        </section>




    </section>

       

</div>