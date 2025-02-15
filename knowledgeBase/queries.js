"use strict";
const BASE_QUERY_PATH = 'knowledgeBase/query/';
let user;

// #region API Request functions

// Helper function to send requests to the server easily, and handle any errors.
// Parameters:
// - method: The HTTP method to use (e.g. "GET", "POST").
// - endpoint: The endpoint to send the request to (e.g. "getUser").
// - query: An object containing the query parameters to send with the request as a key value mapping.
// - body: An object containing the body of the request as a key value mapping
const doRequest = async (method, endpoint, query, body) => {
    const url = new URL(`${BASE_QUERY_PATH}${endpoint}.php`, window.location);
    url.search = new URLSearchParams(query).toString();

    // We use form data for POST requests, so build the form data object if we have a body.
    let formData;
    if (body) {
        formData = new FormData();
        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value);
        }
    }

    const response = await fetch(url,
        {
            method: method,
            body: formData,
        }
    );

    // If the response is not OK, display an error message.
    if (!response.ok) {
        sendToast('An unexpected error occurred. Please try again later.');
        throw new Error(`An unexpected error occurred. Please try again later. Response: ${response.status} ${response.statusText}`);
    }

    // All responses are JSON, so parse the response body as JSON.
    const data = await response.json();
    return data;
}

// Get the current user from the server.
const getUser = async () => {
    user = await doRequest("GET", 'getUser', {});
    return user;
};

// Fetch posts from the server.
// Parameters:
// - topic: The topic to filter the posts by, or null to get all topics.
// - type: The type of post to filter by, or null to get all types.
// - query: A search query to filter the posts by, or null to get all posts.
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

// Edit the post with the given postId, setting the title, content, type, topic, and visibility.
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

// Fetch topics from the server based on the search query given, or null to get all topics.
const fetchTopics = async (query) => {
    const params = {};
    if (query) {
        params.query = query;
    }
    return await doRequest("GET", 'getTopics', params);
};

// #endregion

// #region Helper Functions

// Helper function to convert an ID to a colour.
const getColourFromID = (id) => {
    // This is a simple function to generate seemingly random but consistent colours based on an ID.
    // The values 137 and 47 are arbitrary prime numbers that were chosen because they look good.
    const hue = ((id * 137) + 47) % 360;

    // Use HSL so we can keep the saturation and lightness consistent.
    // This will ensure that the colours are all different, but still look good together and
    // don't clash with colours on the rest of the site.
    const hsl = `hsl(${hue},44%,44%)`;

    return hsl;
};

// Helper function to convert the date time from database to a more readable form
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

// Helper function to handle simple modal creation and display.
// Takes the modal element as an argument and returns an array containing the close and open functions.
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
// #endregion

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
        topicElement.querySelector('.kb-topic-circle').style.backgroundColor = getColourFromID(topic.Topic_ID);
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

// Method to render the Topics to be as items to choose from the dropdown within the add topic modal.
const renderTopicsInDropdown = (topics, dropdownElement, topicsListElement, selectedTopicElement) => {
    topicsListElement.innerHTML = '';

    for (const topic of topics) {
        // Create the HTML for the topic
        const topicElement = document.createElement('a');
        topicElement.setAttribute('value', topic.Topic_Name);
        topicElement.setAttribute('id', `topic-${topic.Topic_ID}`);
        topicElement.textContent = topic.Topic_Name;


        // Append the topic element to the container
        topicsListElement.appendChild(topicElement);

        // Add event listener to the topic element
        const topicName = topic.Topic_Name;
        topicElement.addEventListener('click', () => {
            selectedTopicElement.innerText = topicName;
            selectedTopicElement.value = topicName;
            dropdownElement.classList.toggle("show");
        });
    };
};


// Method to render the given knowledge base posts to the page, and add all
// necessary event listeners to the posts.
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

        if (
            // Allow editing/deletion by the author if the post is not protected...
            (post.User_ID === user.user_id && post.Is_Protected !== "1") ||
            // ...or if the user is an admin.
            user.role === 'Admin'
        ) {
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

        let lock = ''
        if (post.Is_Protected === "1") {
            lock = '<i class="fa-solid fa-lock"></i>'
        }

        // Create the HTML for the post
        const postHTML = `
      <div class="kb-post kb-flex-col" id="post-${post.Post_ID}" data-id="${post.Post_ID}" data-topic="${post.Topic_Name}" data-type="${post.Type}">
        <div class="kb-flex-row kb-flex-wrap">
          <h2 class="kb-title-header">${post.Title} ${lock}</h2>
          <div class="kb-flex-row kb-flex-wrap kb-post-badges">
            <div ${currentTypeHtml} > ${post.Type} </div>
            <div class="kb-badge" style="background-color:${getColourFromID(post.Topic_ID)}">${post.Topic_Name}</div>
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
        <div class="kb-post-content kb-post-content-shortened">${marked.parse(post.Description)}</div>
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
                editPostModal.querySelector("#kb-edit-post-title-input").value = post.Title
                editPostModal.querySelector("#kb-edit-post-content-input").value = post.Description
                editPostModal.querySelector("#kb-edit-post-type-input").value = post.Type
                editPostModal.querySelector("#kb-edit-post-topic-input").value = post.Topic_Name
                editPostModal.querySelector("#kb-edit-post-topic-input").innerText = post.Topic_Name
                editPostModal.querySelector("#kb-edit-post-visibility-input").value = post.Visibility
                editPostModal.querySelector("#kb-edit-post-protected-input").value = post.Is_Protected
                openEditPostModal();
            });
        }
    }
}

// These variables allow the user to filter the posts by topic, type, and search query.
// null represents that the user has not selected a filter for that category.
var selectedTopic = null;
var selectedType = null;
var selectedQuery = null;

// Method to update the posts displayed on the page based on the selected filters.
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

// #region Filter Posts by Type

const typeShowAllBtn = document.getElementById('kb-type-showall-btn');
const typeTechnicalBtn = document.getElementById('kb-type-technical-btn');
const typeNonTechnicalBtn = document.getElementById('kb-type-nontechnical-btn');

// Handling for filtering posts by post type.
const selectTypeButton = (typeName) => {
    typeShowAllBtn.classList.remove('active');
    typeTechnicalBtn.classList.remove('active');
    typeNonTechnicalBtn.classList.remove('active');

    if (typeName === 'ShowAll') {
        typeShowAllBtn.classList.add('active');
        selectedType = null;
    } else if (typeName === 'Technical') {
        typeTechnicalBtn.classList.add('active');
        selectedType = 'Technical';
    } else if (typeName === 'Non-Technical') {
        typeNonTechnicalBtn.classList.add('active');
        selectedType = 'Non-Technical';
    }
    updatePosts();
}

typeShowAllBtn.addEventListener('click', () => selectTypeButton('ShowAll'));
typeTechnicalBtn.addEventListener('click', () => selectTypeButton('Technical'));
typeNonTechnicalBtn.addEventListener('click', () => selectTypeButton('Non-Technical'));

// #endregion

// #region Search Posts by Title

const postTitleSearchInput = document.getElementById('kb-post-title-search');

// Event handler to update the posts displayed when the user types in the search bar.
postTitleSearchInput.addEventListener("input", async (e) => {
    // Trim the search query to remove any leading or trailing whitespace.
    selectedQuery = e.target.value.trim();
    updatePosts();
});
// #endregion

// #region Filter Posts by Topic

// Event handler to update the posts displayed when the user selects a topic.
document.getElementById('searched-topic').addEventListener("input", async (e) => {
    // Trim the search query to remove any leading or trailing whitespace.
    selectedTopicQuery = e.target.value.trim();
    updateTopicsFilter();
});

var selectedTopicQuery = null;
const updateTopicsFilter = async () => {
    const filteredTopics = await fetchTopics(selectedTopicQuery);
    renderTopics(filteredTopics);
}

// #endregion

// #region Add Post Modal
const addPostModal = document.getElementById('add-post-modal');
const [closeAddPostModal, openAddPostModal] = makeModal(addPostModal);

const addPostBtn = document.getElementById('new-post-btn');
addPostBtn.addEventListener('click', () => {
    openAddPostModal();
});

const submitAddPostModalBtn = document.getElementById('kb-add-post-submit-btn');
// on submission of the add post form add the new post to the knowledgebase db
submitAddPostModalBtn.addEventListener('click', async (event) => {
    // Helper function to get the value of an input field.
    const getValue = (id) => { return document.getElementById(id).value; }

    // Send post creation request to the server.
    const data = await doRequest("POST", "addPost", {}, {
        'title': getValue('kb-new-post-title'),
        'content': getValue('kb-new-post-content-input'),
        'type': getValue('kb-new-post-type-input'),
        'topic': getValue('kb-new-post-topic-input'),
        'visibility': getValue('kb-new-post-visibility-input'),
        'protected': getValue('kb-new-post-protected-input')
    });

    sendToast('Post added successfully!');
    await updatePosts();
    closeAddPostModal();
});
// #endregion

// #region Edit Post Modal
const editPostModal = document.getElementById('edit-post-modal');
var [closeEditPostModal, openEditPostModal] = makeModal(editPostModal);

document.getElementById("kb-edit-post-submit-btn").addEventListener("click", async () => {
    const getValue = (id) => { return document.getElementById(id).value; }
    const postID = editPostModal.getAttribute("data-post-id")
    // Send post creation request to the server.
    const data = await doRequest("POST", "editPost", {}, {
        'id': postID,
        'title': getValue('kb-edit-post-title-input'),
        'content': getValue('kb-edit-post-content-input'),
        'type': getValue('kb-edit-post-type-input'),
        'topic': getValue('kb-edit-post-topic-input'),
        'visibility': getValue('kb-edit-post-visibility-input'),
        'protected': getValue('kb-edit-post-protected-input')
    });

    sendToast('Post edited successfully!');
    await updatePosts();

    closeEditPostModal();
})

// #endregion

// #region Delete Post Modal
const deletePostModal = document.getElementById('delete-post-modal');
var [closeDeletePostModal, openDeletePostModal] = makeModal(deletePostModal);

document.getElementById('kb-delete-post-modal-confirm').addEventListener('click', async () => {
    //need to find a way to actaully get the post id
    const deletedElement = document.getElementById('delete-post-modal');
    const postId = deletedElement.getAttribute('deleted-post-id');

    const response = await doRequest("GET", "deletePost", { postId }, null);

    sendToast('Topic deleted successfully!');

    closeDeletePostModal();
    // Remove the deleted post from the DOM
    const postElement = document.querySelector(`.kb-post[data-id='${postId}']`);
    if (postElement) postElement.remove();

});

// #endregion

// #region Add Topic Modal
const addTopicModal = document.getElementById('add-topic-modal');
const [closeAddTopicModal, openAddTopicModal] = makeModal(addTopicModal);

const submitTopicBtn = document.getElementById('kb-add-topic-modal-submit');
submitTopicBtn.addEventListener('click', async (event) => {
    //get topic name from form
    const newTopic = document.getElementById('kb-add-topic-modal-name-input').value;

    //pass data from form to addtopic sql query
    await doRequest("POST", "addTopic", {}, { name: newTopic });
    await refreshTopics();

    sendToast('Topic added successfully!');
    closeAddTopicModal();
});

const filtersAddTopicBtn = document.getElementById('kb-filters-add-topic');
const addPostAddTopicBtn = document.getElementById('kb-new-post-topic-add-topic');
const editPostAddTopicBtn = document.getElementById('kb-edit-post-topic-add-topic');

filtersAddTopicBtn.addEventListener('click', openAddTopicModal);
addPostAddTopicBtn.addEventListener('click', openAddTopicModal);
editPostAddTopicBtn.addEventListener('click', openAddTopicModal);

// #endregion

// #region Read Post Screen Functionality

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
    console.log(post.querySelector(".kb-post-content").innerHTML);

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

backBtn.addEventListener("click", () => {
    closePost();
});

// #endregion

// #region Share Post Functionality
const sharePost = (postId) => {
    const params = new URLSearchParams(window.location.search);
    params.set("post", postId);
    const shareData = {
        title: document.getElementById(postId).querySelector(".kb-title-header").value,
        url: `${window.location.origin}${window.location.pathname}?${params.toString()}`,
    };
    navigator.share(shareData);
}
// #endregion

// #region Topic Selection Dropdown Menu

document.querySelector("#kb-post-view .kb-share-link").addEventListener("click", () => {
    sharePost(getCurrentPost())
});

const makeTopicDropdown = (dropdownButton, dropdownSearch, dropdown, dropdownElements) => {
    // When the dropdown button is clicked, show the dropdown.
    dropdownButton.addEventListener("click", (event) => {
        console.log("clicked");
        dropdown.classList.toggle("show");
    });

    // Close the dropdown if the user clicks outside of it.
    document.addEventListener("click", (event) => {
        if (!event.target.closest('.task-dropdown')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });

    // Filter the dropdown elements based on the search query.
    dropdownSearch.addEventListener("keyup", (event) => {
        const searchQuery = dropdownSearch.value.toUpperCase();
        for (topicElement of dropdownElements.getElementsByTagName("a")) {
            if (topicElement.innerText.toUpperCase().includes(searchQuery)) {
                topicElement.style.display = "";
            } else {
                topicElement.style.display = "none";
            }
        }
    })
};

const addPostTopicDropdownBtn = document.getElementById("kb-new-post-topic-input");
const addPostTopicDropdownSearch = document.getElementById("kb-new-post-topic-dropdown-search-input");
const addPostTopicDropdown = document.getElementById("kb-new-post-topic-dropdown");
const addPostTopicDropdownElements = document.getElementById("kb-new-post-topic-dropdown-elements");

makeTopicDropdown(
    addPostTopicDropdownBtn,
    addPostTopicDropdownSearch,
    addPostTopicDropdown,
    addPostTopicDropdownElements,
)

const editPostTopicDropdownBtn = document.getElementById("kb-edit-post-topic-input");
const editPostTopicDropdownSearch = document.getElementById("kb-edit-post-topic-dropdown-search-input");
const editPostTopicDropdown = document.getElementById("kb-edit-post-topic-dropdown");
const editPostTopicDropdownElements = document.getElementById("kb-edit-post-topic-dropdown-elements");

makeTopicDropdown(
    editPostTopicDropdownBtn,
    editPostTopicDropdownSearch,
    editPostTopicDropdown,
    editPostTopicDropdownElements,
)

const refreshTopics = async () => {
    await updateTopicsFilter();

    const topics = await fetchTopics();
    renderTopicsInDropdown(topics, addPostTopicDropdown, addPostTopicDropdownElements, addPostTopicDropdownBtn)
    renderTopicsInDropdown(topics, editPostTopicDropdown, editPostTopicDropdownElements, editPostTopicDropdownBtn)
};

// #endregion

// #region Markdown Preview Tabbed Menu
const makeTabbedMarkdownInput = (markdownInputBtn, markdownPreviewBtn, markdownInput, markdownPreview) => {
    markdownInputBtn.addEventListener("click", () => {
        markdownInputBtn.classList.add("active");
        markdownPreviewBtn.classList.remove("active");
        markdownInput.style.display = "block";
        markdownPreview.style.display = "none";
    });

    markdownPreviewBtn.addEventListener("click", () => {
        markdownInputBtn.classList.remove("active");
        markdownPreviewBtn.classList.add("active");
        markdownInput.style.display = "none";
        markdownPreview.style.display = "block";
        markdownPreview.innerHTML = marked.parse(markdownInput.value);
    });
};

const addPostMarkdownInputBtn = document.getElementById("kb-new-post-write-btn");
const addPostmarkdownPreviewBtn = document.getElementById("kb-new-post-preview-btn");

const addPostmarkdownInput = document.getElementById("kb-new-post-content-input");
const addPostmarkdownPreview = document.getElementById("kb-new-post-content-preview");

makeTabbedMarkdownInput(addPostMarkdownInputBtn, addPostmarkdownPreviewBtn, addPostmarkdownInput, addPostmarkdownPreview);

const editPostMarkdownInputBtn = document.getElementById("kb-edit-post-write-btn");
const editPostmarkdownPreviewBtn = document.getElementById("kb-edit-post-preview-btn");

const editPostmarkdownInput = document.getElementById("kb-edit-post-content-input");
const editPostmarkdownPreview = document.getElementById("kb-edit-post-content-preview");

makeTabbedMarkdownInput(editPostMarkdownInputBtn, editPostmarkdownPreviewBtn, editPostmarkdownInput, editPostmarkdownPreview);
// #endregion

// #region Code to run on page load
window.onload = async () => {
    // Get the current user, so permissions are known and correct buttons etc can be displayed.
    user = await getUser();

    // Load posts and topics from the server.
    await updatePosts();
    if (currentPost) {
        // This runs after the posts have been loaded, so the necessary data is available.
        openPost(currentPost);
    }
    await updateTopicsFilter();
    await refreshTopics();
};
// #endregion