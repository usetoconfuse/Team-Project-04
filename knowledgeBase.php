<div class="kb-content">
    <div class="header-section">
        <h1 class="kb-title">Knowledge Base</h1>
        <div class="form-btns">
            <button class="active" id="allBtn">Show All</button>
            <button id="technicalBtn">Technical</button>
            <button id="nonTechnicalBtn">Non-Technical</button>
        </div>
    </div>
    <div class="kb-main">
        <div class="kb-listing">
            <div class="kb-createpost">
                <input type="text" placeholder="Create a post">
                <button>
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            <div class="kb-posts">
                <?php
                for ($i = 0; $i < 4; $i++) {
                    //set id for each post
                    $id = ($i % 2 ==0) ? "technical" : "nonTechnical";
                    switch ($i) {
                        case 0:
                            $key = "coding-standards";
                            break;
                        case 1:
                            $key = "printer-issues";
                            break;
                        case 2:
                            $key = "cyber-security";
                            break;
                        case 3:
                            $key = "workplace-hygiene";
                            break;
                    }                
                    echo '<div class="kb-post" id="'.$id.'"  data-key="'.$key.'">
                <h1 class="kb-post-title">Post title ' . ($i + 1)." ".$id.'</h1>
                <div class="kb-post-info">
                    <div class="kb-post-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="kb-post-topic">
                        '.$key.'
                    </div>
                </div>
                <div class="kb-post-divider"></div>
                <p class="kb-post-content">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ' . ($i + 1) . '</p>
              </div>';
                }
                ?>
            </div>
        </div>
        <div class="kb-sidebar">
            <h3 class="kb-sidebar-title">Filter by Topic</h3>
            <ul id="topicsList">
                <li class="kb-topic" id="codingStandards">Coding Standards</li>
                <li class="kb-topic" id="printerIssues" >Printer Issues</li>
                <li class="kb-topic" id="cybersecurity" >Cybersecurity</li>
                <li class="kb-topic" id="workplaceHygiene">Workplace Hygiene</li>
            </ul>
            <button id="new-topic-btn">Add Topic</button>
        </div>
    </div>

    <div id="topic-modal" class="modal">
        <div class="modal-content">
            <span id="close-topic-modal" class="close">&times;</span>
            <h1 id="topic-modal-title">Nesw Topic</h1>
            <form id="topic-modal-form">
                <div>
                    <label class="text">Topic:</label>
                    <input type="text" class="text-input" id="topicInput" placeholder="Enter topic name">
                </div>
                <button type="submit" id="add-topic-btn">submit</button>
            </form>
        </div>
    </div>
    <!-- <div id="post-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
    </div> -->

</div>
<script src="knowledgeBase.js"></script>