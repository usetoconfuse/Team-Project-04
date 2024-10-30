<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="signUp.css"/>
</head>
<body>
    <div id="main-wrapper">
            <div id="signUp-container">
                <div>
                    <h1>Register Today</h1>
                    <p>Enter your details to sign up.</p>
                </div>
                <form id="signUpForm">
                    <div class="signUp-inputs">
                        <label>Email</label>
                        <input type="text"  class="text-input" id="emailInput" placeholder=" Enter your username">
                    </div>
                    <div class="signUp-inputs">
                        <label>Password</label>
                        <input type="password"  class="text-input" id="passwordInput" placeholder=" Enter your password">
                    </div>
                    <div class="signUp-inputs">
                        <label>Confirm Password</label>
                        <input type="password"  class="text-input" id="confirmPasswordInput" placeholder=" Re-enter your password">
                    </div>
                    <button type="submit" id="signUp-btn">Continue</button>
                </form>
            </div>
        </div>
</body>
<script src="signUpScreen.js"></script>
</html>