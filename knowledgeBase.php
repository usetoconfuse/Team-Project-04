<div class="kb-content">
    <div class="kb-header-section">
        <h1 class="kb-title">Knowledge Base</h1>
        <div class="form-btns">
            <button class="active" id="allBtn">Show All</button>
            <button id="technicalBtn">Technical</button>
            <button id="nonTechnicalBtn">Non-Technical</button>
        </div>
    </div>
    <div class="kb-main">
        <div class="kb-listing">
            <div class="kb-listing-header">
                <div class="kb-listing-search">
                    <i class="fa-solid fa-search"></i>
                    <input type="text" placeholder="Search Post Content">
                </div>
                <button id="new-post-btn">
                    New Post
                </button>
            </div>

            <div class="kb-posts">
                <?php
                $posts = [
                    [
                        'id' => 'technical',
                        'key' => 'coding-standards',
                        'title' => 'How we format our code',
                        'content' => 'All code should be indented with 4 spaces, and all functions should be declared in camel case.',
                        'posted' => '36 minutes ago',
                        'author' => 'Valerio Wilky'
                    ],
                    [
                        'id' => 'nonTechnical',
                        'key' => 'printer-issues',
                        'title' => 'How to replace paper in the printer',
                        'content' => 'No need to call IT, just follow these simple steps to replace the paper in your printer. First, open the paper tray, then remove the empty paper, and finally insert the new paper. Simple!',
                        'posted' => '2 hours ago',
                        'author' => 'Bilal Akito'
                        
                    ],
                    [
                        'id' => 'technical',
                        'key' => 'cyber-security',
                        'title' => 'How to stay safe from cyber attacks',
                        'content' => 'Cybersecurity is a big deal, and we all need to do our part to stay safe. Make sure to use strong passwords, and never share your password with anyone. Also, be sure to keep your software up to date, and never click on suspicious links. If there is ever a security breach, be sure to report it to IT immediately.',
                        'posted' => '5 hours ago',
                        'author' => 'Bilal Akito'
                    ],
                    [
                        'id' => 'nonTechnical',
                        'key' => 'workplace-hygiene',
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
                        'author' => 'Haukea Fátima'
                    ]
                ];
                $idLookup = [
                    'technical' => 'Technical',
                    'nonTechnical' => 'Non-Technical'
                ];
                $topicLookup = [
                    'coding-standards' => 'Coding Standards',
                    'printer-issues' => 'Printer Issues',
                    'cyber-security' => 'Cybersecurity',
                    'workplace-hygiene' => 'Workplace Hygiene'
                ];
                $colorLookup = [
                    'Valerio Wilky' => 'var(--pastel-colour-1)',
                    'Bilal Akito' => 'var(--pastel-colour-2)',
                    'Haukea Fátima' => 'var(--pastel-colour-3)'
                ];
                foreach ($posts as $post) {
                    $post['content'] = nl2br($post['content']);
                    echo '
                    <div class="kb-post" id="' . $post['id'] . '" data-key="' . $post['key'] . '">
                        <div class="kb-title-line">
                            <h2 class="kb-title-header">' . $post['title'] . '</h2>
                            <div class="kb-post-badges">
                                <div class="kb-badge">' . $idLookup[$post['id']] . '</div>
                                <div class="kb-badge">' . $topicLookup[$post['key']] . '</div>
                            </div>
                            <i id="kb-share-link" class="fa-solid fa-link" href="#"></i>
                        </div>
                        <div class="kb-post-info">
                            <div class="kb-post-avatar" style="background-color:' . $colorLookup[$post['author']].'">
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div class="kb-text-sm">
                                ' . $post['author'] . ' | ' . $post['posted'] . '
                            </div>
                        </div>
                        <div class="kb-post-divider"></div>
                        <p class="kb-post-content">' . $post['content'] . '</p>
                        <button>Read Post</button>
                    </div>';
                }
                ?>
            </div>
        </div>
        <div class="kb-sidebar">
            <h2>Filter by Topic</h2>
            <ul id="topicsList">
                <li class="kb-topic" id="codingStandards">Coding Standards</li>
                <li class="kb-topic" id="printerIssues">Printer Issues</li>
                <li class="kb-topic" id="cybersecurity">Cybersecurity</li>
                <li class="kb-topic" id="workplaceHygiene">Workplace Hygiene</li>
            </ul>
            <button id="new-topic-btn">New Topic</button>
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
                    <div class="add-topic-btn" id="add-topic-btn">
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
                        <textarea type="text" id="contentInput" name="post-content" placeholder="Enter post content"></textarea>
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
                                    <option value="" selected disabled hidden>Choose</option>
                                    <option value="coding-standards">Coding Standards</option>
                                    <option value="Printer Issues">Printer Issues</option>
                                    <option value="Printer Issues">Cybersecurity</option>
                                    <option value="Printer Issues">Workplace Hygiene</option>
                                </select>
                            </div>  
                        </div>
                    </div>
                </form>
                <div class="task-submit-buttons">
                    <div class="add-post-btn" id="add-post-btn">
                        Add Post
                        <i class="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>


        
    </div>
</div>
