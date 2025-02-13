"use strict";
const BASE_QUERY_PATH = 'knowledgeBase/query/';
let user;

// Query is a object mapping query names to value
const doRequest = async (method, endpoint, query, body) => {
    const url = new URL(`${BASE_QUERY_PATH}${endpoint}.php`, window.location);
    url.search = new URLSearchParams(query).toString();

    let formData;
    if (body) {
        formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value);
        }
    }

    try {
        const response = await fetch(url,
            {
                method: method,
                body: formData,
            }
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error processing request ", error);
    }
}

const getUser = async () => {
    user = await doRequest("GET", 'getUser', {});
    return user;
};

// fetch method for getting ALL posts with no constraints 
const fetchPosts = async (topic, type, query) => {
    const params = {};
    if (topic) {
        params.topic = topic;
    }
    if (type) {
        params.type = type;
    }
    if (query) {
        params.query = query;
    }
    return await doRequest("GET", 'getPosts', params);
};

const editPost = async (postId, title, content, type, topic, visibility) => {
    return await doRequest("POST", 'editPost', {}, {
        'postId': postId,
        'title': title,
        'content': content,
        'type': type,
        'topic': topic,
        'visibility': visibility
    });
};

//method to get all the topics within the DB
const fetchTopics = async (query) => {
    const params = {};
    if (query) {
        params.query = query;
    }
    return await doRequest("GET", 'getTopics', params);
};

//helped colour formula methdo
const getTopicColour = (topicId) => {
    const hue = ((topicId * 137) + 47) % 360;
    const hsl = `hsl(${hue},44%,44%)`;

    return hsl;
};

// Display the given topics in the sidebar on the page.
const renderTopics = (topics) => {
    const topicsContainer = document.getElementById('kb-topics-list');

    if (topics.length === 0) {
        topicsContainer.innerHTML = '<p>No Topics Available</p>';
        return;
    }

    topicsContainer.innerHTML = '';
    const topicTemplate = document.getElementById('kb-topic-list-item-template');
    for (const topic of topics) {
        const topicElement = topicTemplate.content.cloneNode(true).querySelector('li');

        topicElement.setAttribute('value', topic.Topic_Name);
        topicElement.setAttribute('id', `topic-${topic.Topic_ID}`);
        topicElement.querySelector('.kb-topic-circle').style.backgroundColor = getTopicColour(topic.Topic_ID);
        topicElement.querySelector('p').innerText = topic.Topic_Name;

        topicsContainer.appendChild(topicElement);

        topicElement.addEventListener('click', () => {
            if (topicElement.classList.contains('kb-active')) {
                topicElement.classList.remove('kb-active');
                selectedTopic = null;
            } else {
                document.querySelectorAll('.kb-topic').forEach(topic => topic.classList.remove('kb-active'));
                topicElement.classList.add('kb-active');
                selectedTopic = topicElement.getAttribute('value');
            }
            updatePosts();
        });
    };
}

// method to render the Topics to be as items to choose from the dropdown within the add topic modal
const renderTopicsInDropdown = (topics, topicsDropdown) => {
    topicsDropdown.innerHTML = '';

    // Add the default placeholder option
    const placeholderOption = `<option value="" selected disabled hidden>Choose</option>`;
    topicsDropdown.insertAdjacentHTML('beforeend', placeholderOption);

    topics.forEach(topic => {

        // Create the HTML for the post
        const topicHTML = `
        <option value="${topic.Topic_Name}" id="topic-${topic.Topic_ID}"> ${topic.Topic_Name} </option>
      `;
        // Append the post HTML to the container
        topicsDropdown.insertAdjacentHTML('beforeend', topicHTML);
    });
};


//general method to renderAllposts to load them onto the page - REUSABLE
const renderAllPosts = async (posts) => {
    const postsContainer = document.getElementById('kb-posts-list');
    postsContainer.innerHTML = '';
    const editPostModal = document.getElementById('edit-post-modal');

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No Posts Available</p>';
        return;
    };
    for (const post of posts) {
        const postID = post.Post_ID;
        let currentUserHtml = '';

        // Only allow editing/deleting of posts if the user is the author or an admin.
        // TODO: If the post is protected don't allow author either.
        if (post.User_ID == user.user_id || user.role == 'admin') {
            currentUserHtml = `
            <button class="kb-edit-post-button black-btn">Edit Post</button>
            <button class="kb-delete-post-button red-btn">Delete Post <i class="fa-solid fa-trash"></i></button>
            `;
        }

        let currentTypeHtml = '';
        if (post.Type === 'Technical') {
            currentTypeHtml = ` class="kb-badge" style="background-color:hsl(17 ,5% ,10%);" `;
        }
        if (post.Type === 'Non-Technical') {
            currentTypeHtml = `class="kb-badge" style="background-color:hsl(17, 5% ,50%);" `;
        }


        // Create the HTML for the post
        const postHTML = `
      <div class="kb-post kb-flex-col" id="post-${post.Post_ID}" data-id="${post.Post_ID}" data-topic="${post.Topic_Name}" data-type="${post.Type}">
        <div class="kb-flex-row kb-flex-wrap">
          <h2 class="kb-title-header">${post.Title}</h2>
          <div class="kb-flex-row kb-flex-wrap kb-post-badges">
            <div ${currentTypeHtml} > ${post.Type} </div>
            <div class="kb-badge" style="background-color:${getTopicColour(post.Topic_ID)}">${post.Topic_Name}</div>
          </div>
          <i class="kb-share-link fa-solid fa-link" href="#"></i>
        </div>
        <div class="kb-post-info kb-flex-row">
          <div class="kb-post-avatar" style="background-color:${post.Forename + ' ' + post.Surname}">
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="kb-text-sm">
            ${post.Forename} ${post.Surname} | ${formatDate(post.Date_Created)}
          </div>
        </div>
        <div class="kb-post-divider"></div>
        <p class="kb-post-content kb-post-content-shortened">${nl2br(post.Description)}</p>
        <div class="kb-flex-row kb-post-buttons">
          <button class="read-post-btn black-btn">Read Post</button>
          ${currentUserHtml}
        </div>
      </div>
    `;

        // Append the post HTML to the container
        postsContainer.insertAdjacentHTML('beforeend', postHTML);

        const postElement = document.getElementById(`post-${post.Post_ID}`);

        const editButton = postElement.querySelector(".kb-edit-post-button");
        if (editButton) {
            editButton.addEventListener("click", () => {
                editPostModal.setAttribute("data-post-id", post.Post_ID);
                editPostModal.querySelector("#edit-post-title-input").value = post.Title
                editPostModal.querySelector("#edit-post-content-input").value = post.Description
                editPostModal.querySelector("#edit-post-type-input").value = post.Type
                editPostModal.querySelector("#edit-post-topic-input").value = post.Topic_Name
                editPostModal.querySelector("#edit-post-visibility-input").value = post.Visibility
                openEditPostModal();
            });
        }
    }
}

// Helper function to convert newline characters to HTML line breaks
const nl2br = (str) => {
    return str.replace(/\n/g, '<br>');
};

//helper function to convert the date time from database to a more readable form
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleString('en-GB', options);
};

//when the webpage loads all the posts and topics will be loaded onto the webpage from db

var selectedTopic = null;
var selectedType = null;
var selectedQuery = null;

const updatePosts = async () => {
    const posts = await fetchPosts(selectedTopic, selectedType, selectedQuery).then(renderAllPosts);

    for (const post of document.querySelectorAll("#kb-posts-list .kb-post")) {
        const postId = post.id;


        post.querySelector(".read-post-btn").addEventListener("click", () => {
            openPost(postId);
        });

        const deleteButton = post.querySelector(".kb-delete-post-button");
        if (deleteButton) {
            deleteButton.addEventListener("click", (event) => {
                const postElement = event.target.closest(".kb-post");
                let postId = postElement.getAttribute("data-id");
                console.log(`post id is : ${postId}`);
                const deleteElement = document.getElementById('delete-post-modal');
                deleteElement.setAttribute('deleted-post-id', postId)
                openDeletePostModal(postId);
            });
        }

        post.querySelector(".kb-share-link").addEventListener("click", () => {
            sharePost(postId);
        });
    }
}

//on showall btn click will load all posts from db
document.getElementById("kb-type-showall-btn").addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = null;
    updatePosts();
});

//on techincal button clicked show all post with type of techincal
document.getElementById('kb-type-technical-btn').addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = 'Technical';
    updatePosts();
});

//on techincal button clicked show all post with type of non-techincal
document.getElementById('kb-type-nontechnical-btn').addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = 'Non-Technical';
    updatePosts();
});

// Update selected posts when the search bar is used
document.getElementById('searched-post').addEventListener("input", async (e) => {
    selectedQuery = e.target.value.trim();
    updatePosts();
});

var selectedTopicQuery = null;
const updateTopics = async () => {
    await fetchTopics(selectedTopicQuery).then(renderTopics);
}

const makeModal = (modal) => {
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const openModal = () => {
        modal.style.display = 'flex';
    }
    const closeModal = () => {
        modal.style.display = 'none';
    }
    return [closeModal, openModal];
}

//Add Post Modal Functionality
const addPostModal = document.getElementById('add-post-modal');
const [closeAddPostModal, openAddPostModal] = makeModal(addPostModal);

const addPostBtn = document.querySelector('#new-post-btn');
addPostBtn.addEventListener('click', () => {
    openAddPostModal();
});

const submitAddPostModalBtn = document.getElementById('add-post-btn');
// on submission of the add post form add the new post to the knowledgebase db
submitAddPostModalBtn.addEventListener('click', async (event) => {
    // Helper function to get the value of an input field.
    const getValue = (id) => { return addPostModal.querySelector(`#${id}`).value; }

    // Send post creation request to the server.
    const data = await doRequest("POST", "addPost", {}, {
        'title': getValue('postInput'),
        'content': getValue('contentInput'),
        'type': getValue('type-dropdown'),
        'topic': getValue('topic-modal-dropdown'),
        'visibility': getValue('visibility-dropdown')
    });

    alert('Post added successfully!');
    await updatePosts();
    closeAddPostModal();
});

// Edit Post Modal
const editPostModal = document.getElementById('edit-post-modal');
var [closeEditPostModal, openEditPostModal] = makeModal(editPostModal);

document.getElementById("kb-edit-post-submit-btn").addEventListener("click", async () => {
    const getValue = (id) => { return editPostModal.querySelector(`#${id}`).value; }
    const postID = editPostModal.getAttribute("data-post-id")
    // Send post creation request to the server.
    const data = await doRequest("POST", "editPost", {}, {
        'id': postID,
        'title': getValue('edit-post-title-input'),
        'content': getValue('edit-post-content-input'),
        'type': getValue('edit-post-type-input'),
        'topic': getValue('edit-post-topic-input'),
        'visibility': getValue('edit-post-visibility-input')
    });

    alert('Post edited successfully!');
    await updatePosts();

    closeEditPostModal();
})


// Delete Post Modal
const deletePostModal = document.getElementById('delete-post-modal');
var [closeDeletePostModal, openDeletePostModal] = makeModal(deletePostModal);

document.getElementById('kb-delete-post-modal-confirm').addEventListener('click', async () => {
    //need to find a way to actaully get the post id
    const deletedElement = document.getElementById('delete-post-modal');
    const postId = deletedElement.getAttribute('deleted-post-id');

    try {
        const response = await doRequest("GET", "deletePost", { postId }, null);
        console.log("Delete response:", response);

        if (response && response.success) {
            console.log("Post deleted successful");
            closeDeletePostModal();
            // Remove the deleted post from the DOM
            const postElement = document.querySelector(`.kb-post[data-id='${postId}']`);
            if (postElement) postElement.remove();

        } else {
            console.error("Failed to delete post", response);
        }
    } catch (error) {
        console.error("Error deleting post:", error);
    }
});


//Add topic Modal functionality
const addTopicModal = document.getElementById('add-topic-modal');
const [closeAddTopicModal, openAddTopicModal] = makeModal(addTopicModal);

const addTopicBtn = document.querySelector('#new-topic-btn');
const submitTopicBtn = document.getElementById('kb-add-topic-modal-submit');

addTopicBtn.addEventListener('click', () => {
    openAddTopicModal();
});

submitTopicBtn.addEventListener('click', async (event) => {
    //get topic name from form
    const newTopic = document.getElementById('kb-add-topic-modal-name-input').value;

    //pass data from form to addtopic sql query
    await doRequest("POST", "addTopic", {}, { name: newTopic });
    await updateTopics();
    await fetchTopics().then((topics) => {
        const newPostTopicsDropdown = document.querySelector("#topic-modal-dropdown");
        const editPostTopicsDropdown = document.getElementById("edit-post-topic-input")
        renderTopicsInDropdown(topics, newPostTopicsDropdown)
        renderTopicsInDropdown(topics, editPostTopicsDropdown)
    });

    alert('Topic added successfully! ');
    closeAddTopicModal();
});

//topic search bar functionality
document.getElementById('searched-topic').addEventListener("input", async (e) => {
    selectedTopicQuery = e.target.value.trim();
    updateTopics();
});

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
        title: document.getElementById(postId).querySelector(".kb-title-header").value,
        url: `${window.location.origin}${window.location.pathname}?${params.toString()}`,
    };
    navigator.share(shareData);
}

document.querySelector("#kb-post-view .kb-share-link").addEventListener("click", () => {
    sharePost(getCurrentPost())
});

//when the page loads fetch all relevant posts and topic from the db onto the page
window.onload = async () => {
    user = await getUser();
    await updatePosts();
    await updateTopics();
    await fetchTopics().then((topics) => {
        const newPostTopicsDropdown = document.querySelector("#topic-modal-dropdown");
        const editPostTopicsDropdown = document.getElementById("edit-post-topic-input")
        renderTopicsInDropdown(topics, newPostTopicsDropdown)
        renderTopicsInDropdown(topics, editPostTopicsDropdown)
    });
};