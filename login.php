
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
                <form id="loginForm">
                    <div>
                        <label>Email</label>
                        <input type="text"  class="text-input" id="usernameInput" placeholder=" Enter your username">
                        <p class="error-message" id="username-error"></p>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password"  class="text-input" id="passwordInput" placeholder=" Enter your password">
                        <p class="error-message" id="password-error"></p>
                    </div>
                    <button type="submit" class="login-btn">Continue</button>
                </form>
                
                <div class="or">
                    <hr class="bar" />
                    <span>OR</span>
                    <hr class="bar" />
                </div>
            </div>
            <a href="#" class="signup-btn">Create an account</a>
        </div>
        <div id="right">
            <img src="Demo.svg" alt="demo-image">
        </div>
    </div>
    <script src="loginScreen.js"></script>
</body>
</html>