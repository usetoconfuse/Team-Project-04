
document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");



//Hardcoded user ID but will change later when Login is made
let userID = 4; //for this eg, we use userID 4 this belongs to 3 teams
fetchProjectsData(userID);

async function fetchProjectsData(userID) {
  try {

    let url = `Projects/projects-db.php?userID=${encodeURIComponent(userID)}`; 
    const params = { 
      method: "GET" 
    }

    const response = await fetch(url, params);

    if (!response.ok) {
        throw new Error('Failed to fetch projects data');
    }

    const projectData = await response.json();

    console.log(projectData);

    projectData.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.classList.add('project-card');
      projectCard.setAttribute('data-project-id', project.Project_ID);
      
      
  
      projectCard.innerHTML = `
                                <div class="project-card-top">
                                  
                                    <p>${project.Project_Title}</p>
                                  
                                    <a href="#" class="black-btn">View</a>
                                </div>
                                <div class="project-card-progress">
                                    <div class="project-card-progress-info">
                                        <p>Progress</p>
                                        <p>75%</p>
                                    </div>
                                    <div class="project-card-progress-bar">
                                        <div class="project-card-progress-bar-inner"></div>
                                    </div>
                                </div>
  
                                <div class="project-card-bottom">
                                    <div class="project-card-team">
                                        <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                        <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                        <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                        <div class="project-user"><i class="fa fa-solid fa-user"></i></div>
                                        <div class="project-user">+3</div>
                                    </div>
                                    <div class="project-card-due-date">
                                        <i class="fa fa-regular fa-calendar"></i>
                                        <p>Due: ${project.Due_Date}</p>
                                    </div>
                                </div>
                           
                            `;
  
      const progressBar = projectCard.querySelector('.project-card-progress-bar-inner');
      let progressString = "75%";
      progressBar.style.width = progressString;
      
      let projectInt = 75;
      if (projectInt <= 33) {
        progressBar.style.backgroundColor = '#E6757E';
      } else if (projectInt <= 66) {
        progressBar.style.backgroundColor = '#EAB385';
      } else if (projectInt <= 100) {
        progressBar.style.backgroundColor = '#ADDA9D';
      }
  
      gridContainer.appendChild(projectCard);
  
      //Links to project kanban
      projectCard.querySelector('.project-card-top a').addEventListener('click', (e) => {
        e.preventDefault();

        //Add to URL the project ID so it can be used in Kanban.js
        /*const currentURL = new URL(window.location.href);
        currentURL.searchParams.set('projectID', project.Project_ID);
        history.pushState({projectID: project.Project_ID}, '', currentURL);
        */
       

        sessionStorage.setItem('clicked-project-id', project.Project_ID)
        window.dispatchEvent(new Event("storage"))
        

        //console.log(sessionStorage.getItem('clicked-project-id'))


        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
  
        const linkItem = document.querySelector('#current-project')
        linkItem.style.display = 'block';
        linkItem.classList.add('active');
        document.querySelector('.nav-item#projects').classList.add('active');
  
        const navItemContents = document.querySelectorAll('.nav-item-content')
        navItemContents.forEach(item => item.classList.remove('open'))
        const contentArea = document.querySelector('#current-project-content')
        contentArea.classList.add('open');
      })
  
    });

  } catch(error) {
    console.log("Fetch Issue",error);
    //Show Error Card
  }
}





  

  const leaderProjectCard = document.querySelector('#leader-project-card');
  if (leaderProjectCard) {
    leaderProjectCard.querySelector('.project-card-top a').addEventListener('click', (e) => {
      e.preventDefault();
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
  
        const linkItem = document.querySelector('#current-project')
        linkItem.style.display = 'block';
        linkItem.classList.add('active');
        document.querySelector('.nav-item#projects').classList.add('active');
  
        const navItemContents = document.querySelectorAll('.nav-item-content')
        navItemContents.forEach(item => item.classList.remove('open'))
        const contentArea = document.querySelector('#current-project-content')
        contentArea.classList.add('open');
    })
  
  }



  //Need to fix this so it gets the proper value on mobile
  const gridItems = gridContainer.children.length; //number of projects
  const columns = 3;
  const remainder = gridItems % columns;

  // Add filler card to fill that row
  //Get remainder to see if we need to fill that row and 
  //how many to fill it by 
  if (remainder !== 0) {
    const fillersNeeded = columns - remainder;
    for (let i = 0; i < fillersNeeded; i++) {
      const filler = document.createElement("div");
      filler.classList.add("project-card", "filler-project-card");
      gridContainer.appendChild(filler);
    }
  }
});

//Projects Modal
const addProjectBtn = document.querySelector('.project-intro .add-project')
const addProjectModal = document.querySelector('#projects-modal')
const closeAddProjectModal = addProjectModal.querySelector('.close-modal-btn')

addProjectBtn.addEventListener('click', () => {
  addProjectModal.style.display = 'flex';
})
closeAddProjectModal.addEventListener('click', () => {
  addProjectModal.style.display = 'none';
})
window.addEventListener('click', (e) => {
  if (e.target == addProjectModal) {
    addProjectModal.style.display = 'none';
  }
})

const submitAddProject = addProjectModal.querySelector('.task-submit-buttons #add-project-btn')
submitAddProject.addEventListener('click', () => {
  addProjectModal.style.display = 'none';
})


