/*====Loading Animation====*/
window.addEventListener("load", () => {
    const loader = document.querySelector(".loading-screen");

    setTimeout(() => {
        loader.classList.add("loader-screen-hidden");
        loader.addEventListener("transitionend", () => {
            document.body.removeChild(loader);
        });
    }, 3000);
})


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
        const dateOptions = { weekday: 'long',
                              day: 'numeric',
                              month: 'long'
                            }

        const suffix = getDateSuffix(currentTime.getDate())
                            
        const currentDate = currentTime.toLocaleDateString("en-GB", dateOptions).replace(currentTime.getDate(), currentTime.getDate() + suffix)
        

        if (currentDate !== setDate) { //updates old date if needed
            setDate = currentDate
            document.querySelector('.date').innerHTML = setDate
        }
        
        setTimeout(date, 1000)
    }

    function getDateSuffix(date) {
        if (date >= 11 && date <= 13) {
            return "th";
        }
        switch (date[-1]) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }


 
    //====Nav Menu (Desktop)====//
    const navItems = document.querySelectorAll('.nav-item');
    const navItemContents = document.querySelectorAll('.nav-item-content')
    //Adds Active class to make button black
    //Adds Open to the associated content
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(item => item.classList.remove('active'));
            item.classList.add('active');

        
            navItemContents.forEach(item => item.classList.remove('open'))
            const navItemContent = document.querySelector(`#${item.id}-content`)
            navItemContent.classList.add('open');

            if (item.id === 'current-project') {
                document.querySelector('.nav-item#projects').classList.add('active');
            }
            
            hamburgerMenuBtn.classList.remove('openMobile'); //Change hamburger menu 
            hamburgerMenu.classList.remove('openMobileMenu');
            document.querySelector('nav').classList.remove('expandNav')
            document.querySelector('#content').classList.remove('minimiseContent')
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


})