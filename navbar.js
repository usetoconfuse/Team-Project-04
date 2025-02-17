
/*window.addEventListener("load", () => {
    const loader = document.querySelector(".loading-screen");

    setTimeout(() => {
        loader.classList.add("loader-screen-hidden");
        loader.addEventListener("transitionend", () => {
            document.body.removeChild(loader);
        });
    }, 2500);
})*/

const sendToast = (message) => {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#000000",
        },
      }).showToast();
}


document.addEventListener('DOMContentLoaded', () => {

    
    //====Date and Time====//
    window.addEventListener("load", () => {
        time()
        date()
    })

    //gets time 
    function time() {
        const today = new Date()
        let hours = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()
        hours = appendTime(hours)
        minutes = appendTime(minutes)
        seconds = appendTime(seconds)
        document.querySelector('.time').innerHTML = hours + ':' + minutes //':' + seconds
        setTimeout(time, 1000)
    }

    function appendTime(time) {
        if (time < 10) {
            time = "0" + time
        }
        return time;
    }

    //gets date
    let setDate = ""

    function date() {
        const currentTime = new Date()

        const currentDate = currentTime.toLocaleDateString('en-GB'); 

        if (currentDate !== setDate) { //updates old date if needed
            setDate = currentDate
            document.querySelector('.date').innerHTML = setDate
        }
        
        setTimeout(date, 1000)
    }
    


    function getPageId() {
        const params = new URLSearchParams(window.location.search);
        return params.get("page");
    }

    const navItems = document.querySelectorAll('.nav-item');
    const navItemContents = document.querySelectorAll('.nav-item-content');

    function openPage(pageId, fromURL = true) {
        // Preserve params if arriving directly from URL (default)
        // Reset URL params if we clicked a new page
        let loc;
        if (fromURL) loc = window.location.search;

        const params = new URLSearchParams(loc);
        
        params.set("page", pageId);
        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

        const navItem = document.getElementById(pageId);

        navItems.forEach(item => item.classList.remove('active'));
        navItem.classList.add('active');

    
        navItemContents.forEach(item => item.classList.remove('open'))
        const navItemContent = document.querySelector(`#${navItem.id}-content`)

        navItemContent.classList.add('open');
        window.dispatchEvent(new CustomEvent(`${navItem.id}Loaded`, {bubbles: true}));      

        if (navItem.id === 'current-project') {
            document.querySelector('.nav-item#projects').classList.add('active');
            window.dispatchEvent(new Event('storage'));
        }
        
        hamburgerMenuBtn.classList.remove('openMobile'); //Change hamburger menu 
        hamburgerMenu.classList.remove('openMobileMenu');
        document.querySelector('nav').classList.remove('expandNav')
        document.querySelector('#content').classList.remove('minimiseContent')
    }


 
    //====Nav Menu (Desktop)====//

    //Adds Active class to make button black
    //Adds Open to the associated content
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openPage(item.id, false);
        })
    })



    //====Hamburger Menu====//
    const hamburgerMenuBtn = document.querySelector('.hamburger'); 
    const hamburgerMenu = document.querySelector('.menu');
    hamburgerMenuBtn.addEventListener('click', () => {
        hamburgerMenuBtn.classList.toggle('openMobile'); //Change hamburger menu 
        hamburgerMenu.classList.toggle('openMobileMenu');
        document.querySelector('nav').classList.toggle('expandNav')
        document.querySelector('#content').classList.toggle('minimiseContent')
    })


    const logoutBtns = document.querySelectorAll('.user-profile .user-profile-logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = "logout.php";
        })
    
    })

    const currentPage = getPageId();
    if (currentPage) {
        openPage(currentPage);
    } else {
        const defaultPage = document.querySelector('.nav-item').id;
        document.location.search = `?page=${defaultPage}`;
    }

    //Show and Hide Password Modal
    const openChangePassBtns = document.querySelectorAll('.change-password');
    const closeChangePassBtn = document.querySelector('#change-password-modal .close-modal-btn')
    const changePassModal = document.querySelector('#change-password-modal');

    openChangePassBtns.forEach(openChangePassBtn => {
        openChangePassBtn.addEventListener('click', () => {
            changePassModal.style.display = 'block';
            oldPasswordInput.value = "";
            newPasswordInput.value = "";
            confirmPasswordInput.value = "";
        })
    })

    closeChangePassBtn.addEventListener('click', () => {
        changePassModal.style.display = 'none';
    })

    //Show and HIde Password Criteria in Change Password Modal
    const passwordInput = document.querySelector('#change-password-modal #newPasswordInput');
    const passwordCriteriaBlock = document.querySelector('#change-password-modal .password-criteria-container');
    passwordInput.addEventListener('focus', () => {
        passwordCriteriaBlock.classList.add('active');
    })
    passwordInput.addEventListener('focusout', () => {
        passwordCriteriaBlock.classList.remove('active');
    })

    //Inform User when they have met a criteria for a new password
    const passwordCriteriaList = document.querySelectorAll('#change-password-modal .criteria-item');
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

    //Show
    const showOldPasswordBtn = document.querySelector('#change-password-modal .password-old .password-label i'); 
    const oldPasswordInput = document.querySelector('#change-password-modal #oldPasswordInput');
    showPassword(showOldPasswordBtn, oldPasswordInput);

    const newPasswordInput = document.querySelector('#change-password-modal #newPasswordInput');
    const showNewPasswordBtn = document.querySelector('#change-password-modal .password-new .password-label i'); 
    showPassword(showNewPasswordBtn, newPasswordInput);

    const confirmPasswordInput = document.querySelector('#change-password-modal #confirmPasswordInput');
    const showConfirmPasswordBtn = document.querySelector('#change-password-modal .password-confirm .password-label i'); 
    showPassword(showConfirmPasswordBtn, confirmPasswordInput);

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
    console.log('clicked');




    //Send Request to Update Password in Database on Click 
    const userId = changePassModal.getAttribute('data-user-id');
    const changePassBtn = changePassModal.querySelector('#add-filter-btn');
    const logOutModal = document.querySelector('.change-pass-log-out');

    //Change Password functionality and Force Log out
    if (localStorage.getItem('passwordChanged') === 'true') {
        logOutModal.style.display = 'block';
    }


    changePassBtn.addEventListener('click', async () => {
        const currentPassword = oldPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const userId = changePassModal.getAttribute('data-user-id');

        if (!currentPassword || !newPassword || !confirmPassword) {
            changePassModal.querySelector('.change-pass-error').innerHTML = "Please fill in all fields.";
            return;
        }
    
        if (newPassword !== confirmPassword) {
            changePassModal.querySelector('.change-pass-error').innerHTML = "New Passwords do not match.";
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/;
    
        if (!passwordRegex.test(newPassword)) {
            changePassModal.querySelector('.change-pass-error').innerHTML = "New Password doesn't meet the criteria.";
            return;
        }
    
        try {
            const url = 'update-password-db.php';
            const data = {
                userID: userId,
                currentPass: currentPassword,
                newPass: newPassword,
            };
            const params = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
    
            const response = await fetch(url, params);
            const responseData = await response.json(); 
    
            if (responseData.success) {
                localStorage.setItem('passwordChanged', 'true');
                changePassModal.style.display = 'none';
                logOutModal.style.display = 'block';
            } else {
                localStorage.setItem('passwordChanged', 'false');
                changePassModal.querySelector('.change-pass-error').innerHTML = responseData.error;
            }
    
        } catch (error) {
            console.log("Error updating password", error);
        }
    });


    const forceLogOutBtn = logOutModal.querySelector('.log-out-pass-btn');
    forceLogOutBtn.addEventListener('click', () => {
        localStorage.removeItem('passwordChanged');
        window.location.href = "logout.php";
    })







})

