
/*window.addEventListener("load", () => {
    const loader = document.querySelector(".loading-screen");

    setTimeout(() => {
        loader.classList.add("loader-screen-hidden");
        loader.addEventListener("transitionend", () => {
            document.body.removeChild(loader);
        });
    }, 2500);
})*/


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

    function openPage(pageId) {
        const params = new URLSearchParams(window.location.search);
        params.set("page", pageId);
        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

        const navItem = document.getElementById(pageId);

        navItems.forEach(item => item.classList.remove('active'));
        navItem.classList.add('active');

    
        navItemContents.forEach(item => item.classList.remove('open'))
        const navItemContent = document.querySelector(`#${navItem.id}-content`)

        navItemContent.classList.add('open');

        if (navItem.id === 'current-project') {
            document.querySelector('.nav-item#projects').classList.add('active');
        }
        
        hamburgerMenuBtn.classList.remove('openMobile'); //Change hamburger menu 
        hamburgerMenu.classList.remove('openMobileMenu');
        document.querySelector('nav').classList.remove('expandNav')
        document.querySelector('#content').classList.remove('minimiseContent')
    }

 
    //====Nav Menu (Desktop)====//
    const navItemContents = document.querySelectorAll('.nav-item-content')
    //Adds Active class to make button black
    //Adds Open to the associated content
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openPage(item.id);
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


    const logoutBtn = document.querySelector('.user-profile .user-profile-logout');
    logoutBtn.addEventListener('click', () => {
        window.location.href = "logout.php";
    })

    const currentPage = getPageId();
    if (currentPage) {
        openPage(currentPage);
    }
})

