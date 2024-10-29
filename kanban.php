<!--Project Information-->
<div class="project-intro">
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

    <div class="all-projects-btn">
        <i class='fa fa-solid fa-arrow-left'></i>
        All Projects
    </div>

    <div class="kanban-separator"></div>
</div>

<!--Kanban Board-->
<div class="kanban-board">

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
                            <p>21 Oct</p>
                        </div>
                    </div>
                </div>
            </div>
            <!--Kanban Card 2-->
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
                            <p>21 Oct</p>
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
                            <p>21 Oct</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</div>
