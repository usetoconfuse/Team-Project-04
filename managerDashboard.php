<?php
session_start()
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="navbar.css"></link>
        <link rel="stylesheet" href="knowledgeBase.css"></link>
        <link rel="stylesheet" href="projects.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" crossorigin="anonymous" />
        <link rel="stylesheet" href="Project-Kanban/kanban.css" />
        <link rel="stylesheet" href="style.css"></link>
        <title>Manager Dashboard</title>
    </head>

    <body>
s
      
        <!--<div class="loading-screen">
            <h2>Make-It-All</h2>
            <div class="loader">
                <div class="loader-line"></div>
            </div>
        </div>    -->
        

        <nav id="navbar">

           

            <button type="button" class="hamburger black-btn" id="menu-btn">
                    <span class="hamburger-top"></span>
                    <span class="hamburger-middle"></span>
                    <span class="hamburger-bottom"></span>
            </button>

            <div class="menu">
                <div id="logo-container">
                    <img src="logo.jpeg" alt="logo">
                </div>
                <div class="intro-txt">
                    
                    <h1>Welcome back, John.</h1>
                    <p>View your daily overview here.</p>
                </div>

                <ul>
                    <li class="nav-item active" id="overview">
                        <a href="#">
                            <i class="fa fa-solid fa-table-columns fa-lg"></i>
                            <div class="btn-animate"></div>
                            <span>Dashboard</span>
                        </a>
                    </li>

                    <li class="nav-item" id="projects">
                        <a href="#">
                            <i class="fa fa-solid fa-folder fa-lg"></i>
                            <div class="btn-animate"></div>
                            <span>Projects</span>
                        </a>
                    </li>

                    <li class="nav-item " id="current-project">
                        <a href="#">
                            <i class="fa fa-solid fa-table-columns fa-lg"></i>
                            <div class="btn-animate"></div>
                            <span>Current Project</span>
                        </a>
                    </li>

                    <li class="nav-item" id="forums">
                        <a href="#">
                            <i class="fa fa-solid fa-file fa-lg"></i>
                            <div class="btn-animate"></div>
                            <span>Knowledge Base</span>
                        </a>
                    </li>

                  

                    <li class="nav-item" id="personal">
                        <a href="#">
                            <i class="fa fa-solid fa-table-columns fa-lg"></i>
                            <div class="btn-animate"></div>
                            <span>Personal Board</span>
                        </a>
                    </li>

                    <li class="nav-item" id="stats">
                        <a href="#">
                            <i class="fa fa-solid fa-chart-simple"></i>
                            <div class="btn-animate"></div>
                            <span>Statistics</span>
                        </a>
                    </li>
                </ul>

                <div class="bar"></div>

        
                <div class="date-item">
                    <div class="date-item-top">
                        <div class="date-txt">
                            <i class="fa fa-regular fa-calendar fa-lg"></i>
                            <p>Today</p>
                        </div>
                    </div>

                    <div class="date-item-bottom">
                        <div class="date-time">
                            <div class="time"></div>
                            <div class="date"></div>
                        </div>
                    </div>   
                </div>
            </div>


            <div class="user-profile">
                <div class="user-profile-left">
                    <div class="user-icon"><i class="fa fa-solid fa-user"></i></div>
                    <div class="user-info">
                        <p><span>John Little</span> | Manager</p>
                    </div>
                </div>
                <div class="user-profile-right">
                    <div class="user-profile-logout black-btn">Sign Out</div>
                </div>
             
            </div>
           
        </nav>


        <section id="content">

            <div class="nav-item-content open" id="overview-content">
                <?php include 'managerDashContent.php' ?>
            </div>

            <div class="nav-item-content" id="projects-content">
                <?php include 'projects.php' ?>
            </div>

            <div class="nav-item-content" id="current-project-content">
                <?php include 'Project-Kanban/projectsKanban.php'; ?>
            </div>

            <div class="nav-item-content" id="personal-content">
                <?php include 'personalKanban.php'; ?>
            </div>

            <div class="nav-item-content" id="forums-content">
                <?php include 'knowledgeBase.php'; ?>
            </div>

            <div class="nav-item-content" id="stats-content">
                <?php include 'statisticsPage.php'; ?>
            </div>
           
            

        </section>

        <script src="knowledgeBase.js"></script>
        <script src="navbar.js"></script>
        <script src="projects.js"></script>
        <script src="Project-Kanban/kanban.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js"></script>
    </body>
</html>