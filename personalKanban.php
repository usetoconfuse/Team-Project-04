<!--Project Information-->
<section class="project-intro personal-kanban-intro">
    <div class="project-txt">
        <p>Personal To Do</p>
        <p>Add your personal to do list items here.</p>
    </div>

 

    <div class="projects-intro-buttons">
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
                    <i></i>
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
                    <i></i>
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
                    <i></i>
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
                    <i></i>
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

