<!--Project Information-->
<section class="project-intro personal-kanban-intro">
    <div class="project-txt">
        <p>Personal To Do</p>
        <p>Add your personal to do list items here.</p>
    </div>

 

    <div class="projects-intro-buttons">
        <div class="filter-task-btn">
            <i class="fa fa-solid fa-sliders"></i>
        </div>
        <div class="add-task-btn">
            <i class="fa fa-solid fa-plus"></i>
            Add Task
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
                    <i class="fa-solid fa-circle-exclamation"></i>
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
            <!--Kanban Card 2-->
            <div class="kanban-card" id="kanban-task-overdue" draggable=true>
                <div class="kanban-card-top">
                    <p>Task Title</p>
                    <i class="fa-solid fa-circle-exclamation"></i>
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
                    <i class="fa-solid fa-circle-exclamation"></i>
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
            <!--Kanban Card 1-->
            <div class="kanban-card" draggable=true>
                <div class="kanban-card-top">
                    <p>Task Title</p>
                    <i class="fa-solid fa-circle-check"></i>
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
                            <p>6 Nov</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</section>

<!--View Task Modal-->





<!--Add task modal-->
<div class="kanban-modal add-task-modal" >
    <div class="kanban-modal-box">
        <!--Header-->
        <div class="kanban-modal-header">
            <p>Add Task</p>
            <div class="kanban-close-modal-btn">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
        <!--Body-->
        <form>
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
                            <option value="no priority">No Priority</option>
                            <option value="low priority">Low Priority</option>
                            <option value="medium priority">Medium Priority</option>
                            <option value="high priority">High Priority</option>
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
                        <input type="date" name="date" id="date">
                    </div>  
                </div>
            </div>
            <!--Add Attachments-->
            <div class="task-upload-form">
                <label for="task-upload">Upload Attachments</label>
                <input type="file" id="upload" name="upload" multiple>
            </div>
        </form>
    </div>
</div>
