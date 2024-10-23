const formPosts = document.querySelectorAll(".kb-post");
const topics = document.querySelectorAll(".kb-topic");

//when button click only display those with corresponding section
document.getElementById("technicalBtn").addEventListener("click", () => {
    
    for(i = 0; i < formPosts.length; i++){
        if (formPosts[i].id ==="technical"){
            formPosts[i].style.display = "block";
        }
        else{
            formPosts[i].style.display = "none";
        }
    }
});

document.getElementById("nonTechnicalBtn").addEventListener("click", () => {

    for(i = 0; i < formPosts.length; i++){
        if (formPosts[i].id ==="technical"){
            formPosts[i].style.display = "none";
        }
        else{
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

//when topics are click only display those topics
topics.forEach(topic => {
    topic.addEventListener("click", (e) => {
        const selectedTopic = e.target.id; // Get the clicked topic's ID

        formPosts.forEach(post => {
            const postKey = post.getAttribute("data-key"); // Get post's data-key
            if (selectedTopic === "codingStandards" && postKey === "coding-standards" && post.id === "technical") {
                post.style.display = "block";
            } else if (selectedTopic === "printerIssues" && postKey === "printer-issues" && post.id === "nonTechnical") {
                post.style.display = "block";
            } else if (selectedTopic === "cybersecurity" && postKey === "cyber-security" && post.id === "technical") {
                post.style.display = "block";
            } else if (selectedTopic === "workplaceHygiene" && postKey === "workplace-hygiene" && post.id === "nonTechnical") {
                post.style.display = "block";
            } else {
                post.style.display = "none"; // Hide posts that don't match the selected topic
            }
        });
    });
});


const allButtons = document.querySelectorAll('.form-btns button');

allButtons.forEach(button => {
    button.addEventListener("click", () => {
        allButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
    })
})

