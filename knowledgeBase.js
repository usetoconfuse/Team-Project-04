const formPosts = document.querySelectorAll(".kb-post");
const topics = document.querySelectorAll(".kb-topic");

//when button click only display those with corresponding section
document.getElementById("technicalBtn").addEventListener("click", () => {

    for (i = 0; i < formPosts.length; i++) {
        if (formPosts[i].id === "technical") {
            formPosts[i].style.display = "block";
        }
        else {
            formPosts[i].style.display = "none";
        }
    }
});

document.getElementById("nonTechnicalBtn").addEventListener("click", () => {

    for (i = 0; i < formPosts.length; i++) {
        if (formPosts[i].id === "technical") {
            formPosts[i].style.display = "none";
        }
        else {
            formPosts[i].style.display = "block";
        }
    }
});

document.getElementById("allBtn").addEventListener("click", () => {

    for (i = 0; i < formPosts.length; i++) {
        if (formPosts[i].id === "technical" || formPosts[i].id === "nonTechnical") {
            formPosts[i].style.display = "block";
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



//MODAL FUNCTIONALITY
var topicModal = document.getElementById("topic-modal");
var topicModalButton = document.getElementById("new-topic-btn");

// Get the <span> element that closes the modal
var closeTopicModalButton = document.getElementById("close-topic-modal");

// When the user clicks on the button, open the modal
topicModalButton.onclick = function () {
    topicModal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
closeTopicModalButton.onclick = function () {
    topicModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == topicModal) {
        topicModal.style.display = "none";
    }
} 

document.getElementById("topic-modal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const topicInput = document.getElementById("topicInput");

        if (topicInput.value.trim() !==""){
        const topicList = document.getElementById("topicsList");
        const newTopic = document.createElement("li");
        
        //set class to list element
        newTopic.classList.add("kb-topic");

        newTopic.innerHTML = document.getElementById("topicInput").value;
        topicList.appendChild(newTopic);

        topicInput.value = "";
        
        topicModal.style.display = "none";
        }
});