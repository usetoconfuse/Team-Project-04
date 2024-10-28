
document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById("loginForm");
    
    // admin demo crednetials 
    const managerUsername= "admin@email.com";
    const managerPassword = "brockington69";
    // employee demo crednetials 
    const employeeUsername= "employee@email.com";
    const employeePassword = "wavytop69";
    // team leader demo crednetials 
    const teamLeaderUsername= "teamleader@email.com";
    const teamLeaderPassword = "jamesfrance69";

    form.addEventListener('submit',(e) => {
        e.preventDefault();

        const username = document.getElementById("usernameInput").value;
        const password = document.getElementById("passwordInput").value;
        let isValid = false;

        // Clear any previous error messages
        document.getElementById("username-error").innerHTML = "";
        document.getElementById("password-error").innerHTML = "";

         // Validate credentials
         if ((username === managerUsername && password === managerPassword) || 
         (username === employeeUsername && password === employeePassword) || 
         (username === teamLeaderUsername && password === teamLeaderPassword)) {
            isValid = true; // Valid credentials
        } else {
            isValid = false; // Invalid credentials
            if (username !== managerUsername && username !== employeeUsername && username !== teamLeaderUsername) {
                document.getElementById("username-error").innerHTML = "Incorrect username";
            }
            if (password !== managerPassword && password !== employeePassword && password !== teamLeaderPassword) {
                document.getElementById("password-error").innerHTML = "Incorrect password";
            }
        }

        // If credentials are valid, redirect to the correct dashboard
        if (isValid) {
            document.getElementById("username-error").innerHTML = "";
            document.getElementById("password-error").innerHTML = "";
            
            if (username === employeeUsername) {
                window.location.href = "employeeDashboard.php";
            } else if (username === managerUsername) {
                window.location.href = "managerDashboard.php";
            } else if (username === teamLeaderUsername){
                window.location.href = "teamLeaderDashboard.php";
            }
        }
    });
});
