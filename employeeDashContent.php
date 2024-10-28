<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee View</title>
    <link rel="stylesheet" href="kanban.css"></link>

</head>

<body>

    <div class="emp-grid-container">

        <div class="emp-grid-item tasks">
            <div class="emp-grid-item-top">
                <p>Daily Tasks</p>
                <a href="#">All tasks</a>
            </div>

            <div class="emp-grid-item-content">
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

        <div class="emp-grid-item forums">
            <div class="emp-grid-item-top">
                <p>Forums</p>
                <a href="#">All posts</a>
            </div>

            <div class="emp-grid-item-content">
                <!--Forum Post-->
                <div class="emp-forum-post">
                    <div class="emp-forum-left">
                        <div class="emp-forum-post-user"><i class="fa-solid fa-user fa-lg"></i></div>
                        <div class="emp-forum-info">
                            <div class="emp-forum-title">Forum Title</div>
                            <div class="emp-forum-date">30th October</div>
                        </div>  
                    </div>

                    <div class="emp-forum-right">   
                        <div class="emp-forum-tag">Tag</div>
                        <div class="emp-forum-tag">Tag</div>
                        <a href="#">View Post</a>
                    </div>
                </div>

                <!--Forum Post-->
                <div class="emp-forum-post">
                    <div class="emp-forum-left">
                        <div class="emp-forum-post-user"><i class="fa-solid fa-user fa-lg"></i></div>
                        <div class="emp-forum-info">
                            <div class="emp-forum-title">Forum Title</div>
                            <div class="emp-forum-date">30th October</div>
                        </div>  
                    </div>

                    <div class="emp-forum-right">   
                        <div class="emp-forum-tag">Tag</div>
                        <div class="emp-forum-tag">Tag</div>
                        <a href="#">View Post</a>
                    </div>
                </div>

                <!--Forum Post-->
                <div class="emp-forum-post">
                    <div class="emp-forum-left">
                        <div class="emp-forum-post-user"><i class="fa-solid fa-user fa-lg"></i></div>
                        <div class="emp-forum-info">
                            <div class="emp-forum-title">Forum Title</div>
                            <div class="emp-forum-date">30th October</div>
                        </div>  
                    </div>

                    <div class="emp-forum-right">   
                        <div class="emp-forum-tag">Tag</div>
                        <div class="emp-forum-tag">Tag</div>
                        <a href="#">View Post</a>
                    </div>
                </div>

                <!--Forum Post-->
                <div class="emp-forum-post">
                    <div class="emp-forum-left">
                        <div class="emp-forum-post-user"><i class="fa-solid fa-user fa-lg"></i></div>
                        <div class="emp-forum-info">
                            <div class="emp-forum-title">Forum Title</div>
                            <div class="emp-forum-date">30th October</div>
                        </div>  
                    </div>

                    <div class="emp-forum-right">   
                        <div class="emp-forum-tag">Tag</div>
                        <div class="emp-forum-tag">Tag</div>
                        <a href="#">View Post</a>
                    </div>
                </div>

                <div class="emp-forum-buttons">
                    <a href="#">View all posts</a>
                    <a href="#">Create a post</a>
                </div>
            </div>  

        </div>

        <div class="emp-grid-item projects">
            <div class="emp-grid-item-top">
                <p>Projects</p>
                <a href="#">All projects</a>
            </div>

            <div class="emp-grid-item-content">

            </div>
        </div>

        <div class="emp-grid-item extra">
            <div class="emp-grid-item-top">
                <p>Extra</p>
            </div>
        </div>
    </div>

<style>
  /* Grid container */
  .emp-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
    gap: 10px;                         
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  /* Grid items */
  .tasks {
    grid-row: 1 / 3;                   
    grid-column: 1 / 2;      
  }
  .forums {
    grid-row: 1 / 2;                   
    grid-column: 2 / 4;                
  }
  .projects {
    grid-row: 2 / 3;                 
    grid-column: 2 / 3;              
  }
  .extra {
    grid-row: 2 / 3;              
    grid-column: 3 / 4;            
  }

  .emp-grid-item {
    padding: 20px;
    text-align: center;
    font-size: 1.2em;
    color: #333;
    background-color: white;
    border-radius: 30px;
  }

  /*Inner stylings*/
  .emp-grid-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.4rem 1.2rem;
  }

  .emp-grid-item-top p {
    font-weight: bold;
  }

  .emp-grid-item-top a {
    padding: 0.8rem 0.8rem;
    border: 2px solid #F5F5F5;
    font-size: 0.7rem;
    font-weight: 600;
    color: black;
    border-radius: 30px;
    white-space: nowrap;
  }

    /*Kanban Cards*/
  .emp-grid-item-content .kanban-card {
    background-color: #F5F5F5;
  }


 /*Forum Posts*/
  .emp-forum-post {
    width: 100%;
    background-color: #F5F5F5;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }

  .emp-forum-left, .emp-forum-right {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
  }

  .emp-forum-left .emp-forum-post-user {
    background-color: white;
    padding: 0.6rem 0.6rem;
    border-radius: 50%;
    border: 1px solid black;
    margin-right: 10px;
  }

  .emp-forum-title {
    font-size: 16px;
  }

  .emp-forum-date {
    font-size: 14px;
    color: #353535;
  }

  .emp-forum-right .emp-forum-tag {
    font-size: 12px;
    background-color: white;
    padding: 0.2rem 0.8rem;
    border-radius: 50px;
    margin-left: 6px;
  }

  .emp-forum-right a {
    font-size: 14px;
    background-color: black;
    color: white;
    padding: 0.8rem 0.6rem;
    border-radius: 30px;
    margin-left: 6px;
  }

  .emp-forum-buttons {
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin-top: 20px;
  }

  .emp-forum-buttons a {
    width: 50%;
    padding: 0.6rem 1.2rem;
    border-radius: 10.5px;
  }

  .emp-forum-buttons a:nth-of-type(1) {
    background-color: black;
    color: white;
  }

  .emp-forum-buttons a:nth-of-type(2) {
    background-color: #F5F5F5;
    color: black;
  }


</style>


</body>
</html>


