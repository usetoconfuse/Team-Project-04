<div class="kb-content" id="kb-all-view">
    <div class="kb-header-section">
        <h1 class="kb-title">Knowledge Base</h1>
        <div class="post-type-btns">
            <button id="kb-type-showall-btn" class="active">Show All</button>
            <button id="kb-type-technical-btn" value="Technical">Technical</button>
            <button id="kb-type-nontechnical-btn" value="Non-Technical">Non-Technical</button>
        </div>
    </div>
    <div class="kb-main">
        <div class="kb-listing kb-flex-col">
            <div class="kb-listing-header kb-flex-row">
                <div class="kb-listing-search">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search Post Content" id="searched-post">
                </div>
                <button id="new-post-btn">
                    New Post
                </button>
            </div>

            <div id="kb-posts-list" class="kb-posts kb-flex-col">
                <!-- Posts are dynamically loaded with JS -->
            </div>
        </div>
        <div class="kb-sidebar">
            <h2>Filter by Topic</h2>
            <div class="kb-listing-search" id="topic-searchbar">
                <i class="fa-solid fa-search"></i>
                <input type="text" placeholder="Search Topics" id="searched-topic">
            </div>
            <template id="kb-topic-list-item-template">
                <li class="kb-topic" value ="[DYNAMIC]" id="[DYNAMIC]"> 
                <span class="kb-topic-circle" style="DYNAMIC"></span> <p>[DYNAMIC]</p>
                </li>
            </template>
            <ul id="kb-topics-list" class="kb-flex-col kb-scrollable">
                <!-- Topics are dynamically loaded with JS -->
            </ul>
            <button id="new-topic-btn">New Topic</button>
        </div>

        <!--Add Topic Modal-->
        <div id="add-topic-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    Add Topic
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="topic-modal-form" class="modal-body">
                    <div>
                        <label for="topic-name">Topic Name: </label>
                        <input type="text" id="kb-add-topic-modal-name-input" name="topic-name"
                            placeholder="Enter new topic name">
                    </div>
                </form>
                <div class="kb-modal-submission-btns">
                    <button id="kb-add-topic-modal-submit">
                        Add Topic
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <!--Add Post Modal-->
        <div id="add-post-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    Add Post
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="post-modal-form" class="modal-body">
                    <div>
                        <label for="postInput">Title :</label>
                        <input type="text" id="postInput" name="title" placeholder="Enter post title">
                    </div>
                    <div>
                        <label for="contentInput">Content :</label>
                        <textarea type="text" id="contentInput" name="content"
                            placeholder="Enter post content"></textarea>
                    </div>
                    <div class="kb-flex-row">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="type-dropdown">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-gear"></i>
                                </div>
                                <select name="type" id="type-dropdown">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-technical</option>
                                </select>
                            </div>
                        </div>
                        <!--topic-->
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="topic-modal-dropdown">Topic :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-comment"></i>
                                </div>
                                <input autocomplete="off" list="topic-modal-dropdown" placeholder="Enter Topic"
                                id="topic-modal-dropdown-input">
                                <datalist name="topic" id="topic-modal-dropdown">
                                    <!--These topics will be retrieved via sql query-->
                                    <option value="" selected disabled hidden>Choose</option>
                                </datalist>
                            </div>
                        </div>
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="visibility-dropdown">Visibility :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="visibility" id="visibility-dropdown">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="All Users">All Users</option>
                                    <!--disabled , will depend on if user or manager logged in-->
                                    <option value="Manager Only" disabled>Manager Only</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="kb-modal-submission-btns">
                    <button class="add-post-btn" id="add-post-btn">
                        Add Post
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <div id="edit-post-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    Edit Post
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="edit-post-modal-form" class="modal-body">
                    <div>
                        <label for="postInput">Title :</label>
                        <input type="text" id="edit-post-title-input" name="title" placeholder="Enter post title">
                    </div>
                    <div>
                        <label for="contentInput">Content :</label>
                        <textarea type="text" id="edit-post-content-input" name="content"
                            placeholder="Enter post content"></textarea>
                    </div>
                    <div class="kb-flex-row">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="type-dropdown">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-gear"></i>
                                </div>
                                <select name="type" id="edit-post-type-input">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-technical</option>
                                </select>
                            </div>
                        </div>
                        <!--topic-->
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="edit-post-topic-input">Topic :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-comment"></i>
                                </div>
                                <select name="topic" id="edit-post-topic-input">
                                    <!--These topics will be retrieved via sql query-->
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="Coding Standards">Coding Standards</option>
                                </select>
                            </div>
                        </div>
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="visibility-dropdown">Visibility :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="visibility" id="edit-post-visibility-input">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="All Users">All Users</option>
                                    <!--disabled , will depend on if user or manager logged in-->
                                    <option value="Manager Only" disabled>Manager Only</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="kb-modal-submission-btns">
                    <button id="kb-edit-post-submit-btn">
                        Edit Post
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <div id="delete-post-modal" deleted-post-id="" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    Delete Post
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <div class="modal-body">
                    Are you sure you want to delete this post?
                </div>
                <div class="kb-modal-submission-btns">
                    <button class="red-btn" id="kb-delete-post-modal-confirm">
                        Delete
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="cancel-delete-post-btn" id="cancel-delete-post-btn">
                        Cancel
                        <i class="fa fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="kb-content" id="kb-post-view" style="display:none;">
    <div class="kb-header-section">
        <h1 class="kb-title">Knowledge Base<span id="kb-post-name"></span></h1>
        <button id="kb-post-back">
            <i class='fa fa-solid fa-arrow-left'></i>
            All Posts
        </button>
    </div>
    <div class="kb-main kb-full-height">
        <div class="kb-post kb-full-height">
            <div class="kb-flex-row kb-flex-wrap">
                <h2 class="kb-title-header"></h2>
                <div class="kb-flex-row kb-flex-wrap kb-post-badges">
                    <div class="kb-badge"></div>
                    <div class="kb-badge"></div>
                </div>
                <i class="kb-share-link fa-solid fa-link"></i>
            </div>
            <div class="kb-post-info kb-flex-row">
                <div class="kb-post-avatar" style="background-color:' . $colorLookup[$post['author']].'">
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <div class="kb-post-divider"></div>
            <p class="kb-post-content kb-scrollable"></p>
        </div>
    </div>
</div>

<script src="knowledgeBase/queries.js"></script>