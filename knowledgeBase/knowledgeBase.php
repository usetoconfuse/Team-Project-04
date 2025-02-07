<div class="kb-content" id="kb-all-view">
    <div class="kb-header-section">
        <h1 class="kb-title">Knowledge Base</h1>
        <div class="post-type-btns">
            <button class="active black-btn" id="allBtn" >Show All</button>
            <button id="technicalBtn" value="Technical">Technical</button>
            <button id="nonTechnicalBtn" value="Non-Technical">Non-Technical</button>
        </div>
    </div>
    <div class="kb-main">
        <div class="kb-listing">
            <div class="kb-listing-header">
                <div class="kb-listing-search">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search Post Content" id="searched-post">
                </div>
                <button id="new-post-btn" class="black-btn">
                    New Post
                </button>
            </div>

            <div id="kb-posts-list" class="kb-posts">
                <?php
                ?>
            </div>
        </div>
        <div class="kb-sidebar">
            <h2>Filter by Topic</h2>
            <div class="kb-listing-search" id="topic-searchbar">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search Topics" id="searched-topic">
            </div>
            <ul id="topicsList">
                <li class="kb-topic" data-topic="coding-standards"><span class="kb-topic-circle"></span>Coding Standards
                </li>
                <li class="kb-topic" data-topic="printer-issues"><span class="kb-topic-circle"></span>Printer Issues
                </li>
                <li class="kb-topic" data-topic="cybersecurity"><span class="kb-topic-circle"></span>Cybersecurity</li>
                <li class="kb-topic" data-topic="workplace-hygiene"><span class="kb-topic-circle"></span>Workplace
                    Hygiene</li>
                <p class="kb-sidebar-content kb-scrollable"></p>
            </ul>
            <button id="new-topic-btn" class="black-btn">New Topic</button>

        </div>

        <!--Add Topic Modal-->
        <div id="topic-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    <p>Add Topic</p>
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="topic-modal-form" class="modal-body">
                    <div class="topic-title-form">
                        <label for="topic-name">Topic Name: </label>
                        <input type="text" id="topicInput" name="topic-name" placeholder="Enter new topic name">
                    </div>
                </form>
                <div class="task-submit-buttons">
                    <div class="add-topic-btn  black-btn" id="add-topic-btn">
                        Add Topic
                        <i class="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>

        <!--Add Post Modal-->
        <div id="add-post-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    <p>Add Post</p>
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="post-modal-form" class="modal-body">
                    <div class="post-title-form">
                        <label for="postInput">Title :</label>
                        <input type="text" id="postInput" name="title" placeholder="Enter post title">
                    </div>
                    <div class="post-content-form">
                        <label for="contentInput">Content :</label>
                        <textarea type="text" id="contentInput" name="content"
                            placeholder="Enter post content"></textarea>
                    </div>
                    <div class="task-dropdowns-form" id="post-dropdowns-form">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="type-dropdown">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
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
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="topic" id="topic-modal-dropdown">
                                    <!--These topics will be retrieved via sql query-->
                                    <option value="" selected disabled hidden>Choose</option>
                                </select>
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
                <div class="task-submit-buttons">
                    <div class="add-post-btn black-btn" id="add-post-btn">
                        Add Post
                        <i class="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div id="edit-post-modal" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    <p>Edit Post</p>
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="post-modal-form" class="modal-body">
                    <div class="post-title-form">
                        <label for="postInput">Title :</label>
                        <input type="text" id="postInput" name="title" placeholder="Enter post title">
                    </div>
                    <div class="post-content-form">
                        <label for="contentInput">Content :</label>
                        <textarea type="text" id="contentInput" name="content"
                            placeholder="Enter post content"></textarea>
                    </div>
                    <div class="task-dropdowns-form" id="post-dropdowns-form">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="type-dropdown">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
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
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="topic" id="topic-modal-dropdown">
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
                <div class="task-submit-buttons">
                    <div class="add-post-btn black-btn" id="add-post-btn">
                        Edit Post
                        <i class="fa fa-arrow-right"></i>
                    </div>
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
            <div class="kb-title-line">
                <h2 class="kb-title-header"></h2>
                <div class="kb-post-badges">
                    <div class="kb-badge"></div>
                    <div class="kb-badge"></div>
                </div>
                <i class="kb-share-link fa-solid fa-link"></i>
            </div>
            <div class="kb-post-info">
                <div class="kb-post-avatar" style="background-color:' . $colorLookup[$post['author']].'">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="kb-text-sm">
                </div>
            </div>
            <div class="kb-post-divider"></div>
            <p class="kb-post-content kb-scrollable"></p>
        </div>
    </div>
</div>

<script src="knowledgeBase/queries.js"></script>
