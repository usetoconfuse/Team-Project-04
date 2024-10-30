
    <div class="emp-grid-container">

        <div class="emp-grid-item tasks">
            <div class="emp-grid-item-top">
                <p>Daily Tasks</p>
                <a href="#">All tasks</a>
            </div>

            <div class="emp-grid-item-content">
                <!--Kanban Card 1-->
                <div class="kanban-card"> <!--draggable=true-->
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
                <div class="kanban-card"> <!--draggable=true-->
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
                        <div class="emp-forum-tag">Non-Technical</div>
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
                        <div class="emp-forum-tag">Technical</div>
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
                        <div class="emp-forum-tag">Technical</div>
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
                        <div class="emp-forum-tag">Non-Technical</div>
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
              <div class="emp-project-card">
                <p>Project A</p>
                <!-- <canvas id="myProgressBarA" width="400" height="100"></canvas> -->
                  <!--Progress Bar-->
                  <div class="emp-progressFlexBar">
                    <div class="emp-projectProgressBarOut">
                        <div class="emp-projectProgressBarInner"></div>
                    </div>
                    <div class="emp-projectProgress-txt">
                        <p>Progress</p>
                        <p>75%</p>
                    </div>
                  </div>
                    
                    <!-- ------------------------------------------------------- -->

                    <button class="emp-view-project-button">View</button>                
              </div>

              <div class="emp-project-card">
                <p>Project B</p>
                <!-- <canvas id="myProgressBarB" width="400" height="100"></canvas> -->
                  <!--Progress Bar-->
                  <div class="emp-progressFlexBar">
                    <div class="emp-projectProgressBarOut">
                        <div class="emp-projectProgressBarInner"></div>
                    </div>
                    <div class="emp-projectProgress-txt">
                        <p>Progress</p>
                        <p>75%</p>
                    </div>
                  </div>
                  <!-- ------------------------------------------------------- -->
                  <button class="emp-view-project-button">View</button>     
                  </div>
              </div>
        </div>

        <div class="emp-grid-item stats emp-stats">
            <div class="emp-grid-item-top">
            <p>Stats</p>
            </div>
            <div class="emp-grid-item-content">
            <div id="emp-stat-flexbox">
                  <div class="emp-stat-card">
                  <div class="emp-stat-txt">Number of Posts Made</div>
                  <p>3</p>
                  </div>
                  <div class="emp-stat-card">
                  <div class="emp-stat-txt">Number of tasks completed</div>
                  <p>5</p>
                  </div>
                  <div class="emp-stat-card">
                  <div class="emp-stat-txt">Number of tasks ongoing</div>
                  <p>1</p>
                  </div>
              </div>
            </div>
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
  .stats {
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


  /*PROJECTS*/

  .emp-project-card {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 10.5px;
    margin-top: 0.5rem; 
    padding: 0.4rem 0.6rem;
  }


  .emp-projectProgressBarOut {
      height: 8px;
      width: 10rem;
      background-color: gray;
      border-radius: 10px;
      padding: 
  }        

  .emp-projectProgressBarInner {
      height: 8px;
      width: 75%;
      background-color: #ADDA9D;
      border-radius: 10px;
  }

  .emp-projectProgress-txt{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
  }

  .emp-progressFlexBar { /*This makes the text go underneath the progress bar*/
      display: flex;
      flex-direction: column;
  }

  
  .emp-view-project-button {
    color: black;
    background-color: white;
    border: 1px solid #D0D0D0;
    cursor: pointer;
    border-radius: 11px;
    font-size: 1rem;
    padding: 0.8rem 0.6rem;
    font-family: "Avenir Next";
    font-size: 14px;
    text-align: center;
  }

  /*Stats Section*/
  .emp-stats {
    background-color: black;
    color: white;
  }

  #emp-stat-flexbox{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0.6rem;
  }

  .emp-stat-card{
    background-color: gray;
    color: orange;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    height: auto;
    border-radius: 10.5px;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .emp-stat-txt{
    font-size: 1rem;
  }

  /*responsiveness*/


  @media (max-width: 768px) {
    .emp-grid-container {
      display: grid;
      grid-template-columns: 1fr; 
      grid-template-rows: 1fr 1fr 1fr 1fr;
      gap: 10px;                         
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }

/*Issue with NavBar background when responsive.*/

      /* Grid items */
      .tasks {
        grid-row: 1 ;                   
        grid-column: 1;      
      }
      .forums {
        grid-row: 2;                   
        grid-column: 1;                
      }
      .projects {
        grid-row: 3;                 
        grid-column:1;              
      }
      .stats {
        grid-row: 4;              
        grid-column: 1;            
      }
    }
</style>

