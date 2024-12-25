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
                    <input type="text" placeholder="Search Post Content">
                </div>
                <button id="new-post-btn" class="black-btn">
                    New Post
                </button>
            </div>

            <div id="kb-posts-list" class="kb-posts">
                <?php
                $posts = [
                    [
                        'type' => 'technical',
                        'id' => '1',
                        'topic' => 'coding-standards',
                        'title' => 'How we format our code',
                        'content' => 'All code should be indented with 4 spaces, and all functions should be declared in camel case.
                        The header of a PHP file may consist of a number of different blocks. If present, each of the blocks below MUST be separated by a single blank line, and MUST NOT contain a blank line. Each block MUST be in the order listed below, although blocks that are not relevant may be omitted.

    Opening tag.
    File-level docblock.
    One or more declare statements.
    The namespace declaration of the file.
    One or more class-based use import statements.
    One or more function-based use import statements.
    One or more constant-based use import statements.
    The remainder of the code in the file.

                        ',
                        'posted' => '36 minutes ago',
                        'author' => 'John Little',
                    ],
                    [
                        'type' => 'nonTechnical',
                        'id' => '2',
                        'topic' => 'printer-issues',
                        'title' => 'How to replace paper in the printer',
                        'content' => 'No need to call IT, just follow these simple steps to replace the paper in your printer. First, open the paper tray, then remove the empty paper, and finally insert the new paper. Simple!',
                        'posted' => '2 hours ago',
                        'author' => 'Bilal Akito',
                    ],
                    [
                        'type' => 'technical',
                        'id' => '3',
                        'topic' => 'cybersecurity',
                        'title' => 'How to stay safe from cyber attacks',
                        'content' => 'Cybersecurity is a big deal, and we all need to do our part to stay safe. Make sure to use strong passwords, and never share your password with anyone. Also, be sure to keep your software up to date, and never click on suspicious links. If there is ever a security breach, be sure to report it to IT immediately.',
                        'posted' => '5 hours ago',
                        'author' => 'Bilal Akito',
                    ],
                    [
                        'type' => 'nonTechnical',
                        'id' => '4',
                        'topic' => 'workplace-hygiene',
                        'title' => 'How to wash your hands',
                        'content' => '1. Wet your hands with water.
                            2. Apply enough soap to cover your hands.
                            3. Rub your hands together.
                            4. Use one hand to rub the back of the other hand and clean in between the fingers. Do the same with the other hand.
                            5. Rub your hands together and clean in between your fingers.
                            6. Grip the fingers of each hand together with the backs of your fingers against the palms of your other hand. Rub your fingertips together and rub the back of your fingers against your palms.
                            7. Rub one thumb using your other hand. Do the same with the other thumb.
                            8. Rub the tips of your fingers on the palm of your other hand. Do the same with other hand.
                            9. Rinse your hands with water.
                            10. Dry your hands completely with a disposable towel.
                            11. Use the disposable towel to turn off the tap.',
                        'posted' => '3 days ago',
                        'author' => 'Haukea Fátima',
                    ],
                    [
                        'type' => 'technical',
                        'id' => '5',
                        'topic' => 'cybersecurity',
                        'title' => 'Phishing Email Tests',
                        'content' => 'We will be sending out phishing emails to test your awareness of cybersecurity threats. If you receive an email that seems suspicious, do not click on any links, and report it to IT immediately.',
                        'posted' => '5 days ago',
                        'author' => 'John Little',
                    ],
                ];
                $typeLookup = [
                    'technical' => 'Technical',
                    'nonTechnical' => 'Non-Technical'
                ];
                $topicLookup = [
                    'coding-standards' => 'Coding Standards',
                    'printer-issues' => 'Printer Issues',
                    'cybersecurity' => 'Cybersecurity',
                    'workplace-hygiene' => 'Workplace Hygiene'
                ];
                $colorLookup = [
                    'John Little' => 'var(--pastel-colour-1)',
                    'Bilal Akito' => 'var(--pastel-colour-2)',
                    'Haukea Fátima' => 'var(--pastel-colour-3)',
                    'coding-standards' => 'var(--pastel-colour-1)',
                    'printer-issues' => 'var(--pastel-colour-2)',
                    'cybersecurity' => 'var(--pastel-colour-3)',
                    'workplace-hygiene' => 'var(--pastel-colour-4)'
                ];


                foreach ($posts as $post) {
                    $post['content'] = nl2br($post['content']);
                    $currentUserHtml = '';
                    if ($post['author'] === 'John Little') {
                        $currentUserHtml = '
                            <button class="black-btn">Edit Post</button>
                            <button class="kb-delete-post-button">Delete Post <i class="fa-solid fa-trash"></i></button>
                        ';
                    }
                    ;
                    echo '
                    <div class="kb-post" id="post-' . $post['id'] . '" data-topic="' . $post['topic'] . '" data-type="' . $post["type"] . '">
                        <div class="kb-title-line">
                            <h2 class="kb-title-header">' . $post['title'] . '</h2>
                            <div class="kb-post-badges">
                                <div class="kb-badge" style="background-color:var(--tertiary-colour);">' . $typeLookup[$post['type']] . '</div>
                                <div class="kb-badge" style="background-color:' . $colorLookup[$post['topic']] . '">' . $topicLookup[$post['topic']] . '</div>
                            </div>
                            <i class="kb-share-link fa-solid fa-link" href="#"></i>
                        </div>
                        <div class="kb-post-info">
                            <div class="kb-post-avatar" style="background-color:' . $colorLookup[$post['author']] . '">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="kb-text-sm">
                                ' . $post['author'] . ' | ' . $post['posted'] . '
                            </div>
                        </div>
                        <div class="kb-post-divider"></div>
                        <p class="kb-post-content kb-post-content-shortened">' . $post['content'] . '</p>
                        <div class="kb-post-buttons">
                            <button class="read-post-btn black-btn">Read Post</button>
                            ' . $currentUserHtml . '
                        </div>
                    </div>';
                }
                ?>
            </div>
        </div>
        <div class="kb-sidebar">
            <h2>Filter by Topic</h2>
            <ul id="topicsList">
                <li class="kb-topic" data-topic="coding-standards"><span class="kb-topic-circle"></span>Coding Standards
                </li>
                <li class="kb-topic" data-topic="printer-issues"><span class="kb-topic-circle"></span>Printer Issues
                </li>
                <li class="kb-topic" data-topic="cybersecurity"><span class="kb-topic-circle"></span>Cybersecurity</li>
                <li class="kb-topic" data-topic="workplace-hygiene"><span class="kb-topic-circle"></span>Workplace
                    Hygiene</li>
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
                        <label for="topic-title">Title</label>
                        <input type="text" id="topicInput" name="topic-title" placeholder="Enter new topic name">
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
        <div id="post-modal" class="modal">
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
                        <label for="post-title">Title</label>
                        <input type="text" id="postInput" name="post-title" placeholder="Enter post title">
                    </div>
                    <div class="post-content-form">
                        <label for="post-content">Content</label>
                        <textarea type="text" id="contentInput" name="post-content"
                            placeholder="Enter post content"></textarea>
                    </div>
                    <div class="task-dropdowns-form" id="post-dropdowns-form">
                        <!--technical or non technical-->
                        <div class="task-dropdown task-dropdown-technical">
                            <label for="technical">Technical?</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-technical-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="technical" id="technical">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="technical">Technical</option>
                                    <option value="nontechnical">Non-technical</option>
                                </select>
                            </div>
                        </div>
                        <!--topic-->
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="topic">Topic</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="topic" id="topic">
                                    <!--These topics will be retrieved via sql query-->
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="coding-standards">Coding Standards</option>
                                    <option value="printer-issues">Printer Issues</option>
                                    <option value="cybersecurity">Cybersecurity</option>
                                    <option value="workplace-hygiene">Workplace Hygiene</option>
                                </select>
                            </div>
                        </div>
                        <div class="task-dropdown task-dropdown-topic">
                            <label for="topic">Permissions</label>
                            <div class="task-dropdown-select-options">
                                <div class="task-dropdown-topic-icon task-dropdown-icon">
                                    <i class="fa fa-solid fa-user"></i>
                                </div>
                                <select name="topic" id="topic">
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="all-users">All Users</option>
                                    <option value="manager-only" disabled>Manager only</option>
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

<script src="kbTest.js"></script>
