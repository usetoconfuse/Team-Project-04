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
<body>
    <div id="wrapper">
        <div id="left">
            <div id="signIn">
                <div>
                    <h1>Welcome Back</h1>
                    <p>Enter your credentials to sign in.</p>
                </div>
                <form id="loginForm" method="POST">
                    <div>
                        <label for="usernameInput">Email</label>
                        <input type="email" name="email" class="text-input" id="usernameInput" placeholder=" Enter your email" required>
                        <p class="error-message" id="username-error"></p>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" name="password" class="text-input" id="passwordInput" placeholder=" Enter your password">
                        <p class="error-message" id="password-error"></p>
                    </div>
                    <button type="submit" class="login-btn">Continue</button>
                </form>
                
                <div class="or">
                    <hr class="bar" />
                    <span>OR</span>
                    <hr class="bar" />
                </div>
                <a href="signUp.php" class="signup-btn">Register an account</a>
            </div>
        </div>
        <div id="right">
            <img src="Demo.svg" alt="demo-image">
        </div>
    </div>

</body>
</html>