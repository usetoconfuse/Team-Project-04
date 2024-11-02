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
let currentTopic = null;
topics.forEach(topic => {
    topic.addEventListener("click", (e) => {
        const selectedTopic = e.target.id; // Get the clicked topic's ID

        if (currentTopic !== null) {
            document.getElementById(currentTopic).classList.remove("kb-active");
        }

        if (currentTopic === selectedTopic) {
            currentTopic = null;
            formPosts.forEach(post => {
                post.style.display = "block";
            });
            return;
        }
        currentTopic = selectedTopic;
        document.getElementById(currentTopic).classList.add("kb-active");

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



//Topic Modal Functionality
const addTopicModal = document.querySelector("#topic-modal");
const closeAddTopicModal = addTopicModal.querySelector('#topic-modal .close-modal-btn')
const addTopicBtn = document.querySelector('#new-topic-btn');

addTopicBtn.addEventListener('click', () => {
    addTopicModal.style.display = 'flex';
  })
  closeAddTopicModal.addEventListener('click', () => {
    addTopicModal.style.display = 'none';
  })
  window.addEventListener('click', (e) => {
    if (e.target == addTopicModal) {
        addTopicModal.style.display = 'none';
    }
  })


const submitTopicBtn = document.querySelector('#topic-modal .task-submit-buttons #add-topic-btn');
submitTopicBtn.addEventListener('click', (e) => {
    const topicInput = document.getElementById("topicInput").value.trim();

    const topicList = document.querySelector("#topicsList");
    if (topicInput !== "") {
        const newTopicItem = document.createElement("li");
        newTopicItem.classList.add("kb-topic");
        newTopicItem.innerHTML = topicInput;
        topicList.appendChild(newTopicItem);

        topicInput.value = "";
        addTopicModal.style.display = "none";
    } else {
        document.querySelector('#topicModal .error-msg').style.display = "block";
    }

})

//Add Post Modal Functionality
const addPostModal = document.querySelector("#post-modal");
const closeAddPostModal = addPostModal.querySelector('#post-modal .close-modal-btn')
const addPostBtn = document.querySelector('#new-post-btn');

addPostBtn.addEventListener('click', () => {
    addPostModal.style.display = 'flex';
  })
  closeAddPostModal.addEventListener('click', () => {
    addPostModal.style.display = 'none';
  })
  window.addEventListener('click', (e) => {
    if (e.target == addPostModal) {
        addPostModal.style.display = 'none';
    }
  })

//For now, it just closes the modal on click of submit btn
const submitPostBtn = document.querySelector('#add-post-btn');
submitPostBtn.addEventListener('click', () =>{
    addPostModal.style.display = 'none';
})


