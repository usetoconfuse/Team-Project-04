document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");

  // Example task data
  const projects = [
    { title: "Python Project", progress: 25, dueDate: "21 Oct", id: 1 },
    { title: "JavaScript Todo Application", progress: 50, dueDate: "22 Oct", id: 2 },
    { title: "Smart Fridge", progress: 75, dueDate: "23 Oct", id: 3 },
    { title: "Book on Cheese", progress: 40, dueDate: "24 Oct", id: 4 },
    { title: "Government Assignment", progress: 90, dueDate: "25 Oct", id: 5 },
    { title: "Social Media Tasks", progress: 60, dueDate: "26 Oct", id: 6 },
    { title: "Test Project", progress: 10, dueDate: "27 Oct", id: 7 },
  ];


  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add('project-card');
    projectCard.setAttribute('data-project-id', project.id);
    
    

    projectCard.innerHTML = `
                              <div class="project-card-top">
                                
                                  <p>${project.title}</p>
                                
                                  <a href="#" class="black-btn">View</a>
                              </div>
                              <div class="project-card-progress">
                                  <div class="project-card-progress-info">
                                      <p>Progress</p>
                                      <p>${project.progress}%</p>
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
                                      <p>${project.dueDate}</p>
                                  </div>
                              </div>
                         
                          `;

    const progressBar = projectCard.querySelector('.project-card-progress-bar-inner');
    progressBar.style.width = `${project.progress}%`;

    if (project.progress <= 33) {
      progressBar.style.backgroundColor = '#E6757E';
    } else if (project.progress <= 66) {
      progressBar.style.backgroundColor = '#EAB385';
    } else if (project.progress <= 100) {
      progressBar.style.backgroundColor = '#ADDA9D';
    }

    gridContainer.appendChild(projectCard);

    //Links to project kanban
    projectCard.querySelector('.project-card-top a').addEventListener('click', (e) => {
      e.preventDefault();
   
      const projectIdAttribute = projectCard.getAttribute('data-project-id');
      console.log(projectIdAttribute);
      //Send Fetch Request with param as this ID and then 
      //in Kanban DB file, we send a SQL with that Project ID to get 
      //all tasks for that Project ID
      fetchKanbanData(projectIdAttribute);

      
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

  const leaderProjectCard = document.querySelector('#leader-project-card');
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



async function fetchKanbanData(projectID) {
  try {
    let url = 'kanban-db.php';

    url += `projectId=${encodeURIComponent(projectId)}`;
    
    console.log(url);

    const params = {
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
        throw new Error('Failed to fetch venue data');
    }

    const kanbanData = await response.json();

    console.log(kanbanData);

    return kanbanData;

  } catch(error) {
    console.log("Fetch Issue",error);
  }
}