<div id="project-content" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>"
    data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <div class="project-intro">
        <div class="project-txt">
            <p>All Projects</p>
            <p>View all your assigned projects below. Statistics about these are within.</p>
        </div>
        <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'Admin'): ?>
            <div class="project-switch-buttons">
                <a href="#" id="active-project" class="project-item active">Active</a>
                <a href="#" id="not-started-project" class="project-item ">Not Started</a>
                <a href="#" id="archive-project" class="project-item ">Archive</a>
                <a href="#" id="completed-project" class="project-item ">Completed</a>
            </div>
        <?php endif; ?>
    </div>



    <section class="project-item-content open" id="active-project-content" data-status="Active">

        <div class="project-filter-container">
            <div class="project-search">
                <i class="fa fa-solid fa-search"></i>
                <input type="text" placeholder="Search Projects" id="searched-project">
            </div>

            <div class="project-buttons-container">
               <!-- <div class="filter-project-btn black-btn"> Filter
                    <i class="fa fa-solid fa-sliders"></i>
                </div>-->
                <?php if (isset($_SESSION['role']) && $_SESSION['role'] === 'Admin'): ?>
                    <div class="add-task-btn black-btn" id="add-task-proj-btn">
                        <i class="fa fa-solid fa-plus"></i>
                        Add Task
                    </div>
                    <a href="#" class="add-project black-btn">Add Project</a>

                <?php endif; ?>
            </div>
        </div>

        <p class="search-error-msg">No Projects Found</p>
        <div class="grid-container" id="gridContainer">
            <!-- Project Cards dynamically generated-->

        </div>
    </section>


    <section class="project-item-content" id="not-started-project-content" data-status="Not Started">
        <div class="project-filter-container">
            <div class="project-search">
                <i class="fa fa-solid fa-search"></i>
                <input type="text" placeholder="Search Projects" id="searched-project">
            </div>
        </div>

        <p class="search-error-msg">No Projects Found</p>
        <div class="grid-container" id="gridContainer">
            <!-- Project Cards dynamically generated-->

        </div>
    </section>

    <section class="project-item-content" id="archive-project-content" data-status="Archived">
        <div class="project-filter-container">
            <div class="project-search">
                <i class="fa fa-solid fa-search"></i>
                <input type="text" placeholder="Search Projects" id="searched-project">
            </div>
        </div>
        <p class="search-error-msg">No Projects Found</p>
        <div class="grid-container" id="gridContainer">
            <!-- Project Cards dynamically generated-->

        </div>
    </section>

    <section class="project-item-content" id="completed-project-content" data-status="Completed">
        <div class="project-filter-container">
            <div class="project-search">
                <i class="fa fa-solid fa-search"></i>
                <input type="text" placeholder="Search Projects" id="searched-project">
            </div>
        </div>
        <p class="search-error-msg">No Projects Found</p>
        <div class="grid-container" id="gridContainer">
            <!-- Project Cards dynamically generated-->

        </div>
    </section>




    <!--Filter Projects -->
    <div id="project-filter-modal" class="modal">
        <div class="modal-box">
            <!--Header-->
            <div class="modal-header">
                <p>Filter Projects</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <!--Body-->
            <form id="filter-modal-form" class="modal-body">
                <div class="task-dropdowns-form" id="post-dropdowns-form">


                    <!--DropDown 1--><!--
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
                    </div>-->
                    <!--DropDown 2-->
                    <div class="task-dropdown task-dropdown-date">
                        <label for="date">Due Date Before</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-calendar-days"></i>
                            </div>
                            <input name="date" id="date-task" type="date"></input>
                        </div>
                    </div>

                </div>
            </form>
            <div class="task-submit-buttons">
                <a class="add-filter-btn" id="add-filter-btn">
                    Filter Projects
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>



    <!--Add Project -->
    <div id="projects-modal" class="modal">
        <div class="modal-box">
            <!--Header-->
            <div class="modal-header">
                <p>Add Project</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <!--Body-->

            <form id="project-modal-form" class="modal-body">
                <!--Title and Description-->
                <div class="task-title-form">
                    <label for="task-title">Title</label>
                    <input type="text" id="task-title" name="task-title">
                </div>
                <!--<div class="task-description-form">
                    <label for="task-description">Description</label>
                    <textarea type="text" id="task-description" name="task-description"></textarea>
                </div>-->
                <div class="task-dropdowns-form" id="project-dropdowns-form">
                    <!--DropDown Leader-->
                    <div class="task-dropdown task-dropdown-leader">
                        <label for="team-leader">Team Leader</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-user-icon task-dropdown-icon">
                                <i class="fa fa-solid fa-user"></i>
                            </div>
                            <input autocomplete="off" list="team-leader" placeholder="Enter Name"
                                id="team-leader-dropdown">
                            <datalist name="team-leader" id="team-leader">

                            </datalist>
                        </div>
                    </div>

                    <!--Choose Start Date-->
                    <div class="task-dropdown task-dropdown-start-date">
                        <label for="date">Start Date</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-regular fa-calendar"></i>
                            </div>
                            <input type="date" name="date" id="start-date-project">
                        </div>
                    </div>

                    <!--Choose Due Date-->
                    <div class="task-dropdown task-dropdown-due-date">
                        <label for="date">Due Date</label>
                        <div class="task-dropdown-select-options">
                            <div class="task-dropdown-date-icon task-dropdown-icon">
                                <i class="fa fa-regular fa-calendar"></i>
                            </div>
                            <input type="date" name="date" id="date-project">
                        </div>
                    </div>
                </div>
            </form>
            <div class="task-submit-buttons">
                <div class="add-project-btn" id="add-project-btn">
                    Create Project
                    <i class="fa fa-arrow-right"></i>
                </div>

                <!-- NEW: Add Task Button (Initially Hidden) -->
                <div class="add-task-btn black-btn" id="add-task-btn" style="display: none;">
                    Add Task
                    <i class="fa fa-solid fa-plus"></i>
                </div>
            </div>
        </div>
    </div>
</div>



<!--Add Project -->
<div id="edit-projects-modal" class="modal" style="display: none;">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">
            <p>Edit Project</p>
            <div class="close-modal-btn">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
        <!--Body-->

        <form id="project-modal-form" class="modal-body">
            <!--Title and Description-->
            <div class="task-title-form">
                <label for="task-title">Title</label>
                <input type="text" id="task-title" name="task-title">
            </div>
            <!--<div class="task-description-form">
                    <label for="task-description">Description</label>
                    <textarea type="text" id="task-description" name="task-description"></textarea>
                </div>-->
            <div class="task-dropdowns-form" id="project-dropdowns-form">
                <!--DropDown Leader-->
                <div class="task-dropdown task-dropdown-leader">
                    <label for="team-leader">Team Leader</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-user-icon task-dropdown-icon">
                            <i class="fa fa-solid fa-user"></i>
                        </div>
                        <input autocomplete="off" list="team-leader" placeholder="Enter Name" id="team-leader-dropdown">
                        <datalist name="team-leader" id="team-leader">

                        </datalist>
                    </div>
                </div>

                <!--Choose Start Date-->
                <div class="task-dropdown task-dropdown-start-date">
                    <label for="date">Start Date</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-date-icon task-dropdown-icon">
                            <i class="fa fa-regular fa-calendar"></i>
                        </div>
                        <input type="date" name="date" id="start-date-project">
                    </div>
                </div>

                <!--Choose Due Date-->
                <div class="task-dropdown task-dropdown-due-date">
                    <label for="date">Due Date</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-date-icon task-dropdown-icon">
                            <i class="fa fa-regular fa-calendar"></i>
                        </div>
                        <input type="date" name="date" id="date-project">
                    </div>
                </div>
            </div>
        </form>
        <div class="task-submit-buttons">
            <a class="edit-project-btn" id="add-project-btn">
                Edit Project
                <i class="fa fa-arrow-right"></i>
            </a>
            <a class="active-project-btn" id="add-project-btn" style="display: none;">
                Active
                <i class="fa fa-arrow-right"></i>
            </a>
            <a class="complete-project-btn" id="add-project-btn" style="display: none;">
                Complete
                <i class="fa fa-arrow-right"></i>
            </a>
            <a class="archive-project-btn" id="add-project-btn" style="display: none;">
                Archive
                <i class="fa fa-arrow-right"></i>
            </a>
            <a class="delete-project-btn" id="add-project-btn">
                Delete
                <i class="fa fa-solid fa-trash"></i>
            </a>
        </div>
    </div>
</div>

</div>


<!--Modal to complete project in admin pane;-->
<div id="complete-project-modal" class="modal">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">

        </div>
        <!--Body-->
        <div class="modal-body">

        </div>
        <div class="task-delete-buttons">
            <a id="complete-project-confirm">
                Complete
            </a>
            <a class="cancel-complete-btn" id="cancel-complete-btn"><i class="fa fa-xmark"></i>
                Cancel
            </a>
        </div>
    </div>
</div>


<!--Modal to archive project in admin pane;-->
<div id="archive-project-modal" class="modal">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">

        </div>
        <!--Body-->
        <div class="modal-body">

        </div>
        <div class="task-delete-buttons">
            <a id="archive-project-confirm">
                Archive
            </a>
            <a class="cancel-archive-btn" id="cancel-archive-btn"><i class="fa fa-xmark"></i>
                Cancel
            </a>
        </div>
    </div>
</div>

<!--Modal to Delete project in admin pane;-->
<div id="delete-project-modal" class="modal">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">

        </div>
        <!--Body-->
        <div class="modal-body">

        </div>
        <div class="task-delete-buttons">
            <a id="delete-project-confirm">
                Delete
            </a>
            <a class="cancel-delete-btn" id="cancel-delete-btn"><i class="fa fa-xmark"></i>
                Cancel
            </a>
        </div>
    </div>
</div>


<!--Modal to Make Active project in admin pane;-->
<div id="active-project-modal" class="modal">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">

        </div>
        <!--Body-->
        <div class="modal-body">

        </div>
        <div class="task-delete-buttons">
            <a id="active-project-confirm">
                Reactivate
            </a>
            <a class="cancel-active-btn" id="cancel-delete-btn"><i class="fa fa-xmark"></i>
                Cancel
            </a>
        </div>
    </div>
</div>

<div class="modal add-task-modal" id="add-task-modal-proj">
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">
            <p>Add Task</p>
            <div class="close-modal-btn">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>

        <div class="task-dropdown task-dropdown-project">
            <label for="project">Project</label>
            <div class="task-dropdown-select-options">
                <div class="task-dropdown-project-icon task-dropdown-icon">
                    <i class="fa fa-solid fa-folder"></i>
                </div>
                <input autocomplete="off" list="task-project" placeholder="Enter Project" id="task-project-dropdown">
                <datalist name="task-project" id="task-project">
                    <option value="1">Project 1</option>
                </datalist>
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
                        <input autocomplete="off" list="task-user" placeholder="Enter Name" id="task-user-dropdown">
                        <datalist name="task-user" id="task-user">
                            <option value=41>John Little</option>
                            <option value=41>Sandra Larkin</option>
                            <option value=41>Nick Cage</option>
                            <option value=41>Sally Smith</option>
                        </datalist>
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


            <!--Extra Buttons for inputting man hours and startdate-->
            <div class="extra-buttons" id="extra-buttons">
                <div class="task-dropdown task-dropdown-start-date">
                    <label for="start-date">Start Date</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-date-icon task-dropdown-icon">
                            <i class="fa fa-regular fa-calendar"></i>
                        </div>
                        <input type="date" name="start-date" id="start-date-input">
                    </div>
                </div>


                <div class="task-dropdown task-dropdown-man-hours">
                    <label for="man-hours">Man Hours</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-man-hours-icon task-dropdown-icon">
                            <i class="fa fa-solid fa-clock"></i>
                        </div>
                        <input type="number" name="man-hours" id="man-hours-input" min="1" step="1">
                    </div>
                </div>
            </div>



            <div class="error-message" id="error-adding-message" style="color: red; display: none;">
                <p>Error: Something went wrong. Please try again.</p>
            </div>


        </form>
        <div class="task-submit-buttons">
            <div class="add-task-btn">
                Add Task
                <i class=" fa fa-arrow-right"></i>
            </div>
        </div>
    </div>
</div>