<div id="kanban-content" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>" data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <!--Project Information-->
    <section class="project-intro">
        <div class="project-txt">
            <p></p>
            <p>View all your tasks below.</p>
        </div>

        <div class="vertical-bar"></div>

        <div class="project-stats">
            <div class="project-progress">
                <div class="progress-bar">
                    <div class="progress-bar-inner"></div>
                </div>

                <div class="progress-txt">
                    <p>Progress</p>
                    <p>75%</p>
                </div>
            </div>

            <div class="project-team">
                <div class="user"><i class="fa fa-solid fa-user"></i></div>
                <div class="user"><i class="fa fa-solid fa-user"></i></div>
                <div class="user"><i class="fa fa-solid fa-user"></i></div>
                <div class="user"><i class="fa fa-solid fa-user"></i></div>
                <div class="user">+3</div>
            </div>
        </div>


        <div class="vertical-bar"></div>

        <div class="projects-intro-buttons">
            <div class="filter-task-btn black-btn">Filter
                <i class="fa fa-solid fa-sliders"></i>
            </div>

            <?php if (isset($_SESSION['role']) && ($_SESSION['role'] === 'Admin' || $_SESSION['role'] === 'Team Leader')): ?>
                <div class="add-task-btn black-btn">
                    <i class="fa fa-solid fa-plus"></i>
                    Add Task
                </div>
            <?php endif; ?>
            <div class="all-projects-btn black-btn">
                <i class='fa fa-solid fa-arrow-left'></i>
                Close Project
            </div>
        </div>


        <div class="kanban-separator"></div>
    </section>

    <!--Kanban Board-->
    <section class="kanban-board">

        <!--Kanban Column-->
        <div class="kanban-section">
            <!--Kanban Header-->
            <div class="kanban-header">
                <div class="kanban-header-txt">To Do</div>
                <div class="kanban-header-no">4</div>
                <i class="fa fa-solid fa-caret-up"></i>
            </div>
            <!--Kanban Body-->
            <div class="kanban-body open" id='kanban-to-do'>

               
            </div>
        </div>

        <!--Kanban Column-->
        <div class="kanban-section">
            <!--Kanban Header-->
            <div class="kanban-header">
                <div class="kanban-header-txt">In Progress</div>
                <div class="kanban-header-no">3</div>
                <i class="fa fa-solid fa-caret-down"></i>
            </div>
            <!--Kanban Body-->
            <div class="kanban-body" id='kanban-in-progress'>
               
            </div>
        </div>

        <!--Kanban Column-->
        <div class="kanban-section">
            <!--Kanban Header-->
            <div class="kanban-header">
                <div class="kanban-header-txt">Completed</div>
                <div class="kanban-header-no">2</div>
                <i class="fa fa-solid fa-caret-down"></i>
            </div>
            <!--Kanban Body-->
            <div class="kanban-body" id='kanban-completed'>

            </div>

        </div>
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
                                <option value="All">All</option>
                                <option value="None">None</option>
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
                                <option value="All">All</option>
                                <option value="Today">Today</option>
                                <option value="Tomorrow">Tomorrow</option>
                                <option value="This Week">This Week</option>
                                <option value="Next Week">Next Week</option>
                                <option value="Later">Later</option>
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
</div>