const getPosts = () => {
    return document.querySelectorAll("#kb-posts-list .kb-post");
};

const getSelectedType = () => {
    const technicalBtn = document.getElementById("technicalBtn");
    const nonTechnicalBtn = document.getElementById("nonTechnicalBtn");

    if (technicalBtn.classList.contains("active")) {
        return "technical";
    } else if (nonTechnicalBtn.classList.contains("active")) {
        return "nonTechnical";
    } else {
        return null;
    }
};

const getSelectedTopic = () => {
    const selectedTopic = document.querySelector("#topicsList .kb-active");
    return selectedTopic ? selectedTopic.getAttribute("data-topic") : null;
};

const filterPosts = () => {
    const selectedType = getSelectedType();
    const selectedTopic = getSelectedTopic();

    getPosts().forEach(post => {
        const postType = post.getAttribute("data-type");
        const postTopic = post.getAttribute("data-topic");

        if ((!selectedType || postType === selectedType) && (!selectedTopic || postTopic === selectedTopic)) {
            post.style.removeProperty("display");
        } else {
            post.style.display = "none";
        }
    });
}


const topicButtons = document.querySelectorAll('#topicsList li');
topicButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains('kb-active')) {
            button.classList.remove('kb-active')
        } else {
            topicButtons.forEach(btn => btn.classList.remove('kb-active'))
            button.classList.add('kb-active')
        }
        filterPosts();
    })
})

const postTypeButtons = document.querySelectorAll('.post-type-btns button');
postTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
        postTypeButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        filterPosts();
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
        newTopicItem.innerHTML = `<span class="kb-topic-circle"></span>${topicInput}`;
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
submitPostBtn.addEventListener('click', () => {
    addPostModal.style.display = 'none';
})


const allPostsView = document.getElementById("kb-all-view");
const postView = document.getElementById("kb-post-view");


const backBtn = document.getElementById("kb-post-back");
const posts = document.querySelectorAll(".kb-post");
const readPostBtns = document.querySelectorAll(".read-post-btn");

const setCurrentPost = (postId) => {
    const params = new URLSearchParams(window.location.search);
    if (postId === null) {
        params.delete("post");
    } else {
        params.set("post", postId);
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

const getCurrentPost = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("post");
}

const openPost = (postId) => {
    setCurrentPost(postId);

    allPostsView.style.display = "none";
    postView.style.removeProperty("display");

    const post = document.getElementById(postId);
    const postDetail = document.getElementById("kb-post-view");

    postDetail.querySelector(".kb-title-header").innerHTML = post.querySelector(".kb-title-header").innerHTML;
    postDetail.querySelector(".kb-post-badges").innerHTML = post.querySelector(".kb-post-badges").innerHTML;
    postDetail.querySelector(".kb-post-info").innerHTML = post.querySelector(".kb-post-info").innerHTML;
    postDetail.querySelector(".kb-post-content").innerHTML = post.querySelector(".kb-post-content").innerHTML;
}

const closePost = () => {
    setCurrentPost(null);

    allPostsView.style.removeProperty("display");
    postView.style.display = "none";
}

getPosts().forEach(post => {
    post.querySelector(".read-post-btn").addEventListener("click", () => {
        openPost(post.id);
    });
});

const currentPost = new URLSearchParams(window.location.search).get("post");
if (currentPost) {
    openPost(currentPost);
}

backBtn.addEventListener("click", () => {
    closePost();
});


const sharePost = (postId) => {
    const params = new URLSearchParams(window.location.search);
    params.set("post", postId);
    const shareData = {
        title: document.getElementById(postId).querySelector(".kb-title-header").innerText,
        url: `${window.location.origin}${window.location.pathname}?${params.toString()}`,
    };
    navigator.share(shareData);
}

getPosts().forEach(post => {
    post.querySelector(".kb-share-link").addEventListener("click", () => {
        sharePost(post.id);
    });
})

document.querySelector("#kb-post-view .kb-share-link").addEventListener("click", () => {
    sharePost(getCurrentPost())
});