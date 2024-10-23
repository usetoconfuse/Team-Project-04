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
                    echo '<div class="kb-post" id="'.$id.'">
                <h1 class="kb-post-title">Post title ' . ($i + 1)." ".$id.'</h1>
                <div class="kb-post-info">
                    <div class="kb-post-avatar">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="kb-post-topic">
                        Post Topic
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
            <ul>
                <li class="kb-topic">Topic 1</li>
                <li class="kb-topic">Topic 2</li>
                <li class="kb-topic">Topic 3</li>
            </ul>
        </div>
    </div>
</div>
<script src="knowledgeBase.js"></script>