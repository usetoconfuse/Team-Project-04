const BASE_QUERY_PATH = 'knowledgeBase/query/';

// Query is a object mapping query names to value
const doRequest = async (method, endpoint, query, body) => {
    const url = new URL(`${BASE_QUERY_PATH}${endpoint}.php`, window.location);
    url.search = new URLSearchParams(query).toString();
    try {
        const response = await fetch(url,
            {
                method: method,
                body: body,
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

// fetch method for getting ALL posts with no constraints 
const fetchPosts = async (topic, type) => {
    const query = {};
    if (topic) {
        query.topic = topic;
    }
    if (type) {
        query.type = type;
    }
    return await doRequest("GET", 'getPosts', query);
};

//method to get all the topics within the DB
const fetchAllTopics = async () => {
    return await doRequest("GET", 'getAllTopics');
};

//method to render the Topic items and load them onto the right side of the page in the topic list
const renderAllTopics = (topics) => {
    const topicsContainer = document.getElementById('topicsList');
    topicsContainer.innerHTML = '';

    topics.forEach(topic => {

        // Create the HTML for the post
        const topicHTML = `
        <li class="kb-topic" value ="${topic.Topic_Name}" id="topic-${topic.Topic_ID}"> 
        <span class="kb-topic-circle"></span> ${topic.Topic_Name}</li>
      `;

        // Append the post HTML to the container
        topicsContainer.insertAdjacentHTML('beforeend', topicHTML);
    });
}

// method to render the Topics to be as items to choose from the dropdown within the add topic modal
const renderAllTopicsModal = (topics) => {
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
const renderAllPosts = (posts) => {
    const postsContainer = document.getElementById('kb-posts-list');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const currentUserHtml = '';
        // Check if the current user is the author (you may need to adjust this logic based on your actual user authentication)
        if (post.Forename + ' ' + post.Surname === 'John Little') {
            currentUserHtml = `
        <button class="black-btn">Edit Post</button>
        <button class="kb-delete-post-button">Delete Post <i class="fa-solid fa-trash"></i></button>
      `;
        }

        // Create the HTML for the post
        const postHTML = `
      <div class="kb-post" id="post-${post.Post_ID}" data-topic="${post.Topic_Name}" data-type="${post.Type}">
        <div class="kb-title-line">
          <h2 class="kb-title-header">${post.Title}</h2>
          <div class="kb-post-badges">
            <div class="kb-badge" style="background-color:var(--tertiary-colour);">${post.Type}</div>
            <div class="kb-badge" style="background-color:${post.Topic_Name}">${post.Topic_Name}</div>
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
    });
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

const updatePosts = () => {
    console.log('Updating posts', selectedTopic, selectedType);
    fetchPosts(selectedTopic, selectedType).then(renderAllPosts);
}

window.onload = () => {
    updatePosts();
    fetchAllTopics().then(renderAllTopics);
};



//on showall btn click will load all posts from db
document.querySelector('#allBtn').addEventListener('click', () => {
    selectedType = null;
    updatePosts();
});

//on techincal button clicked show all post with type of techincal
document.querySelector('#technicalBtn').addEventListener('click', () => {
    selectedType = 'Technical';
    updatePosts();
});

//on techincal button clicked show all post with type of non-techincal
document.querySelector('#nonTechnicalBtn').addEventListener('click', () => {
    selectedType = 'Non-Technical';
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
        clickedTopic.classList.add('kb-active');
        selectedTopic = clickedTopic.getAttribute('value');
    }
    updatePosts();
});

// on the topic dropdown click load all topics from DB as values to select 
document.querySelector('#topic-modal-dropdown').addEventListener('click', () => {
    fetchAllTopics().then(renderAllTopicsModal);
});

// on submission of the add post form add the new post to the knowledgebase db
document.getElementById('add-post-btn').addEventListener('click', (event) => {
    event.preventDefault();

    //gather data from the form
    const title = document.getElementById('postInput').value;
    const content = document.getElementById('contentInput').value;
    const type = document.getElementById('type-dropdown').value;
    const topic = document.getElementById('topic-modal-dropdown').value;
    const visibility = document.getElementById('visibility-dropdown').value;

    //create a FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('type', type);
    formData.append('topic', topic);
    formData.append('visibility', visibility);

    //pass form data into addpost sql query
    doRequest("POST", "addPost", {}, formData)
        .then((data) => {
            //once form successfully submitted alert the user and reset the form
            console.log('Post submitted:', data);
            alert('Post added successfully!');
            document.getElementById('post-modal-form').reset();
        })
    // need to add validation to the form ...
});

//on submission of add topic form add the new topic to the topics table
document.getElementById('add-topic-btn').addEventListener('click', (event) => {
    event.preventDefault();
    //get topic name from form
    const newTopic = document.getElementById('topicInput').value;

    const formData = new FormData();
    formData.append('name', newTopic);

    //pass data from form to addtopic sql query
    doRequest("POST", "addTopic", {}, formData)
        .then((data) => {
            //once form successfully submitted alert user and reset form
            console.log('Topic added:', data);
            alert('Topic added successfully! ');
            document.getElementById('topic-modal-form').reset();
        })

    //ensure that the new topic is in the right html form
    fetchAllTopics().then(renderAllTopicsModal);
    //location.reload();
});