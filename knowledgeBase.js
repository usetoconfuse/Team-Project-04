
const formPosts = document.querySelectorAll(".kb-post");

document.getElementById("technicalBtn").addEventListener("click", () => {

    for(i = 0; i < formPosts.length; i++){
        if (formPosts[i].id ==="technical"){
            formPosts[i].style.display = "block";
        }
        if (formPosts[i].id ==="nonTechnical" ){
            formPosts[i].style.display = "none";
        }
    }
});

document.getElementById("nonTechnicalBtn").addEventListener("click", () => {

    for(i = 0; i < formPosts.length; i++){
        if (formPosts[i].id ==="technical"){
            formPosts[i].style.display = "none";
        }
        if (formPosts[i].id ==="nonTechnical" ){
            formPosts[i].style.display = "block";
        }
    }
});

document.getElementById("allBtn").addEventListener("click", () => {

    for(i=0 ; i < formPosts.length; i++){
        if(formPosts[i].id === "technical" || formPosts[i].id === "nonTechnical"){
            formPosts[i].style.display= "block";
        }
    }
});


const allButtons = document.querySelectorAll('.form-btns button');

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        allButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
    })
})