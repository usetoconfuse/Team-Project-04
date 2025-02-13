document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.getElementById("gridContainer");
  const projectContainer = document.querySelector('#project-content');
  const userID = projectContainer.getAttribute('data-user-id');
  fetchProjectsData(userID, { status: 'Active' },  "#active-project-content #gridContainer"); //default load in is always active projects

  //Fetch different project types depending on which view is selected (admin only)
  const userRole = document.querySelector('#project-content').getAttribute('data-role');
  if (userRole === 'Admin') {
    document.querySelector('#active-project').addEventListener("click", ()=> {
      fetchProjectsData(userID, { status: 'Active' }, "#active-project-content #gridContainer");
    })
    document.querySelector('#not-started-project').addEventListener("click", ()=> {
      fetchProjectsData(userID, { status: 'Not Started' }, "#not-started-project-content #gridContainer");
    })
    document.querySelector('#archive-project').addEventListener("click", ()=> {
      fetchProjectsData(userID, { status: 'Archived' }, "#archive-project-content #gridContainer");
    })
  
  }



  //Filter Projects Functionality
  const filterProjectsBtn = projectsFilterModal.querySelector('.add-filter-btn');
  filterProjectsBtn.addEventListener('click', () => {
    const dateValue = projectsFilterModal.querySelector('.task-dropdown-date #date-task').value;
    const filters = {dateValue};
    if (dateValue === "") {
      delete filters.dateValue;
    }
    projectsFilterModal.style.display = 'none';
    fetchProjectsData(userID, filters, "#active-project-content #gridContainer");
  })





  //Fetch all project data for this user and display on page
  async function fetchProjectsData(userID, filters={}, containerSelector) {
    try {
      let url = `Projects/query/projects-db.php?userID=${encodeURIComponent(userID)}`;
      const filterQuery = new URLSearchParams(filters).toString();
      url += filterQuery ? `&${filterQuery}` : '';

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const container = document.querySelector(containerSelector);
    container.innerHTML = "";

      const response = await fetch(url, params);

      if (!response.ok) {
          throw new Error('Failed to fetch projects data');
      }

      const projectData = await response.json();
      console.log(projectData);

      gridContainer.innerHTML = ""; // Clear existing projects

      projectData.forEach((project) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-project-id', project.Project_ID);
        projectCard.setAttribute('data-project-title', project.Project_Title);

        let cardBottom = "";
       
        if (userRole === "Admin") {
          cardBottom = `
                      <div class="project-card-bottom">
                          <div class="project-card-task-count">
                          
                          </div>
                      
                          <div class="project-card-due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${project.Due_Date}</p>
                          </div>
                      </div>`
        } else {
          cardBottom = `
                      <div class="project-card-bottom">
                          <div class="project-card-task-count">
                            <i class="fa fa-solid fa-list-check"></i>
                            <p>${project.Task_Count} Tasks<p>
                          </div>
                      
                          <div class="project-card-due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${project.Due_Date}</p>
                          </div>
                      </div>`
        }

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
    
                                  ${cardBottom}
                            
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
    
        container.appendChild(projectCard);
    
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

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Open Add Project Modal & Fetch Users
  addProjectBtn.addEventListener('click', () => {
    addProjectModal.style.display = 'flex';
    fetchUsers(); // Load Team Leaders dynamically
  });

  // Close Modal
  closeAddProjectModal.addEventListener('click', () => {
    addProjectModal.style.display = 'none';
  });

  // Submit New Project Data
  submitAddProject.addEventListener("click", async function () {
    const title = document.getElementById("task-title").value;
    const teamLeader = teamLeaderDropdown.value;
    const startDate = document.getElementById("start-date-project").value;
    const dueDate = document.getElementById("date-project").value;

    if (!title || !teamLeader || !startDate || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    const projectData = {
      title: title,
      teamLeader: teamLeader,
      startDate: startDate,
      dueDate: dueDate
    };

    try {
      const response = await fetch("Projects/query/add-project.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert("Project successfully added!");
        addProjectModal.style.display = 'none';
        fetchProjectsData(userID); // Reload projects to display new one
      } else {
        alert("Failed to add project. Try again.");
      }

    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
    } catch(error) {
      console.log("Fetch Issue",error);
      //Show Error Card
    }
}


const searchBar = document.querySelector('.project-search #searched-project');

searchBar.addEventListener('input', ()=>{

  const searchValue = searchBar.value.toLowerCase();
  const allProjects = document.querySelectorAll('.project-card');
  let foundProjects = 0;
  allProjects.forEach(project => {
    const projectTitle = project.getAttribute('data-project-title').toLowerCase();

    if (projectTitle.includes(searchValue)) {
      foundProjects++;
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  })
  if (foundProjects === 0) {
    document.querySelector('.search-error-msg').style.display = 'block';
  } else {
    document.querySelector('.search-error-msg').style.display = 'none';
  }
})




  

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



});


//Filter Projects Modal
const openProjectsFilterBtn = document.querySelector('#project-content .project-filter-container .filter-project-btn');
const projectsFilterModal = document.querySelector('#project-content #project-filter-modal');

openProjectsFilterBtn.addEventListener('click', () => {
  projectsFilterModal.style.display = 'block';
})
const closeProjectFilterModal = projectsFilterModal.querySelector('.modal-box .modal-header .close-modal-btn');
closeProjectFilterModal.addEventListener('click', () => {
  projectsFilterModal.style.display = 'none';
})



 // Add Project Modal Functionality
 const addProjectBtn = document.querySelector('.add-project');
 const addProjectModal = document.querySelector('#projects-modal');
 const closeAddProjectModal = addProjectModal.querySelector('.close-modal-btn');
 const submitAddProject = addProjectModal.querySelector('#add-project-btn');
 const teamLeaderDropdown = document.getElementById("team-leader");

 // Fetch Users for Team Leader Selection
 async function fetchUsers() {
   try {
     const response = await fetch('Projects/query/fetch-users.php');
     if (!response.ok) throw new Error('Failed to fetch users');

     const users = await response.json();
     
     // Clear existing options
     teamLeaderDropdown.innerHTML = '<option value="" selected disabled hidden>Choose</option>';

     users.forEach(user => {
       const option = document.createElement("option");
       option.value = user.User_ID; 
       option.textContent = `${user.User_ID} - ${user.Forename} ${user.Surname}`; 
       teamLeaderDropdown.appendChild(option);
     });

   } catch (error) {
     console.error("Error fetching users:", error);
   }
 }

 // Open Add Project Modal & Fetch Users
 addProjectBtn.addEventListener('click', () => {
   addProjectModal.style.display = 'flex';
   fetchUsers(); // Load Team Leaders dynamically
 });

 // Close Modal
 closeAddProjectModal.addEventListener('click', () => {
   addProjectModal.style.display = 'none';
 });

 // Submit New Project Data
 submitAddProject.addEventListener("click", async function () {
   const title = document.getElementById("task-title").value;
   const teamLeader = teamLeaderDropdown.value;
   const startDate = document.getElementById("start-date-project").value;
   const dueDate = document.getElementById("date-project").value;

   if (!title || !teamLeader || !startDate || !dueDate) {
     alert("Please fill in all fields.");
     return;
   }

   const projectData = {
     title: title,
     teamLeader: teamLeader,
     startDate: startDate,
     dueDate: dueDate
   };

   try {
     const response = await fetch("Projects/query/add-project.php", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(projectData),
     });

     if (response.ok) {
       alert("Project successfully added!");
       addProjectModal.style.display = 'none';
       fetchProjectsData(userID); // Reload projects to display new one
     } else {
       alert("Failed to add project. Try again.");
     }

   } catch (error) {
     console.error("Error adding project:", error);
     alert("An error occurred. Please try again.");
   }
 });
});

//Switch Buttons for different project pages
const projectItems = document.querySelectorAll('.project-switch-buttons .project-item');
const projectItemContents = document.querySelectorAll('.project-item-content');

function openProjectContent(pageId) {
  const projectItem = document.querySelector(`#${pageId}`);
  projectItems.forEach(item => item.classList.remove('active'));
  projectItem.classList.add('active');

  projectItemContents.forEach(item => item.classList.remove('open'))
  const projectItemContent = document.querySelector(`#${projectItem.id}-content`)
  projectItemContent.classList.add('open');
}

projectItems.forEach(item => {
  item.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectContent(item.id);
  })
})
