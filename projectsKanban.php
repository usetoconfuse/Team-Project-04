
<div id="kanban-content" data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <!--Project Information-->
    <section class="project-intro">
        <div class="project-txt">
            <p>Project Name</p>
            <p>View all your tasks below for Project Name.</p>
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
            <div class="filter-task-btn black-btn">
                <i class="fa fa-solid fa-sliders"></i>
            </div>
    
            <?php if (isset($_SESSION['role']) && ($_SESSION['role'] === 'manager' || $_SESSION['role'] === 'leader')): ?>
                <div class="add-task-btn black-btn">
                    <i class="fa fa-solid fa-plus"></i>
                    Add Task
                </div>
            <?php endif; ?>
            <div class="all-projects-btn black-btn">
                <i class='fa fa-solid fa-arrow-left'></i>
                All Projects
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
            <div class="kanban-body open" id = 'kanban-to-do'>

                <!--Kanban Card 1-->
                <div class="kanban-card" id="kanban-task-overdue" draggable=true>
                    <div class="kanban-card-top">
                        <p>Task Title</p>
                        <div class="kanban-card-priority high-priority"></div>
                        <i class="fa fa-solid fa-caret-down"></i>
                    </div>
                    <div class="kanban-card-body">
                        <p class="kanban-card-description">This is the task you have been set. 
                                                        You have to develop a kanban board. This is the task you have been set. 
                                                        You have to develop a kanban board. This is the task you have been set. 
                                                        You have to develop a kanban board. This is the task you have been set. 
                                                        You have to develop a kanban board.</p>
                        
                        <div class="kanban-separator"></div>

                        <div class="kanban-card-bottom">
                            <a href="">View Task</a>
                            <div class="due-date">
                                <i class="fa fa-regular fa-calendar"></i>
                                <p>21 Oct</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Kanban Card 2-->
                <div class="kanban-card" id="kanban-task-overdue" draggable=true>
                    <div class="kanban-card-top">
                        <p>Task Title</p>
                        <div class="kanban-card-priority none-priority" ></div>
                        <i class="fa fa-solid fa-caret-down"></i>
                    </div>
                    <div class="kanban-card-body">
                        <p class="kanban-card-description">This is the task you have been set. 
                                                        You have to develop a kanban board.</p>
                        
                        <div class="kanban-separator"></div>

                        <div class="kanban-card-bottom">
                            <a href="">View Task</a>
                            <div class="due-date">
                                <i class="fa fa-regular fa-calendar"></i>
                                <p>21 Oct</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Kanban Card 3-->
                <div class="kanban-card" draggable=true>
                    <div class="kanban-card-top">
                        <p>Task Title</p>
                        <div class="kanban-card-priority medium-priority"></div>
                        <i class="fa fa-solid fa-caret-down"></i>
                    </div>
                    <div class="kanban-card-body">
                        <p class="kanban-card-description">This is the task you have been set. 
                                                        You have to develop a kanban board.</p>
                        
                        <div class="kanban-separator"></div>

                        <div class="kanban-card-bottom">
                            <a href="">View Task</a>
                            <div class="due-date">
                                <i class="fa fa-regular fa-calendar"></i>
                                <p>8 Nov</p>
                            </div>
                        </div>
                    </div>
                </div>

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
            <div class="kanban-body" id = 'kanban-in-progress'>
                 <!--Kanban Card 5-->
                 <div class="kanban-card" draggable=true>
                    <div class="kanban-card-top">
                        <p>Task Title</p>
                        <div class="kanban-card-priority low-priority"></div>
                        <i class="fa fa-solid fa-caret-down"></i>
                    </div>
                    <div class="kanban-card-body">
                        <p class="kanban-card-description">This is the task you have been set. 
                                                        You have to develop a kanban board. </p>
                        
                        <div class="kanban-separator"></div>

                        <div class="kanban-card-bottom">
                            <a href="">View Task</a>
                            <div class="due-date">
                                <i class="fa fa-regular fa-calendar"></i>
                                <p>6 Nov</p>
                            </div>
                        </div>
                    </div>
                </div>

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
            <div class="kanban-body" id = 'kanban-completed'>

                <!--Kanban Card 5-->
                <div class="kanban-card" draggable=true>
                    <div class="kanban-card-top">
                        <p>Task Title</p>
                        <div class="kanban-card-priority high-priority" ></div>
                        <i class="fa fa-solid fa-caret-down"></i>
                    </div>
                    <div class="kanban-card-body">
                        <p class="kanban-card-description">This is the task you have been set. 
                                                        You have to develop a kanban board. </p>
                        
                        <div class="kanban-separator"></div>

                        <div class="kanban-card-bottom">
                            <a href="">View Task</a>
                            <div class="due-date">
                                <i class="fa fa-regular fa-calendar"></i>
                                <p>6 Nov</p>
                            </div>
                        </div>
                    </div>
                </div>
                
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
                    <!--DropDown 1 - Mgr View-->
                    <?php if (isset($_SESSION['role']) && ($_SESSION['role'] === 'manager' || $_SESSION['role'] === 'leader')): ?>
                    <div class="task-dropdown task-dropdown-technical">
                        <label for="user-filter">User</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-technical-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-user"></i>
                            </div>
                            <select name="user-filter" id="user-filter">
                                <option value="" selected disabled hidden>Choose</option>
                                <option value="jlittle">John Little</option>
                                <option value="qlittle">Quinn Little</option>
                                <option value="jganatra">Jeevan Ganatra</option>
                                <option value="Dan Novetsky">Dan Novetsky</option>
                                <option value="Zoran">Zoran</option>
                            </select>
                        </div>  
                    </div>

                    <!--DropDown 1 - Emp View-->
                    <?php elseif (isset($_SESSION['role']) && $_SESSION['role'] === 'employee'): ?>
                    <div class="task-dropdown task-dropdown-technical">
                        <label for="user-filter">User</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-technical-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-user"></i>
                            </div>
                            <select name="user-filter" id="user-filter">
                                <option value="" selected disabled hidden>Choose</option>
                                <option value="me">Me</option>
                                <option value="all-tasks">All Tasks</option>
                            </select>
                        </div>  
                    </div>
                    <?php endif; ?>
                    <!--DropDown 2-->
                    <div class="task-dropdown task-dropdown-priority">
                        <label for="priority">Priority</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-priority-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-star"></i>
                            </div>
                            <select name="priority" id="priority">
                                <option value="all">All</option>
                                <option value="none">None</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>  
                    </div>
                    <!--DropDown 3-->
                    <div class="task-dropdown task-dropdown-date">
                        <label for="date">Due Date</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-calendar-days"></i>
                            </div>
                            <select name="date" id="date">
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="this-week">This Week</option>
                                <option value="next-week">Next Week</option>
                                <option value="later">Later</option>
                            </select>
                        </div>  
                    </div>

                </div>
            </form>
            <div class="task-submit-buttons">
                <div class="add-filter-btn" id="add-filter-btn">
                    Filter Tasks
                    <i class="fa fa-arrow-right"></i>
                </div>
            </div>
        </div>
    </div>
</div>






