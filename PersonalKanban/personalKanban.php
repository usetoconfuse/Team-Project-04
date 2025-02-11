<div id="personal-kanban-content" class="kanban-content" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>" data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
    <!--Project Information-->
    <section class="project-intro personal-kanban-intro">
        <div class="project-txt">
            <p>Personal To Do</p>
            <p>Add your personal to do list items here.</p>
        </div>

        <div class="projects-intro-buttons">
            <div class="add-task-btn black-btn">
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
                
            </div>

        </div>
    </section>
</div>


<script src="PersonalKanban/personalKanban.js"></script>