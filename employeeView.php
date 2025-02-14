<?php
session_start();

// Redirects if not logged in or wrong role
if (empty($_SESSION['user_id'])) {
    header("Location: login.php");
    die("Redirecting to login");
}

if ($_SESSION['role'] !== 'Employee') {
    header("Location: managerView.php");
    die("Redirecting user");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="navbar.css"/>
    </link>
    <link rel="stylesheet" href="knowledgeBase/knowledgeBase.css">
    </link>
    <link rel="stylesheet" href="Projects/projects.css">
    </link>
    <link rel="stylesheet" href="EmployeeDashboard/employeeDashContent.css">
    </link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        crossorigin="anonymous" />
    <link rel="stylesheet" href="Project-Kanban/kanban.css" />
    <link rel="stylesheet" href="style.css">
    </link>
    <title>Employee Dashboard</title>
</head>

<body>


    <!--<div class="loading-screen">
            <h2>Make-It-All</h2>
            <div class="loader">
                <div class="loader-line"></div>
            </div>
        </div>    -->

    
    <section class="top-navbar">
        <div class="top-navbar-left">
            <div id="logo-container">
                    <img src="assets/make-it-all-logo.jpg" alt="logo">
            </div>
        </div>

        <div class="top-navbar-right">
            <a class="change-password">
                <p>Change Password</p>
            </a>


            <div class="user-profile">
                <div class="user-profile-left">
                    <div class="user-icon"><i class="fa fa-solid fa-user"></i></div>
                    <div class="user-info">
                        <p><span><?=$_SESSION['user_name'];?></span> | <?=$_SESSION['role'];?></p>
                    </div>
                </div>

                <div class="user-profile-right">
                    <div class="user-profile-logout black-btn">Sign Out</div>
                </div>
            </div>
        </div>
    </section>

    <section class="nav-content">
        <nav id="navbar">


            <button type="button" class="hamburger black-btn" id="menu-btn">
                <span class="hamburger-top"></span>
                <span class="hamburger-middle"></span>
                <span class="hamburger-bottom"></span>
            </button>

            <div class="menu">
            
                <div class="intro-txt">
                    <h1>Welcome back, <?=$_SESSION['user_forename'];?>.</h1>
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
        </nav>

        <section id="content">

            <div class="nav-item-content open" id="overview-content">
                <?php include 'EmployeeDashboard/employeeDashContent.php' ?>
            </div>

            <div class="nav-item-content" id="projects-content">
                <?php include 'Projects/projects.php' ?>
            </div>

            <div class="nav-item-content" id="current-project-content">
                <?php include 'Project-Kanban/projectsKanban.php'; ?>
            </div>

            <div class="nav-item-content" id="personal-content">
            <?php include 'PersonalKanban/personalKanban.php'; ?>
            </div>

            <div class="nav-item-content" id="forums-content">
                <?php include 'knowledgeBase/knowledgeBase.php'; ?>
            </div>


        </section>
    </section>

    <div class="modal" id="change-password-modal" data-user-id="<?php echo isset($_SESSION['user_id']) ? $_SESSION['user_id'] : ''; ?>" >
        <div class="modal-box">
            <div class="modal-header">
                <p>Change Password</p>
                <div class="close-modal-btn">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
            <form id="change-password-modal-form" class="modal-body">
                <div class="input-container password-old">
                    <div class="password-label">
                        <label>Enter Old Password<span>*</span></label>
                        <i class="fa fa-solid fa-eye-slash"></i>
                    </div>

                    <input type="password" name="old_password" class="text-input" id="oldPasswordInput"
                        placeholder=" Enter your old password" required>
                </div>

                <div class="input-container password-new">
                    <div class="password-label">
                        <label>Enter New Password<span>*</span></label>
                        <i class="fa fa-solid fa-eye-slash"></i>
                    </div>

                    <input type="password" name="new_password" class="text-input" id="newPasswordInput"
                        placeholder=" Enter your new password" required>
                </div>

                <div class="password-criteria-container">
                    <p class="password-criteria-label">Password must contain:</p>

                    <ul class="password-criteria">
                        <li class="criteria-item" id="password-length">At least 12 characters long</li>
                        <li class="criteria-item" id="uppercase-char">At least 1 uppercase leter</li>
                        <li class="criteria-item" id="lowercase-char">At least 1 lowercase letter</li>
                        <li class="criteria-item" id="number-check">At least 1 number</li>
                        <li class="criteria-item" id="special-char">At least 1 special character</li>
                    </ul>
                </div>


                <div class="input-container password-confirm">
                    <div class="password-label">
                        <label>Confirm New Password<span>*</span></label>
                        <i class="fa fa-solid fa-eye-slash"></i>
                    </div>

                    <input type="password" name="old_password" class="text-input" id="confirmPasswordInput"
                        placeholder=" Confirm your old password" required>
                </div>
            </form>
            <p class="change-pass-error"></p>
            <div class="task-submit-buttons">
                <a class="change-pass-btn" id="add-filter-btn">
                    Change Password
                    <i class="fa fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </div>

    <!--Change Password Force Log Out Modal-->
    <div class="modal change-pass-log-out" style="display: none;">
        <div class="modal-box">
            <div class="modal-header">
                <p>Password Changed Successfully</p>
            </div>
            <div class="modal-body">
                <p>Password successfully changed. You are required to log back in again with your new password.</p>
                <div class="task-submit-buttons">
                    <a class="log-out-pass-btn black-btn" id="add-filter-btn">Go To Login<i class="fa fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>

    <script src="navbar.js"></script>

    <script src="Projects/projects.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js" integrity="sha512-L0Shl7nXXzIlBSUUPpxrokqq4ojqgZFQczTYlGjzONGTDAcLremjwaWv5A+EDLnxhQzY5xUZPWLOLqYRkY0Cbw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
</body>

</html>