// Made by Quinn Little 23/12/24
// Updated by Quinn Little 03/02/24 lines 6 to 48
// Updated by Quinn Little 07/02/2025 



//User Statistics Home Page

function redirectToPage(url) {
    window.location.href = url;
}

// =============================================================
const mgrStatsProj = document.getElementById('mgrProjStats');
const userStatsProj = document.getElementById('mgrUserStats');
mgrStatsProj.addEventListener("click", () => {
    if(mgrStatsProj.style.display == "block") {
        mgrStatsProj.classList.add('mgrStats-active')
        userStatsProj.classList.remove('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "none";
        document.getElementById("tabGroupUserStats").style.display = "block";

    } else {
        mgrStatsProj.classList.remove('mgrStats-active')
        userStatsProj.classList.add('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "none";
        document.getElementById("tabGroupProjectStats").style.display = "block";

    }
})

userStatsProj.addEventListener("click", () => {
    if(userStatsProj.style.display == "block") {
        mgrStatsProj.classList.remove('mgrStats-active')
        userStatsProj.classList.add('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "block";
        document.getElementById("tabGroupUserStats").style.display = "none";

    } else {
        mgrStatsProj.classList.add('mgrStats-active')
        userStatsProj.classList.remove('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "block";
        document.getElementById("tabGroupProjectStats").style.display = "none";

    }
})

//
const mgrStatsPostTypeButtons = document.querySelectorAll('.mgrStats-post-type-btns button');
mgrStatsPostTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
        mgrStatsPostTypeButtons.forEach(btn => btn.classList.remove('mgrStats-active'))
        button.classList.add('mgrStats-active')
    })
})
   







