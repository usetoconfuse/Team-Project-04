

const signUpform = document.getElementById("signUpForm");


signUpform.addEventListener("submit", (e) =>{
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const confirmPassword = document.getElementById("confirmPasswordInput").value;

    if(email.trim() !=="" && password.trim() !=="" && confirmPassword.trim() !==""){
        window.location.href = "login.php";
    }
});