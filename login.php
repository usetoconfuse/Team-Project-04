<?php
session_start();
$user_details = [
    'admin@email.com' => [
        'password' => 'manager',
        'role' => 'manager'
    ],
    'leader@email.com' => [
        'password' => 'leader',
        'role' => 'leader'
    ], 
    'employee@email.com' => [
        'password' => 'employee',
        'role' => 'employee'
    ]
    ];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (isset($user_details[$email]) && $user_details[$email]['password'] === $password) {
        $_SESSION['email'] = $email;
        $_SESSION['role'] = $user_details[$email]['role'];
        
        if ($user_details[$email]['role'] === 'manager') {
            header("Location: managerDashboard.php");
            exit();
        } elseif ($user_details[$email]['role'] === 'leader') {
            header("Location: employeeDashboard.php");
            exit();
        } elseif ($user_details[$email]['role'] === 'employee') {
            header("Location: employeeDashboard.php");
            exit();
        }
    } else {
        echo "Invalid login credentials";
    }
};

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="stylesheet" href="login.css"/>
</head>
<body id="sign-in-bg">
    <div id="signin-wrapper">
        <div id="left">
            <div id="signIn">
                <div>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to sign in.</p>
                </div>
                <form id="loginForm" method="POST">
                    <div class="input-container">
                        <label for="usernameInput">Email<span>*</span></label>
                        <input type="email" name="email" class="text-input" id="usernameInput" placeholder=" Enter your email" required>
                        <p class="error-message" id="username-error"></p>
                    </div>
                    <div class="input-container">
                        <label>Password<span>*</span></label>
                        <input type="password" name="password" class="text-input" id="passwordInput" placeholder=" Enter your password">
                        <p class="error-message" id="password-error"></p>
                    </div>
                    <div class="signin-btn-container">
                        <button type="submit" class="login-btn">Continue</button>
                    </div>
                    
                </form>
                
                <div class="register-container">
      
                    <p>Don't have an account. <a href="#" class="signup-btn">Register here</a></p>
            
                </div>
            </div>
        </div>
        <div id="right">
            <img src="Demo.svg" alt="demo-image">
        </div>
    </div>

    <div id="signup-wrapper">
        <div id="left">
            <div id="signIn">
                <div>
                    <h1>Register Now</h1>
                    <p>Enter your credentials to register.</p>
                </div>
                <form id="loginForm" method="POST">
                    <div class="input-container">
                        <label for="usernameInput">Email<span>*</span></label>
                        <input type="email" name="email" class="text-input" id="usernameInput" placeholder=" Enter your email" required>
                        <p class="error-message" id="username-error"></p>
                    </div>
                    <div class="input-container">
                        <label>Password<span>*</span></label>
                        <input type="password" name="password" class="text-input" id="passwordInput" placeholder=" Enter your password">
                        <p class="error-message" id="password-error"></p>
                    </div>
                    <div class="input-container">
                        <label>Confirm Password<span>*</span></label>
                        <input type="password" name="password" class="text-input" id="passwordInput" placeholder=" Enter your password">
                        <p class="error-message" id="password-error"></p>
                    </div>
                    <div class="signin-btn-container">
                        <button type="submit" class="login-btn">Continue</button>
                    </div>
                    
                </form>
                
                <div class="register-container">
      
                    <p>Already have an account. <a href="#" class="signup-btn" id="backtologin">Login here</a></p>
            
                </div>
            </div>
        </div>
        <div id="right">
            <img src="Demo.svg" alt="demo-image">
        </div>
    </div>


    <script>
        const registerBtn = document.querySelector('.register-container .signup-btn');
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#signin-wrapper').style.display = "none";
            document.querySelector('#signup-wrapper').style.display = "flex";
        })
        document.querySelector('#backtologin').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('#signin-wrapper').style.display = "flex";
            document.querySelector('#signup-wrapper').style.display = "none";
        })
    </script>
</body>
</html>