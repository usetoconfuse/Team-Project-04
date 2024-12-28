// fetch method for getting ALL posts with no constraints 
const fetchAllPosts = async () => {
    try{
        const response = await fetch('kbGetAllPostsQry.php');
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error("error fetching posts ", error);
        return [];
    }
};

// fetch method to get post of specific Type Technical or Non-Technical
const fetchTypePosts = async (type) => {
    try{
        const response = await fetch(`kbGetTypePostsQry.php?type=${encodeURIComponent(type)}`);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error("error fetching posts ", error);
        return [];
    }
};

//method to get all the topics within the DB
const fetchAllTopics = async () => {
    try{
        const response = await fetch('kbGetAllTopicsQry.php');
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error("error fetching posts ", error);
        return [];
    }
};

//method to render the Topic items and load them onto the right side of the page in the topic list
const renderAllTopics = (topics) => {
    const topicsContainer = document.getElementById('topicsList'); 
    topicsContainer.innerHTML = '';
  
    topics.forEach(topic => {

      // Create the HTML for the post
      const topicHTML = `
        <li class="kb-topic" data-topic="${formatTopicNameToTag(topic.Topic_Name)}" id="topic-${topic.Topic_ID}"> 
        <span class="kb-topic-circle"></span> ${topic.Topic_Name}</li>
      `;
  
      // Append the post HTML to the container
      topicsContainer.insertAdjacentHTML('beforeend', topicHTML);
    });
  }


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

//helper function to convert the topic name into a standardised form for the data-topic tag
const formatTopicNameToTag = (topicName) => {
    return topicName.trim().toLowerCase().replaceAll(/\s+/g, '-');
};

//on show all btn click will load all posts from db
document.querySelector('#allBtn').addEventListener('click', () =>{
    fetchAllPosts().then(renderAllPosts);
});

//on techincal button clicked show all post with type of techincal
document.querySelector('#technicalBtn').addEventListener('click', () =>{
    fetchTypePosts('Technical').then(renderAllPosts);
});

//on techincal button clicked show all post with type of non-techincal
document.querySelector('#nonTechnicalBtn').addEventListener('click', () =>{
    fetchTypePosts('Non-Technical').then(renderAllPosts);
});

// on test button clicked show all topics 
document.querySelector('#testBtn1').addEventListener('click', () =>{
    fetchAllTopics().then(renderAllTopics);
});
