<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

session_start();

// Redirects if user is already logged in
if (isset($_SESSION['role'])) {
    if ($_SESSION['role'] === 'Employee') {
        header("Location: employeeView.php");
        die("Redirecting user");
    }
    
    if ($_SESSION['role'] === 'Admin') {
        header("Location: managerView.php");
        die("Redirecting user");
    }
}

//Errors saved in session, and redirects to error or success page+
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register'])) {
    //User is registering so currently loaded tab is register
    $_SESSION['current_tab'] = 'register';

    $email = $_POST['register_email'];
    $email = trim($email);
    $inputted_password = $_POST['register_password'];
    $password_confirm = $_POST['register_password_confirm'];
    $forename = $_POST['forename'];
    $surname = $_POST['surname'];

    $password_regex = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?\":{}|<>]).{12,}$/";


    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //invalid email
        $_SESSION['register_err'] = "Enter a valid email address";
        $_SESSION['reject'] = "Registration unsuccessful. Please try again.";

    } else {
        $parts = explode('@', $email);
        $domain = array_pop($parts);

        if ($domain !== 'make-it-all.co.uk') {
            $_SESSION['register_err'] = "Enter a valid Make-It-All email address";
            $_SESSION['reject'] = "Registration unsuccessful. Please try again.";

        } else {

            if (empty($inputted_password) || empty($password_confirm) || empty($forename) || empty($surname)) {
                //empty fields
                $_SESSION['register_err'] = "Enter all fields";
                $_SESSION['reject'] = "Registration unsuccessful. Please try again.";

            } elseif ($inputted_password !== $password_confirm) {
                //confirm passwords invalid
                $_SESSION['register_err'] = "Passwords do not match";
                $_SESSION['reject'] = "Registration unsuccessful. Please try again.";
            } elseif (!preg_match($password_regex, $inputted_password)) {
                $_SESSION['register_err'] = "Password must match all criteria.";
            } else {
                //register the user
                include "config/db-setup.php";
                //check for duplicate users in database
                $query = $conn->prepare("SELECT COUNT(*) FROM Users WHERE Email = ?");
                $query->bind_param("s", $email);
                $query->execute();
                $query->bind_result($email_duplicate_count);
                $query->fetch();
                $query->close();

                if ($email_duplicate_count > 0) {
                    $_SESSION['register_err'] = "Email already exists.";
                    $_SESSION['reject'] = "Registration unsuccessful. Please try again.";
                } else {

                    //resister the user
                    $password_hashed = password_hash($inputted_password, PASSWORD_DEFAULT);
                    $user_type = 'Employee';
                    $employee_status = 1;
                    $query = $conn->prepare("INSERT INTO Users (Email, Forename, Surname, Password, User_Type, Employee_Status) VALUES (?, ?, ?, ?, ?, ?)");
                    $query->bind_param("sssssi", $email, $forename, $surname, $password_hashed, $user_type, $employee_status);

                    if ($query->execute()) {
                        $_SESSION['success_register'] = "Registration successful. Login below to access your account.";
                        $_SESSION['current_tab'] = 'login'; //after registering successfully, redirect to login tab
                    } else {
                        $_SESSION['register_err'] = "Error with registration: " . $query->error;
                        $_SESSION['reject'] = "Registration unsuccessful. Please try again.";
                    }

                    $query->close();
                }
            }
        }
    }
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['login'])) {
    //User is logging in so current tab is login



    $_SESSION['current_tab'] = 'login';

    $email = $_POST['login_email'];
    $email = trim($email);
    $inputted_password = $_POST['login_password'];


    if (empty($inputted_password) || empty($email)) {
        $_SESSION['register_err'] = "Enter all fields";
    } else {
        include "config/db-setup.php";

        $query = $conn->prepare("SELECT User_ID, Email, Forename, Surname, Password, User_Type, Employee_Status FROM Users WHERE Email = ?");
        $query->bind_param("s", $email);
        $query->execute();
        $query->bind_result($user_id, $fetched_email, $fetched_forename, $fetched_surname, $hashed_password, $user_type, $employee_status);
        $query->fetch();
        $query->close();




        if (!$user_id) {
            $_SESSION['login_err'] = "Email address does not exist";
        } elseif ($employee_status === 0) {
            $_SESSION['login_err'] = "Your account is no longer active";
        } else {
            if (password_verify($inputted_password, $hashed_password)) {
                $_SESSION['user_id'] = $user_id;
                $_SESSION['role'] = $user_type;
                $_SESSION['user_forename'] = $fetched_forename;
                $_SESSION['user_name'] = $fetched_forename . " " . $fetched_surname;

                if($inputted_password === 'MakeItAll123!') { // Check if the password has been reset
                    $_SESSION['changePWD'] = 1;
                }
                // Redirect based on user role
                if ($_SESSION['role'] === 'Admin') {
                    header("Location: managerView.php");
                } else {
                    header("Location: employeeView.php");
                }
                exit();

            } else {
                $_SESSION['login_err'] = "Incorrect password.";
            }
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login.css" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        crossorigin="anonymous" />
</head>

<body>    
    <section class="top-navbar">
        <div class="top-navbar-left">
            <div id="logo-container">
                <img src="assets/make-it-all-logo.jpg" alt="logo">
            </div>
        </div>
    </section>

    <section id="login-content">
        <div id="signin-wrapper">
            <div id="left">
                <div id="signIn">

                    <div>
                        <h1>Welcome Back</h1>
                        <p>Enter your credentials to sign in.</p>
                    </div>


                    <!--Register was successful-->
                    <?php if (isset($_SESSION['success_register'])): ?>
                        <p class="register-success-msg"><?= htmlspecialchars($_SESSION['success_register']) ?></p>
                        <?php
                        unset($_SESSION['success_register']);
                    endif; ?>


                    <form id="loginForm" method="POST">
                        <div class="input-container">
                            <label for="usernameInput">Email<span>*</span></label>
                            <input type="email" name="login_email" class="text-input" id="usernameInput"
                                placeholder=" Enter your email" required>
                            <p class="error-message" id="username-error"></p>
                        </div>
                        <div class="input-container">
                            <div class="password-label">
                                <label>Password<span>*</span></label>
                                <i class="fa fa-solid fa-eye-slash"></i>
                            </div>

                            <input type="password" name="login_password" class="text-input" id="passwordInput"
                                placeholder=" Enter your password">
                            <p class="error-message" id="password-error"></p>
                        </div>

                        <!--Login Error-->
                        <?php if (isset($_SESSION['login_err'])): ?>
                            <p class="register-error-msg"><?= htmlspecialchars($_SESSION['login_err']) ?></p>
                            <?php
                            unset($_SESSION['login_err']);
                        endif; ?>


                        <div class="signin-btn-container">
                            <button type="submit" class="login-btn" name="login">Continue</button>
                        </div>

                    </form>


                    <div class="register-container">

                        <p>Don't have an account. <a href="#" class="signup-btn">Register here</a></p>

                    </div>
                </div>
            </div>

            <div id="right">
                <img src="assets/Demo.svg" alt="demo-image">
            </div>        
        </div>

        <div id="signup-wrapper">
            <div id="left">
                <div id="signIn">
                    <div>
                        <h1>Register Now</h1>
                        <p>Enter your credentials to register.</p>
                    </div>

                    <!--Register was unsuccessful-->
                    <?php if (isset($_SESSION['reject'])): ?>
                        <p class="register-error-msg"><?= htmlspecialchars($_SESSION['reject']) ?></p>
                        <?php
                        unset($_SESSION['reject']);
                    endif; ?>

                    <form id="loginForm" method="POST">

                        <div class="name-input-container">
                            <div class="input-container">
                                <label for="forenameInput">Forename<span>*</span></label>
                                <input type="text" name="forename" class="text-input" id="forenameInput"
                                    placeholder=" Enter your forename" required>
                            </div>

                            <div class="input-container">
                                <label for="surnameInput">Surname<span>*</span></label>
                                <input type="text" name="surname" class="text-input" id="surnameInput"
                                    placeholder=" Enter your surname" required>

                            </div>
                        </div>


                        <div class="input-container">
                            <label for="usernameInput">Email<span>*</span></label>
                            <input type="email" name="register_email" class="text-input" id="usernameInput"
                                placeholder=" Enter your email" required>
                            <p class="error-message" id="username-error"></p>
                        </div>
                        <div class="input-container">
                            <div class="password-label">
                                <label>Password<span>*</span></label>
                                <i class="fa fa-solid fa-eye-slash"></i>
                            </div>
                            <input type="password" name="register_password" class="text-input" id="passwordInput"
                                placeholder=" Enter your password">
                            <p class="error-message" id="password-error"></p>
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



                        <div class="input-container">
                            <label>Confirm Password<span>*</span></label>
                            <input type="password" name="register_password_confirm" class="text-input"
                                id="passwordInputConfirm" placeholder=" Enter your password">
                            <p class="error-message" id="password-error"></p>
                        </div>

                        <!--Register Error-->
                        <?php if (isset($_SESSION['register_err'])): ?>
                            <p class="register-error-msg"><?= htmlspecialchars($_SESSION['register_err']) ?></p>
                            <?php
                            unset($_SESSION['register_err']);
                        endif; ?>

                        <div class="signin-btn-container">
                            <button type="submit" class="login-btn" name="register">Continue</button>
                        </div>

                    </form>



                    <div class="register-container">

                        <p>Already have an account. <a href="#" class="signup-btn" id="backtologin">Login here</a></p>

                    </div>
                </div>
            </div>
            <div id="right">
                <img src="assets/Demo.svg" alt="demo-image">
            </div>
        </div>
    </>


    <script>
        function switchTabs(tab) {
            document.querySelector('#signin-wrapper').style.display = "none";
            document.querySelector('#signup-wrapper').style.display = "none";

            if (tab === 'register') {
                document.querySelector('#signup-wrapper').style.display = "flex";
            } else {
                document.querySelector('#signin-wrapper').style.display = "flex";
            }
        }
        //get the currently loaded tab from Session - default is login
        const currentTab = "<?php echo isset($_SESSION['current_tab']) ? $_SESSION['current_tab'] : 'login'; ?>";
        switchTabs(currentTab);

        //switch between the tabs
        document.querySelector('#backtologin').addEventListener('click', (e) => {
            e.preventDefault();
            switchTabs('login');
        })
        document.querySelector('.register-container .signup-btn').addEventListener('click', (e) => {
            e.preventDefault();
            switchTabs('register');
        })

        const passwordInput = document.querySelector('#signup-wrapper #passwordInput');
        const passwordCriteriaBlock = document.querySelector('.password-criteria-container');

        passwordInput.addEventListener('focus', () => {
            passwordCriteriaBlock.classList.add('active');
        })
        passwordInput.addEventListener('focusout', () => {
            passwordCriteriaBlock.classList.remove('active');
        })

        const passwordCriteriaList = document.querySelectorAll('.criteria-item');
        const passwordRegex = [
            { regex: /.{12,}/ },
            { regex: /[A-Z]/ },
            { regex: /[a-z]/ },
            { regex: /[0-9]/ },
            { regex: /[!@#$%^&*(),.?":{}|<>]/ }
        ]

        passwordInput.addEventListener('keyup', () => {
            passwordRegex.forEach((pattern, i) => {
                let valid = pattern.regex.test(passwordInput.value);

                if (valid) {
                    passwordCriteriaList[i].classList.add('valid');
                } else {
                    passwordCriteriaList[i].classList.remove('valid');
                }
            })
        });

        const signInShowPasswordBtn = document.querySelector('#signin-wrapper .password-label i');
        const signInPasswordInput = document.querySelector('#signin-wrapper #passwordInput');
        showPassword(signInShowPasswordBtn, signInPasswordInput);

        const signUpShowPasswordBtn = document.querySelector('#signup-wrapper .password-label i');
        showPassword(signUpShowPasswordBtn, passwordInput);

        function showPassword(showBtn, passInput) {
            showBtn.addEventListener('click', () => {
                showBtn.classList.toggle('fa-eye');
                showBtn.classList.toggle('fa-eye-slash');

                if (passInput.type === 'password') {
                    passInput.type = 'text';
                } else {
                    passInput.type = 'password';
                }
            })
        }



    </script>

    <?php
    unset($_SESSION['current_tab']);
    ?>
</body>

</html>