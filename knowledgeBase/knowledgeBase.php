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
                    <input type="text" placeholder="Search Post Title" id="kb-post-title-search">
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
                <li class="kb-topic" value="[DYNAMIC]" id="[DYNAMIC]">
                    <span class="kb-topic-circle" style="DYNAMIC"></span>
                    <p>[DYNAMIC]</p>
                    <i 
                        class="fa-solid fa-xmark" 
                        style="flex-grow:1; text-align:right;" 
                        <?php echo ($_SESSION['role'] !== 'Admin') ? 'disabled' : ''; ?>
                    >
                    </i>
                </li>
            </template>
            <ul id="kb-topics-list" class="kb-flex-col kb-scrollable">
                <!-- Topics are dynamically loaded with JS -->
            </ul>
            <button id="kb-filters-add-topic">New Topic</button>
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
            <div class="modal-box kb-wide-modal">
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
                        <label for="kb-new-post-title">Title :</label>
                        <input type="text" id="kb-new-post-title" name="title" placeholder="Enter post title">
                    </div>
                    <div>
                        <label for="kb-new-post-content-input">Content :</label>
                        <div class="kb-markdown-container">
                            <div class="kb-markdown-header">
                                <div class="kb-markdown-btn active" id="kb-new-post-write-btn">Write</div>
                                <div class="kb-markdown-btn" id="kb-new-post-preview-btn">Preview</div>
                            </div>
                            <textarea class="kb-markdown-textarea" type="text" id="kb-new-post-content-input"
                                name="content" placeholder="Enter post content"></textarea>
                            <div class="kb-markdown-textarea" id="kb-new-post-content-preview" style="display: none;">
                            </div>
                        </div>

                    </div>
                    <div class="kb-flex-row space-evenly kb-flex-wrap">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="kb-new-post-type-input">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-gear"></i>
                                </div>
                                <select name="type" id="kb-new-post-type-input">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-technical</option>
                                </select>
                            </div>
                        </div>
                        <!--topic-->
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="topic-modal-dropdown">Topic :</label>
                            <div class="task-dropdown-select-options" id="kb-new-post-topic-dropdown-btn">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-comment"></i>
                                </div>
                                <div class="kb-topic-dropdown-btn" id="kb-new-post-topic-input">
                                    <div class="centered-div">Select Topic</div>
                                </div>
                            </div>
                            <div class="kb-topic-dropdown-container">
                                <div class="kb-topic-dropdown" id="kb-new-post-topic-dropdown">
                                    <div class="kb-flex-row kb-topic-dropdown-search">
                                        <i class="fa-solid fa-search"></i>
                                        <input 
                                            type="text" 
                                            placeholder="Search.."
                                            class="dropdown-search" 
                                            id="kb-new-post-topic-dropdown-search-input"
                                            autocomplete="off"
                                        >
                                    </div>
                                    <div class="topic-dropdown-topics" id="kb-new-post-topic-dropdown-elements">
                                        <!-- Topics are dynamically loaded with JS -->
                                    </div>
                                    <button id="kb-new-post-topic-add-topic">Add Topic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="kb-flex-row space-evenly kb-flex-wrap">
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="kb-new-post-visibility-input">Visibility :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-eye"></i>
                                </div>
                                <select name="visibility" id="kb-new-post-visibility-input">
                                    <option value="All Users">All Users</option>
                                    <option value="Manager Only" <?php echo ($_SESSION['role'] !== 'Admin') ? 'disabled' : ''; ?>>Manager Only</option>
                                </select>
                            </div>
                        </div>
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="kb-new-post-protected-input">Protected?</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-lock"></i>
                                </div>
                                <select name="visibility" id="kb-new-post-protected-input">
                                    <option value="0">No</option>
                                    <option value="1" <?php echo ($_SESSION['role'] !== 'Admin') ? 'disabled' : ''; ?>>
                                        Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="kb-modal-submission-btns">
                    <button class="add-post-btn" id="kb-add-post-submit-btn">
                        Add Post
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <!--Edit Post Modal-->
        <div id="edit-post-modal" class="modal">
            <div class="modal-box kb-wide-modal">
                <!--Header-->
                <div class="modal-header">
                    Edit Post
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <form id="post-modal-form" class="modal-body">
                    <div>
                        <label for="kb-new-post-title">Title :</label>
                        <input type="text" id="kb-edit-post-title-input" name="title" placeholder="Enter post title">
                    </div>
                    <div>
                        <label for="kb-edit-post-content-input">Content :</label>
                        <div class="kb-markdown-container">
                            <div class="kb-markdown-header">
                                <div class="kb-markdown-btn active" id="kb-edit-post-write-btn">Write</div>
                                <div class="kb-markdown-btn" id="kb-edit-post-preview-btn">Preview</div>
                            </div>
                            <textarea class="kb-markdown-textarea" type="text" id="kb-edit-post-content-input"
                                name="content" placeholder="Enter post content"></textarea>
                            <div class="kb-markdown-textarea" id="kb-edit-post-content-preview" style="display: none;">
                            </div>
                        </div>

                    </div>
                    <div class="kb-flex-row space-evenly kb-flex-wrap">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="kb-edit-post-type-input">Type :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-gear"></i>
                                </div>
                                <select name="type" id="kb-edit-post-type-input">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Non-Technical">Non-technical</option>
                                </select>
                            </div>
                        </div>
                        <!--topic-->
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="topic-modal-dropdown">Topic :</label>
                            <div class="task-dropdown-select-options" id="kb-add-post-topic-dropdown-btn">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-comment"></i>
                                </div>
                                <div class="kb-topic-dropdown-btn" id="kb-edit-post-topic-input">
                                    <div class="centered-div">Select Topic</div>
                                </div>
                            </div>
                            <div class="kb-topic-dropdown-container">
                                <div class="kb-topic-dropdown" id="kb-edit-post-topic-dropdown">
                                    <div class="kb-flex-row kb-topic-dropdown-search">
                                        <i class="fa-solid fa-search"></i>
                                        <input 
                                            type="text" 
                                            placeholder="Search.." 
                                            class="dropdown-search"
                                            id="kb-edit-post-topic-dropdown-search-input"
                                            autocomplete="off"
                                        >
                                    </div>
                                    <div class="topic-dropdown-topics" id="kb-edit-post-topic-dropdown-elements">
                                        <!-- Topics are dynamically loaded with JS -->
                                    </div>
                                    <button id="kb-edit-post-topic-add-topic">Edit Topic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="kb-flex-row space-evenly kb-flex-wrap">
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="kb-edit-post-visibility-input">Visibility :</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-eye"></i>
                                </div>
                                <select name="visibility" id="kb-edit-post-visibility-input">
                                    <option value="All Users">All Users</option>
                                    <option value="Manager Only" <?php echo ($_SESSION['role'] !== 'Admin') ? 'disabled' : ''; ?>>Manager Only</option>
                                </select>
                            </div>
                        </div>
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="kb-edit-post-protected-input">Protected?</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-lock"></i>
                                </div>
                                <select name="visibility" id="kb-edit-post-protected-input">
                                    <option value="0">No</option>
                                    <option value="1" <?php echo ($_SESSION['role'] !== 'Admin') ? 'disabled' : ''; ?>>
                                        Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="kb-modal-submission-btns">
                    <button class="edit-post-btn" id="kb-edit-post-submit-btn">
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
        <div id="delete-topic-modal" deleted-post-id="" class="modal">
            <div class="modal-box">
                <!--Header-->
                <div class="modal-header">
                    Delete Topic
                    <div class="close-modal-btn">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
                <!--Body-->
                <div class="modal-body">
                    Are you sure you want to delete this topic?
                </div>
                <div class="kb-modal-submission-btns">
                    <button class="red-btn" id="kb-delete-topic-modal-confirm">
                        Delete
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="cancel-delete-post-btn" id="cancel-delete-topic-btn">
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
        <div class="kb-post kb-flex-col kb-full-height">
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
            <div class="kb-post-content kb-scrollable"></div>
        </div>
    </div>
</div>

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="knowledgeBase/queries.js"></script>