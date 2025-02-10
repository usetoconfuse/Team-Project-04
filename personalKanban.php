<div class="kanban-content" data-role="<?php echo isset($_SESSION['role']) ? $_SESSION['role'] : ''; ?>">
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
            <div class="kanban-body open" class = 'kanban-to-do'>

                <!--Kanban Card 1-->
                <div class="kanban-card" id="kanban-task-overdue" draggable=true>
                        <div class="kanban-card-top">
                            <p>Talk with Bilal about promotion</p>
                            <div class="kanban-card-priority"></div>
                            <i class="fa fa-solid fa-caret-down"></i>
                        </div>
                        <div class="kanban-card-body">
                            <p class="kanban-card-description">Documentation on onboarding is in knowledgebase. He'll become new project leader for Python Project</p>
                            
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
                            <p>Talk with Samantha about moving roles</p>
                            <div class="kanban-card-priority"></div>
                            <i class="fa fa-solid fa-caret-down"></i>
                        </div>
                        <div class="kanban-card-body">
                            <p class="kanban-card-description">She'll move from team leader for Python Project, to lead the marketing team.</p>
                            
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
                            <p>Try out the new login functionality</p>
                            <div class="kanban-card-priority"></div>
                            <i class="fa fa-solid fa-caret-down"></i>
                        </div>
                        <div class="kanban-card-body">
                            <p class="kanban-card-description">Some bugs were reported, need to make sure there aren't more</p>
                            
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
                            <p>Meeting with Boss</p>
                            <div class="kanban-card-priority"></div>
                            <i class="fa fa-solid fa-caret-down"></i>
                        </div>
                        <div class="kanban-card-body">
                            <p class="kanban-card-description">Need to schedule a time today to meet to discuss finances for the new project. </p>
                            
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
                            <p>Get help with writing requirements</p>
                            <div class="kanban-card-priority"></div>
                            <i class="fa fa-solid fa-caret-down"></i>
                        </div>
                        <div class="kanban-card-body">
                            <p class="kanban-card-description">Need confirmation from billy as he was in the stakeholder meeting. </p>
                            
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
</div>
