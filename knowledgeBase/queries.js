const BASE_QUERY_PATH = 'knowledgeBase/query/';
let user;

// Query is a object mapping query names to value
const doRequest = async (method, endpoint, query, body) => {
    const url = new URL(`${BASE_QUERY_PATH}${endpoint}.php`, window.location);
    url.search = new URLSearchParams(query).toString();

    let formData;
    if (body) {
        formData = new FormData();
        for ([key, value] of Object.entries(body)) {
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
const getTopicColour = (topicId) =>{
    const hue = ((topicId * 137) + 47) % 360; 
    const hsl = `hsl(${hue},44%,44%)`;

    return hsl;
};

// Display the given topics in the sidebar on the page.
const renderTopics = (topics) => {
    const topicsContainer = document.getElementById('topicsList');

    if (topics.length === 0){
        topicsContainer.innerHTML = '<p>No Topics Available</p>';
        return;
    }

    topicsContainer.innerHTML = '';
    topics.forEach(topic => {
        const hue = ((topic.Topic_ID * 137) + 47) % 360; 
        const hsl = `hsl(${hue},44%,44%)`;

        // Create the HTML for the post
        const topicHTML = `
        <li class="kb-topic" value ="${topic.Topic_Name}" id="topic-${topic.Topic_ID}"> 
        <span class="kb-topic-circle" style="background-color:${getTopicColour(topic.Topic_ID)}"></span> ${topic.Topic_Name}</li>
      `;

        // Append the post HTML to the container
        topicsContainer.insertAdjacentHTML('beforeend', topicHTML);
    });
}

// method to render the Topics to be as items to choose from the dropdown within the add topic modal
const renderTopicsInModal = (topics) => {
    const topicsDropdown = document.querySelector("#topic-modal-dropdown"); // Reference the select element directly
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

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No Posts Available</p>';
        return;
    };
    for (post of posts) {

        let currentUserHtml = '';

        // Only allow editing/deleting of posts if the user is the author or an admin.
        // TODO: If the post is protected don't allow author either.
        if (post.User_ID == user.user_id || user.role == 'admin') {
            currentUserHtml = `
            <button class="kb-edit-post-button black-btn">Edit Post</button>
            <button class="kb-delete-post-button">Delete Post <i class="fa-solid fa-trash"></i></button>
            `;
        }
        
        let currentTypeHtml = '';
        if (post.Type === 'Technical'){
            currentTypeHtml = ` class="kb-badge" style="background-color:hsl(17 ,5% ,10%);" `;
        }
        if (post.Type === 'Non-Technical'){
            currentTypeHtml = `class="kb-badge" style="background-color:hsl(17, 5% ,50%);" `;
        }


        // Create the HTML for the post
        const postHTML = `
      <div class="kb-post" id="post-${post.Post_ID}" data-topic="${post.Topic_Name}" data-type="${post.Type}">
        <div class="kb-title-line">
          <h2 class="kb-title-header">${post.Title}</h2>
          <div class="kb-post-badges">
            <div ${currentTypeHtml} > ${post.Type} </div>
            <div class="kb-badge" style="background-color:${getTopicColour(post.Topic_ID)}">${post.Topic_Name}</div>
          </div>
          <i class="kb-share-link fa-solid fa-link" href="#"></i>
        </div>
        <div class="kb-post-info">
          <div class="kb-post-avatar" style="background-color:${post.Forename + ' ' + post.Surname}">
            <i class="fa-solid fa-user"></i>
          </div>
          <div class="kb-text-sm">
            ${post.Forename} ${post.Surname} | ${formatDate(post.Date_Created)}
          </div>
        </div>
        <div class="kb-post-divider"></div>
        <p class="kb-post-content kb-post-content-shortened">${nl2br(post.Description)}</p>
        <div class="kb-post-buttons">
          <button class="read-post-btn black-btn">Read Post</button>
          ${currentUserHtml}
        </div>
      </div>
    `;

        // Append the post HTML to the container
        postsContainer.insertAdjacentHTML('beforeend', postHTML);
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

    for (post of document.querySelectorAll("#kb-posts-list .kb-post")) {
        const postId = post.id;
        post.querySelector(".read-post-btn").addEventListener("click", () => {
            openPost(postId);
        });

        const editButton = post.querySelector(".kb-edit-post-button");
        if (editButton) {
            editButton.addEventListener("click", () => {
                openEditPostModal(postId);
            });
        }

        const deleteButton = post.querySelector(".kb-delete-post-button");
        if (deleteButton) {
            deleteButton.addEventListener("click", () => {
                openDeletePostModal(postId);
            });
        }

        post.querySelector(".kb-share-link").addEventListener("click", () => {
            sharePost(postId);
        });
    }
}

//on showall btn click will load all posts from db
document.querySelector('#allBtn').addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = null;
    updatePosts();
});

//on techincal button clicked show all post with type of techincal
document.querySelector('#technicalBtn').addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = 'Technical';
    updatePosts();
});

//on techincal button clicked show all post with type of non-techincal
document.querySelector('#nonTechnicalBtn').addEventListener('click', (event) => {
    document.querySelectorAll('.post-type-btns button').forEach(topic => topic.classList.remove('active'));
    event.target.classList.add('active');
    selectedType = 'Non-Technical';
    updatePosts();
});

// Update selected posts when the search bar is used
document.getElementById('searched-post').addEventListener("input", async (e) =>{
    selectedQuery = e.target.value.trim();
    updatePosts();
});


//on topic item clicked it will show all posts of specified under that topic
document.querySelector('#topicsList').addEventListener('click', (event) => {
    clickedTopic = event.target;
    if (!clickedTopic.classList.contains('kb-topic')) {
        return;
    };

    if (clickedTopic.classList.contains('kb-active')) {
        clickedTopic.classList.remove('kb-active');
        selectedTopic = null;
    } else {
        document.querySelectorAll('.kb-topic').forEach(topic => topic.classList.remove('kb-active'));
        clickedTopic.classList.add('kb-active');
        selectedTopic = clickedTopic.getAttribute('value');
    }
    updatePosts();
});

var selectedTopicQuery = null;

const updateTopics = async () => {
    await fetchTopics(selectedTopicQuery).then(renderTopics);
}

// on submission of the add post form add the new post to the knowledgebase db
document.getElementById('add-post-btn').addEventListener('click', (event) => {
    event.preventDefault();

    //gather data from the form
    const title = document.getElementById('postInput').value;
    const content = document.getElementById('contentInput').value;
    const type = document.getElementById('type-dropdown').value;
    const topic = document.getElementById('topic-modal-dropdown').value;
    const visibility = document.getElementById('visibility-dropdown').value;

    //pass form data into addpost sql query
    doRequest("POST", "addPost", {}, {
        'title': title,
        'content': content,
        'type': type,
        'topic': topic,
        'visibility': visibility
    })
        .then((data) => {
            //once form successfully submitted alert the user and reset the form
            alert('Post added successfully!');
            updatePosts();
        })
    // need to add validation to the form ...
});


const makeModal = (modalId) => {
    const modal = document.getElementById(modalId);

    closeBtn = modal.querySelector('.close-modal-btn');
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
const [closeAddPostModal, openAddPostModal] = makeModal('post-modal');

const addPostBtn = document.querySelector('#new-post-btn');
addPostBtn.addEventListener('click', () => {
    openAddPostModal();
});

//Add topic Modal functionality
const [closeAddTopicModal, openAddTopicModal] = makeModal('topic-modal');

const addTopicBtn = document.querySelector('#new-topic-btn');
const submitTopicBtn = document.querySelector('#add-topic-btn');

addTopicBtn.addEventListener('click', () => {
    openAddTopicModal();
});

submitTopicBtn.addEventListener('click', async (event) => {
    //get topic name from form
    const newTopic = document.getElementById('topicInput').value;

    //pass data from form to addtopic sql query
    await doRequest("POST", "addTopic", {}, {name: newTopic});
    await updateTopics();
    await fetchTopics().then(renderTopicsInModal);

    alert('Topic added successfully! ');
});

//topic search bar functionality
document.getElementById('searched-topic').addEventListener("input", async (e) =>{
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
        title: document.getElementById(postId).querySelector(".kb-title-header").innerText,
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
    await fetchTopics().then(renderTopicsInModal);
};