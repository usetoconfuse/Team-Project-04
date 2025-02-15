


  const projectContainer = document.querySelector("#project-content");
  const userProjectsID = projectContainer.getAttribute("data-user-id");
  fetchProjectsData(
    userProjectsID,
    { status: "Active" },
    "#active-project-content #gridContainer"
  ); //default load in is always active projects
  
  
  //Fetch different project types depending on which view is selected (admin only)
  const userRole = document
    .querySelector("#project-content")
    .getAttribute("data-role");
    
  if (userRole === "Admin") {
    document.querySelector("#active-project").addEventListener("click", () => {
      fetchProjectsData(
        userProjectsID,
        { status: "Active" },
        "#active-project-content #gridContainer"
      );

      searchBarProjects.forEach(bar => {
        bar.value = "";
        document.querySelector(".search-error-msg").style.display = "none";
      })

    });

    document
      .querySelector("#not-started-project")
      .addEventListener("click", () => {
        fetchProjectsData(
          userProjectsID,
          { status: "Not Started" },
          "#not-started-project-content #gridContainer"
        );
        searchBarProjects.forEach(bar => {
          bar.value = "";
          document.querySelector(".search-error-msg").style.display = "none";
        })
  
      });

    document.querySelector("#archive-project").addEventListener("click", () => {
      fetchProjectsData(
        userProjectsID,
        { status: "Archived" },
        "#archive-project-content #gridContainer"
      );
      searchBarProjects.forEach(bar => {
        bar.value = "";
        document.querySelector(".search-error-msg").style.display = "none";
      })

    });

    document.querySelector("#completed-project").addEventListener("click", () => {
      fetchProjectsData(
        userProjectsID,
        { status: "Completed" },
        "#completed-project-content #gridContainer"
      );
      searchBarProjects.forEach(bar => {
        bar.value = "";
        document.querySelector(".search-error-msg").style.display = "none";
      })

    });
  }
  const projectsFilterModal = document.querySelector(
    "#project-content #project-filter-modal"
  );
  //Filter Projects Functionality
  const filterProjectsBtn =
    projectsFilterModal.querySelector(".add-filter-btn");
  filterProjectsBtn.addEventListener("click", () => {
    const dateValue = projectsFilterModal.querySelector(
      ".task-dropdown-date #date-task"
    ).value;
    const filters = { dateValue };
    if (dateValue === "") {
      delete filters.dateValue;
    }
    projectsFilterModal.style.display = "none";
    fetchProjectsData(
      userProjectsID,
      filters,
      "#active-project-content #gridContainer"
    );
  });

  // Add Project Modal Functionality
  const addProjectBtn = document.querySelector(".add-project");
  const addProjectModal = document.querySelector("#projects-modal");
  const closeAddProjectModal =
    addProjectModal.querySelector(".close-modal-btn");
  const submitAddProject = addProjectModal.querySelector("#add-project-btn");
  const teamLeaderDropdown = addProjectModal.querySelector("#team-leader");
  const teamLeaderDropdownInput = addProjectModal.querySelector("#team-leader-dropdown");

  //Fetch all project data for this user and display on page
  async function fetchProjectsData(userID, filters = {}, containerSelector) {
    try {
      console.log("Fetching project data running")
      let url = `Projects/query/projects-db.php?userID=${encodeURIComponent(
        userID
      )}`;
      const filterQuery = new URLSearchParams(filters).toString();
      url += filterQuery ? `&${filterQuery}` : "";

      const params = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };

      const container = document.querySelector(containerSelector);
      console.log(container)
      container.innerHTML = "";

      const response = await fetch(url, params);

      if (!response.ok) {
        throw new Error("Failed to fetch projects data");
      }

      const projectData = await response.json();
      if (projectData.length === 0) {
        container.parentElement.querySelector(".search-error-msg").style.display = "block";
        return;
      }



      for (const project of projectData) {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.setAttribute("data-project-id", project.Project_ID);
        projectCard.setAttribute("data-project-title", project.Project_Title);


        let projectProgress;
        if (userRole === "Admin") {
         
          projectProgress = await getProjectProgress(project.Project_ID);
        } else if (userRole === "Employee") {
    
          projectProgress = await getProjectProgress(project.Project_ID, userProjectsID);
        }

        let cardTop = "";
        let cardBottom = "";

        if (userRole === "Admin") {
          cardTop = `<div class="project-card-top">
                        
                          <p>${project.Project_Title}</p>
                          <div class="project-card-top-btns">
                    
                            <a href="#" class="black-btn" id="edit-project-kanban-btn" data-project-id="${project.Project_ID}">Edit</a>
                            <a href="#" class="black-btn" id="view-project-kanban-btn">View</a>
                          </div>
               
                      </div>`
          cardBottom = `
                      <div class="project-card-bottom">
                          <div class="project-card-task-count">
                          
                          </div>
                      
                          <div class="project-card-due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${project.Due_Date}</p>
                          </div>
                      </div>`;
        } else {
          cardTop = `<div class="project-card-top">         
                        <p>${project.Project_Title}</p>
             
                        <a href="#" class="black-btn" id="view-project-kanban-btn">View</a>
                    </div>`
          cardBottom = `
                      <div class="project-card-bottom">
                          <div class="project-card-task-count">
                            <i class="fa fa-solid fa-list-check"></i>
                            <p>${project.Task_Count} Tasks Remaining<p>
                          </div>
                      
                          <div class="project-card-due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${project.Due_Date}</p>
                          </div>
                      </div>`;
        }

        projectCard.innerHTML = `
                                  ${cardTop}
                                  <div class="project-card-progress">
                                      <div class="project-card-progress-info">
                                          <p>Progress</p>
                                          <p>${Math.round(projectProgress)}%</p>
                                      </div>
                                      <div class="project-card-progress-bar">
                                          <div class="project-card-progress-bar-inner"></div>
                                      </div>
                                  </div>
    
                                  ${cardBottom}
                            
                              `;

        const progressBar = projectCard.querySelector(
          ".project-card-progress-bar-inner"
        );


        progressBar.style.width = `${projectProgress.toFixed(2)}%`;

        if (projectProgress === 0) {
          progressBar.style.border = "2px solid #E6757E";
        }

        if (projectProgress <= 33) {
          progressBar.style.backgroundColor = "#E6757E";
        } else if (projectProgress <= 66) {
          progressBar.style.backgroundColor = "#EAB385";
        } else if (projectProgress <= 100) {
          progressBar.style.backgroundColor = "#ADDA9D";
        }

        container.appendChild(projectCard);

        //Links to project kanban
        projectCard
          .querySelector(".project-card-top #view-project-kanban-btn")
          .addEventListener("click", (e) => {
            e.preventDefault();

            sessionStorage.setItem("clicked-project-id", project.Project_ID);
            window.dispatchEvent(new Event("storage"));

            const navItems = document.querySelectorAll(".nav-item");
            navItems.forEach((item) => item.classList.remove("active"));

            const linkItem = document.querySelector("#current-project");
            linkItem.style.display = "block";
            linkItem.classList.add("active");
            document
              .querySelector(".nav-item#projects")
              .classList.add("active");

            const navItemContents =
              document.querySelectorAll(".nav-item-content");
            navItemContents.forEach((item) => item.classList.remove("open"));
            const contentArea = document.querySelector(
              "#current-project-content"
            );
            contentArea.classList.add("open");
          });
        };




      container.addEventListener("click", (e) => {
        if (e.target.id === "edit-project-kanban-btn") {
          const projectID = e.target.getAttribute("data-project-id");
          const project = projectData.find(p => p.Project_ID == projectID);
          const gridContainerSelector = `#${e.target.closest('.project-item-content').id} #gridContainer`;
          const containerStatus = e.target.closest('.project-item-content').getAttribute('data-status');
          openEditProjectModal(project, containerStatus, gridContainerSelector);
        }
      });


    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }



  function openEditProjectModal(project, statusContainer, containerSelector) {
    const editProjectModal = document.querySelector('#edit-projects-modal');
    editProjectModal.querySelector('.modal-header p').innerText = `Edit Project #${project.Project_ID}`;
    //Make Input fields show current project data
    const teamLeaderEditDropdown = editProjectModal.querySelector('#team-leader');
    fetchUsers(teamLeaderEditDropdown);
    editProjectModal.querySelector('#task-title').value = project.Project_Title;
    editProjectModal.querySelector('#team-leader-dropdown').value = project.Project_Leader;
    editProjectModal.querySelector('#start-date-project').value = new Date(project.Start_Date).toISOString().split('T')[0];
    editProjectModal.querySelector('#date-project').value = project.Due_Date;
    editProjectModal.style.display = 'flex';

    const editProjectBtn = editProjectModal.querySelector('.edit-project-btn');
    editProjectBtn.addEventListener('click', async () =>{
      const projectTitle = editProjectModal.querySelector('#task-title').value;
      const projectTeamLeader = editProjectModal.querySelector('#team-leader-dropdown').value;
      const projectStartDate = editProjectModal.querySelector('#start-date-project').value;
      const projectDueDate = editProjectModal.querySelector('#date-project').value;
      const projectID = project.Project_ID;
      //HERE CALL A FUNCTION TO EDIT PROJECT ENTRY IN DATABASE
      //CALL fetchProjectsData(x,y,z) WITH THE CORRECT Status and Container Selector (from parameters of this function)

      editProjectModal.style.display = 'none';
    })

    const closeProjectEditBtn = editProjectModal.querySelector('.close-modal-btn');
    closeProjectEditBtn.addEventListener('click', () => {
      editProjectModal.style.display = 'none';
    });
  }




  //takes an optional UserID for Employee veiw of progress on projects 
  async function fetchTasksData(projectID, userID = null) {
    try {
      let url = `Projects/query/get-tasks-db.php?projectID=${encodeURIComponent(projectID)}`;
      if (userID) {
        url += `&userID=${encodeURIComponent(userID)}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch users")
      };

      const tasksData = await response.json();
      return tasksData;
    } catch (error) {
      console.error("Error fetching Task Data for Progress:", error);
      return [];
    }
  }

//Task Progress
  function getTaskProgress(task) {
    const { Man_Hours, Status, Priority} = task;
    const priorityWeighting = getPriority(Priority);
    let manHoursCompleted = 0;
    if (Status === "Completed") {
      manHoursCompleted = Man_Hours;
    } else if (Status === "In Progress") {
      manHoursCompleted = 0.5 * Man_Hours;
    } else {
      manHoursCompleted = 0;
    }
 
    return (manHoursCompleted / Man_Hours) * priorityWeighting;
  }

  function getPriority(priority) {
    switch (priority) {
      case 'High':
        return 1.5;
      case 'Medium':
        return 1;
      case 'Low':
        return 0.5;
      default:
        return 1;
    }
  }

  async function getProjectProgress(projectID, userID = null) {

    const tasksData = await fetchTasksData(projectID, userID);
    if (tasksData.length === 0) {
      return 0;
    }
    let totalTaskProgress = 0;
    let totalPriorityWeighting = 0;

    for (let i = 0; i < tasksData.length; i++) {
      const taskProgress = getTaskProgress(tasksData[i]);
      const priorityWeighting = getPriority(tasksData[i].Priority);
      totalTaskProgress += taskProgress;
      totalPriorityWeighting += priorityWeighting;
    }

    const averageTaskProgress = totalTaskProgress / totalPriorityWeighting;

    return averageTaskProgress * 100;
  }


  // Fetch Users for Team Leader Selection
  async function fetchUsers(dropdown) {
    try {
      const response = await fetch("Projects/query/fetch-users.php");
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();

      // Clear existing options
      dropdown.innerHTML =
        '<option value="" selected disabled hidden>Choose</option>';

      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.User_ID;
        option.textContent = `${user.User_ID} - ${user.Forename} ${user.Surname}`;
        dropdown.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  // Open Add Project Modal & Fetch Users
  addProjectBtn.addEventListener("click", () => {
    addProjectModal.style.display = "flex";
    const title = addProjectModal.querySelector("#task-title");
    title.value ="";
    const teamLeader = teamLeaderDropdownInput;
    teamLeader.value ="";
    const startDate = addProjectModal.querySelector(
      "#start-date-project"
    );
    startDate.value ="";
    const dueDate = addProjectModal.querySelector("#date-project");
    dueDate.value ="";
    fetchUsers(teamLeaderDropdown); // Load Team Leaders dynamically
  });

  // Close Modal
  closeAddProjectModal.addEventListener("click", () => {
    addProjectModal.style.display = "none";
  });

  // Submit New Project Data
  submitAddProject.addEventListener("click", async function () {
    const title = addProjectModal.querySelector("#task-title").value;
    const teamLeader = teamLeaderDropdownInput.value;
    const startDate = addProjectModal.querySelector(
      "#start-date-project"
    ).value;
    const dueDate = addProjectModal.querySelector("#date-project").value;

    if (!title || !teamLeader || !startDate || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Validation: Start Date should not be in the past
    if (startDate < today) {
      alert("Start date cannot be in the past.");
      return;
    }

    // Validation: Due Date should not be earlier than Start Date
    if (dueDate < startDate) {
      alert("Due date cannot be earlier than the start date.");
      return;
    }

    const projectData = {
      title: title,
      teamLeader: teamLeader,
      startDate: startDate,
      dueDate: dueDate,
    };

    try {
      const response = await fetch("Projects/query/add-project.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert("Project successfully added!");
        addProjectModal.style.display = "none";
        fetchProjectsData(
          userProjectsID,
          { status: "Active" },
          "#active-project-content #gridContainer"
        );
      } else {
        alert("Failed to add project. Try again.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred. Please try again.");
    }
  });




const searchBarProjects = document.querySelectorAll(
  ".project-search #searched-project"
);

searchBarProjects.forEach((bar) => {
  bar.addEventListener("input", () => {
    const searchValue = bar.value.toLowerCase();
    const allProjects = document.querySelectorAll(".project-card");
    let foundProjects = 0;
    allProjects.forEach((project) => {
      const projectTitle = project
        .getAttribute("data-project-title")
        .toLowerCase();
  
      if (projectTitle.includes(searchValue)) {
        foundProjects++;
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
    if (foundProjects === 0) {
      document.querySelector(".search-error-msg").style.display = "block";
    } else {
      document.querySelector(".search-error-msg").style.display = "none";
    }
  });  
});




const leaderProjectCard = document.querySelector("#leader-project-card");
if (leaderProjectCard) {
  leaderProjectCard
    .querySelector(".project-card-top a")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const navItems = document.querySelectorAll(".nav-item");
      navItems.forEach((item) => item.classList.remove("active"));

      const linkItem = document.querySelector("#current-project");
      linkItem.style.display = "block";
      linkItem.classList.add("active");
      document.querySelector(".nav-item#projects").classList.add("active");

      const navItemContents = document.querySelectorAll(".nav-item-content");
      navItemContents.forEach((item) => item.classList.remove("open"));
      const contentArea = document.querySelector("#current-project-content");
      contentArea.classList.add("open");
    });
}

//Filter Projects Modal
const openProjectsFilterBtn = document.querySelector(
  "#project-content .project-filter-container .filter-project-btn"
);


openProjectsFilterBtn.addEventListener("click", () => {
  projectsFilterModal.style.display = "block";
});
const closeProjectFilterModal = projectsFilterModal.querySelector(
  ".modal-box .modal-header .close-modal-btn"
);
closeProjectFilterModal.addEventListener("click", () => {
  projectsFilterModal.style.display = "none";
});

//Switch Buttons for different project pages
const projectItems = document.querySelectorAll(
  ".project-switch-buttons .project-item"
);
const projectItemContents = document.querySelectorAll(".project-item-content");

function openProjectContent(pageId) {
  const projectItem = document.querySelector(`#${pageId}`);
  projectItems.forEach((item) => item.classList.remove("active"));
  projectItem.classList.add("active");

  projectItemContents.forEach((item) => item.classList.remove("open"));
  const projectItemContent = document.querySelector(
    `#${projectItem.id}-content`
  );
  projectItemContent.classList.add("open");
}

projectItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    openProjectContent(item.id);
  });
});
