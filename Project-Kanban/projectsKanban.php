<div id="proj-kanban-content" class="kanban-content kanban-content-project"
    data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>"
    data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <!--Project Information-->
          <div class="leader-switch-buttons" style="display: none;">
            <a href="#" id="active-kanban" class="kanban-item active">Kanban Board</a>
            <a href="#" id="active-leader" class="kanban-item ">Leader Dashboard</a>
        </div>
    
    <section class="project-intro">
        <div class="project-txt">
            <p></p>
            <p>View all your tasks below.</p>
        </div>


  

        <!--<div class="vertical-bar"></div>

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


        <div class="vertical-bar"></div>-->

        <div class="projects-intro-buttons" id="proj-project-intro-buttons">
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


            <div class="all-projects-btn black-btn">
                <i class='fa fa-solid fa-arrow-left'></i>
                Close
            </div>
        </div>


        <div class="kanban-separator"></div>
    </section>

    <div class="task-search-container" id="proj-search-container">
        <div class="task-search">
            <i class="fa fa-solid fa-search"></i>
            <input type="text" placeholder="Search Tasks" id="searched-task">
        </div>
        <div>
            <p class="search-task-error-msg">No Tasks Found</p>
        </div>

    </div>
    <div class="filter-applied-container">
        <p class="filter-applied-msg"></p>
        <div class="remove-filters-btn">
            <i class='fa fa-solid fa-x'></i>
        </div>
    </div>



    <!--Kanban Board-->
    <section class="kanban-board kanban-item-content open" id="active-kanban-content">

        <!--Kanban Column-->
        <div class="kanban-section">
            <!--Kanban Header-->
            <div class="kanban-header" id="to-do-header">
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
            <div class="kanban-header" id="in-progress-header">
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
            <div class="kanban-header" id="completed-header">
                <div class="kanban-header-txt">Completed</div>
                <div class="kanban-header-no">2</div>
                <i class="fa fa-solid fa-caret-down"></i>
            </div>
            <!--Kanban Body-->
            <div class="kanban-body" id='kanban-completed'>

            </div>

        </div>
    </section>


     <section class="kanban-item-content" id="active-leader-content">
        <?php include 'Project-Kanban/adminTaskManager.php'?>
    </section>


 
    <!--Report Modal-->
    <div class="modal report-task-modal" style="display: none;">
        <div class="modal-box report-task-modal-box">
            <div class="modal-header">
                <p id="report-modal-header">Report Task</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <div class="modal-body">
                <p id="report-modal-message"></p>
                <div class="task-submit-buttons">
                    <a class="report-task-db black-btn"><i class="fa fa-arrow-right"></i></a>

                </div>
            </div>
        </div>
    </div>

       <!--Filter Posts -->
    <div id="filter-modal" class="modal non-leader-modal">
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




    <div class="modal add-task-modal">
        <div class="modal-box">
            <!--Header-->
            <div class="modal-header">
                <p>Add Task</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <!--Body-->
            <form class="modal-body">
                <!--Title and Description-->
                <div class="task-title-form">
                    <label for="task-title">Title</label>
                    <input type="text" id="task-title" name="task-title">
                </div>
                <div class="task-description-form">
                    <label for="task-description">Description</label>
                    <textarea type="text" id="task-description" name="task-description"></textarea>
                </div>
                <!--Dropdowns-->
                <div class="task-dropdowns-form">
                    <!--Choose User-->
                    <div class="task-dropdown task-dropdown-user">
                        <label for="user">Employee</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-user-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-user"></i>
                            </div>
                            <select name="user" id="user">
                                <option value="" selected disabled hidden>Choose User</option>
                                <option value="jlittle">John Little</option>
                                <option value="slarkin">Sandra Larkin</option>
                                <option value="ncage">Nick Cage</option>
                                <option value="ssmith">Sally Smith</option>
                            </select>
                        </div>
                    </div>
                    <!--Choose Priority-->
                    <div class="task-dropdown task-dropdown-priority">
                        <label for="priority">Priority</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-priority-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-exclamation"></i>
                            </div>
                            <select name="priority" id="priority">
                                <option value="" selected disabled hidden>Choose Priority</option>
                                <option value="Low">Low Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="High">High Priority</option>
                            </select>
                        </div>
                    </div>
                    <!--Choose Due Date-->
                    <div class="task-dropdown task-dropdown-date">
                        <label for="date">Due Date</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-regular fa-calendar"></i>
                            </div>
                            <input type="date" name="date" id="date-input">
                        </div>
                    </div>
                </div>
                <!--Add Attachments-->
                <div class="task-upload-form">
                    <label for="task-upload">Upload Attachments</label>
                    <input type="file" id="upload" name="upload" multiple>
                </div>
            </form>
            <div class="task-submit-buttons">
                <div class="add-task-btn">
                    Add Task
                    <i class="fa fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>



</div>


<script src="Project-Kanban/kanban.js"></script>