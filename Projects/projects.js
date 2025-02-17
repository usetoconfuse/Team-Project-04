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

    searchBarProjects.forEach((bar) => {
      bar.value = "";
      document.querySelector(".search-error-msg").style.display = "none";
    });
  });

  document
    .querySelector("#not-started-project")
    .addEventListener("click", () => {
      fetchProjectsData(
        userProjectsID,
        { status: "Not Started" },
        "#not-started-project-content #gridContainer"
      );
      searchBarProjects.forEach((bar) => {
        bar.value = "";
        document.querySelector(".search-error-msg").style.display = "none";
      });
    });

  document.querySelector("#archive-project").addEventListener("click", () => {
    fetchProjectsData(
      userProjectsID,
      { status: "Archived" },
      "#archive-project-content #gridContainer"
    );
    searchBarProjects.forEach((bar) => {
      bar.value = "";
      document.querySelector(".search-error-msg").style.display = "none";
    });
  });

  document.querySelector("#completed-project").addEventListener("click", () => {
    fetchProjectsData(
      userProjectsID,
      { status: "Completed" },
      "#completed-project-content #gridContainer"
    );
    searchBarProjects.forEach((bar) => {
      bar.value = "";
      document.querySelector(".search-error-msg").style.display = "none";
    });
  });
}
const projectsFilterModal = document.querySelector(
  "#project-content #project-filter-modal"
);
//Filter Projects Functionality
const filterProjectsBtn = projectsFilterModal.querySelector(".add-filter-btn");
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
const closeAddProjectModal = addProjectModal.querySelector(".close-modal-btn");
const submitAddProject = addProjectModal.querySelector("#add-project-btn");
const teamLeaderDropdown = addProjectModal.querySelector("#team-leader");
const teamLeaderDropdownInput = addProjectModal.querySelector(
  "#team-leader-dropdown"
);

//Fetch all project data for this user and display on page
async function fetchProjectsData(userID, filters = {}, containerSelector) {
  try {
    console.log("Fetching project data running");
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
    console.log(container);
    container.innerHTML = "";

    const response = await fetch(url, params);
    

    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }


    const projectData = await response.json();
    
    if (projectData.length === 0) {
      container.parentElement.querySelector(".search-error-msg").style.display =
        "block";
      return;
    }

    for (const project of projectData) {
      const projectCard = document.createElement("div");
      projectCard.classList.add("project-card");
      projectCard.setAttribute("data-project-id", project.Project_ID);
      projectCard.setAttribute("data-project-title", project.Project_Title);
      

      //Sawan
      


      let projectProgress;
      if (userRole === "Admin") {
        projectProgress = await getProjectProgress(project.Project_ID);
      } else if (userRole === "Employee") {
        projectProgress = await getProjectProgress(
          project.Project_ID,
          userProjectsID
        );
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
               
                      </div>`;
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
        cardTop = `<div class="project-card-top ">         
                        <p>${project.Project_Title}</p>
             
                        <a href="#" class="black-btn" id="view-project-kanban-btn">View</a>
                    </div>`;

        // Check if the global project leader matches the project leader
      if (project.Project_Leader === userProjectsID) {
        console.log({project}, project.Project_Leader, userProjectsID);
        console.log("Global project leader is the same as the project leader.");
        projectCard.classList.add("leader-project");
        
        // Add leading project text or icon to the header
        cardTop = `<div class="project-card-top">
    <p>${project.Project_Title}</p>
    <div class="leading-project-text">
        <i class="fa fa-user-tie"></i> Leader
    </div>
    <div class="project-card-top-btns">
        <a href="#" class="black-btn" id="view-project-kanban-btn">View</a>
    </div>
</div>`;
        
      } else {
        console.log("Global project leader does NOT match the project leader.");
        
      }

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

          //Sawan Session Storage send flag if leading on the project or not
          if (project.Project_Leader === userProjectsID) {
            sessionStorage.setItem("leading-on-project", "true");
          } else {
            sessionStorage.setItem("leading-on-project", "false");
          }
          sessionStorage.setItem("clicked-project-id", project.Project_ID);
          sessionStorage.setItem("clicked-project-status", project.Status);
          sessionStorage.setItem(
            "clicked-project-completion",
            project.Completion_Date
          );

          const params = new URLSearchParams(window.location.search);
          params.set("page", "current-project");
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${params.toString()}`
          );

          window.dispatchEvent(new Event("storage"));
        });
    }

    container.addEventListener("click", (e) => {
      if (e.target.id === "edit-project-kanban-btn") {
        const projectID = e.target.getAttribute("data-project-id");
        const project = projectData.find((p) => p.Project_ID == projectID);
        const gridContainerSelector = `#${
          e.target.closest(".project-item-content").id
        } #gridContainer`;
        const containerStatus = e.target
          .closest(".project-item-content")
          .getAttribute("data-status");
        openEditProjectModal(project, containerStatus, gridContainerSelector);
      }
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}

//Mark As Complete
const completeProjectModal = document.querySelector("#complete-project-modal");
completeProjectModal
  .querySelector("#cancel-complete-btn")
  .addEventListener("click", () => {
    completeProjectModal.style.display = "none";
  });
completeProjectModal
  .querySelector("#complete-project-confirm")
  .addEventListener("click", async () => {
    const completedProjectID =
      completeProjectModal.getAttribute("data-project-id");
    const response = await markProjectUpdate(
      completedProjectID,
      "Completed",
      "Active",
      "#active-project-content #gridContainer"
    );
    if (response.ok) {
      sendToast(`Completed Project #${completedProjectID}`);
      completeProjectModal.style.display = "none";
      editProjectModal.style.display = "none";
    }
  });

//Archive Project
const archiveProjectModal = document.querySelector("#archive-project-modal");
archiveProjectModal
  .querySelector("#cancel-archive-btn")
  .addEventListener("click", () => {
    archiveProjectModal.style.display = "none";
  });
archiveProjectModal
  .querySelector("#archive-project-confirm")
  .addEventListener("click", async () => {
    const archivedProjectID =
      archiveProjectModal.getAttribute("data-project-id");
    const currentStatusContainer = archiveProjectModal.getAttribute(
      "current-status-container"
    );
    const currentgridContainer = archiveProjectModal.getAttribute(
      "current-grid-container"
    );
    const response = await markProjectUpdate(
      archivedProjectID,
      "Archived",
      currentStatusContainer,
      currentgridContainer
    );
    if (response.ok) {
      sendToast(`Archived Project #${archivedProjectID}`);
      archiveProjectModal.style.display = "none";
      editProjectModal.style.display = "none";
    }
  });

//Delete Project
const deleteProjectModal = document.querySelector("#delete-project-modal");
deleteProjectModal
  .querySelector("#cancel-delete-btn")
  .addEventListener("click", () => {
    deleteProjectModal.style.display = "none";
  });
deleteProjectModal
  .querySelector("#delete-project-confirm")
  .addEventListener("click", async () => {
    const deletedProjectID = deleteProjectModal.getAttribute("data-project-id");
    const currentStatusContainer = deleteProjectModal.getAttribute(
      "current-status-container"
    );
    const currentgridContainer = deleteProjectModal.getAttribute(
      "current-grid-container"
    );
    const response = await markProjectUpdate(
      deletedProjectID,
      "Deleted",
      currentStatusContainer,
      currentgridContainer
    );
    if (response.ok) {
      sendToast(`Deleted Project #${deletedProjectID}`);
      deleteProjectModal.style.display = "none";
      editProjectModal.style.display = "none";
    }
  });

//Active Project
const activeProjectModal = document.querySelector("#active-project-modal");
activeProjectModal
  .querySelector(".cancel-active-btn")
  .addEventListener("click", () => {
    activeProjectModal.style.display = "none";
  });
activeProjectModal
  .querySelector("#active-project-confirm")
  .addEventListener("click", async () => {
    const activeProjectID = activeProjectModal.getAttribute("data-project-id");
    const currentStatusContainer = activeProjectModal.getAttribute(
      "current-status-container"
    );
    const currentgridContainer = activeProjectModal.getAttribute(
      "current-grid-container"
    );
    const response = await markProjectUpdate(
      activeProjectID,
      "Active",
      currentStatusContainer,
      currentgridContainer
    );
    if (response.ok) {
      sendToast(`Reactivated Project #${activeProjectID}`);
      activeProjectModal.style.display = "none";
      editProjectModal.style.display = "none";
    }
  });

const editProjectModal = document.querySelector("#edit-projects-modal");
const editProjectBtn = editProjectModal.querySelector(".edit-project-btn");
//initialise the edit project details fields
editProjectBtn.addEventListener("click", async () => {
  const projectTitle = editProjectModal.querySelector("#task-title").value;
  const projectTeamLeader = editProjectModal.querySelector(
    "#team-leader-dropdown"
  ).value;
  const projectStartDate = editProjectModal.querySelector(
    "#start-date-project"
  ).value;
  const projectDueDate = editProjectModal.querySelector("#date-project").value;
  const projectID = editProjectModal.getAttribute("data-project-id");
  const currentStatusContainer = editProjectModal.getAttribute(
    "current-status-container"
  );
  const currentgridContainer = editProjectModal.getAttribute(
    "current-grid-container"
  );
  await editProjectEntry(
    projectTitle,
    projectTeamLeader,
    projectStartDate,
    projectDueDate,
    projectID,
    currentStatusContainer,
    currentgridContainer
  );
  editProjectModal.style.display = "none";
});

async function editProjectEntry(
  title,
  leader,
  start,
  due,
  projectId,
  statusCont,
  gridContainer
) {
  try {
    const projectData = {
      title: title,
      leader: leader,
      start: start,
      due: due,
      projectId: projectId,
    };
    const response = await fetch("Projects/query/edit-project-entry.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      sendToast(`Error editing project status`);
      throw new Error("Failed to mark project as complete");
    } else {
      fetchProjectsData(userProjectsID, { status: statusCont }, gridContainer);
      sendToast(`Project #${projectId} Edited`);
    }
  } catch (error) {
    console.error("Error adding project:", error);
    sendToast("An error occurred. Please try again.");
    return;
  }
}

//Edit Actions for Projects (Admin Only)
function openEditProjectModal(project, statusContainer, containerSelector) {
  if (statusContainer === "Active") {
    editProjectModal.querySelector(".edit-project-btn").style.display = "flex";
    editProjectModal.querySelector(".complete-project-btn").style.display =
      "flex";
    editProjectModal.querySelector(".archive-project-btn").style.display =
      "flex";
    editProjectModal.querySelector(".active-project-btn").style.display =
      "none";
  } else if (statusContainer === "Not Started") {
    editProjectModal.querySelector(".edit-project-btn").style.display = "flex";
    editProjectModal.querySelector(".complete-project-btn").style.display =
      "none";
    editProjectModal.querySelector(".archive-project-btn").style.display =
      "flex";
    editProjectModal.querySelector(".active-project-btn").style.display =
      "none";
  } else if (statusContainer === "Archived") {
    editProjectModal.querySelector(".edit-project-btn").style.display = "none";
    editProjectModal.querySelector(".complete-project-btn").style.display =
      "none";
    editProjectModal.querySelector(".archive-project-btn").style.display =
      "none";
    editProjectModal.querySelector(".active-project-btn").style.display =
      "flex";
  } else if (statusContainer === "Completed") {
    editProjectModal.querySelector(".edit-project-btn").style.display = "none";
    editProjectModal.querySelector(".complete-project-btn").style.display =
      "none";
    editProjectModal.querySelector(".archive-project-btn").style.display =
      "flex";
    editProjectModal.querySelector(".active-project-btn").style.display =
      "flex";
  }

  //EDIT PROJECT
  editProjectModal.querySelector(
    ".modal-header p"
  ).innerText = `Edit Project #${project.Project_ID}`;
  //Make Input fields show current project data
  const teamLeaderEditDropdown = editProjectModal.querySelector("#team-leader");
  fetchUsers(teamLeaderEditDropdown);

  editProjectModal.querySelector("#task-title").value = project.Project_Title;
  editProjectModal.querySelector("#team-leader-dropdown").value =
    project.Project_Leader;
  editProjectModal.querySelector("#start-date-project").value = new Date(
    project.Start_Date
  )
    .toISOString()
    .split("T")[0];
  editProjectModal.querySelector("#date-project").value = project.Due_Date;
  editProjectModal.setAttribute("data-project-id", project.Project_ID);
  editProjectModal.setAttribute("current-grid-container", containerSelector);
  editProjectModal.setAttribute("current-status-container", statusContainer);
  editProjectModal.style.display = "flex";

  //Initialise the Complete Modal
  editProjectModal
    .querySelector(".complete-project-btn")
    .addEventListener("click", () => {
      completeProjectModal.querySelector(
        ".modal-header"
      ).innerText = `Complete Project #${project.Project_ID}`;
      completeProjectModal.querySelector(
        ".modal-body"
      ).innerText = `Project #${project.Project_ID}: ${project.Project_Title} will be marked as completed. Are you sure?`;
      completeProjectModal.setAttribute("data-project-id", project.Project_ID);
      completeProjectModal.style.display = "flex";
    });

  //Initialise the Archive Modal
  editProjectModal
    .querySelector(".archive-project-btn")
    .addEventListener("click", () => {
      archiveProjectModal.querySelector(
        ".modal-header"
      ).innerText = `Archive Project #${project.Project_ID}`;
      archiveProjectModal.querySelector(
        ".modal-body"
      ).innerText = `Project #${project.Project_ID}: ${project.Project_Title} will be moved to archive. Are you sure?`;
      archiveProjectModal.setAttribute("data-project-id", project.Project_ID);
      archiveProjectModal.setAttribute(
        "current-grid-container",
        containerSelector
      );
      archiveProjectModal.setAttribute(
        "current-status-container",
        statusContainer
      );
      archiveProjectModal.style.display = "flex";
    });

  //Initialise the Delete Modal
  editProjectModal
    .querySelector(".delete-project-btn")
    .addEventListener("click", () => {
      deleteProjectModal.querySelector(
        ".modal-header"
      ).innerText = `Delete Project #${project.Project_ID}`;
      deleteProjectModal.querySelector(
        ".modal-body"
      ).innerText = `Project #${project.Project_ID}: ${project.Project_Title} will be deleted permanently. Are you sure?`;
      deleteProjectModal.setAttribute("data-project-id", project.Project_ID);
      deleteProjectModal.setAttribute(
        "current-grid-container",
        containerSelector
      );
      deleteProjectModal.setAttribute(
        "current-status-container",
        statusContainer
      );
      deleteProjectModal.style.display = "flex";
    });

  //Initialise the Active Modal
  editProjectModal
    .querySelector(".active-project-btn")
    .addEventListener("click", () => {
      activeProjectModal.querySelector(
        ".modal-header"
      ).innerText = `Reactivate Project #${project.Project_ID}`;
      activeProjectModal.querySelector(
        ".modal-body"
      ).innerText = `Project #${project.Project_ID}: ${project.Project_Title} will be reactivted. Are you sure?`;
      activeProjectModal.setAttribute("data-project-id", project.Project_ID);
      activeProjectModal.setAttribute(
        "current-grid-container",
        containerSelector
      );
      activeProjectModal.setAttribute(
        "current-status-container",
        statusContainer
      );
      activeProjectModal.style.display = "flex";
    });

  const closeProjectEditBtn =
    editProjectModal.querySelector(".close-modal-btn");
  closeProjectEditBtn.addEventListener("click", () => {
    editProjectModal.style.display = "none";
  });
}

async function markProjectUpdate(
  projectID,
  projectStatus,
  statusCont,
  gridContainer
) {
  try {
    const projectData = {
      projectID: projectID,
      status: projectStatus,
    };
    const response = await fetch("Projects/query/mark-update-project.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (!response.ok) {
      sendToast(`Error editing project status`);
      throw new Error("Failed to mark project as complete");
    } else {
      fetchProjectsData(userProjectsID, { status: statusCont }, gridContainer);
      return response;
    }
  } catch (error) {
    console.error("Error adding project:", error);
    sendToast("An error occurred. Please try again.");
    return
  }
}

//takes an optional UserID for Employee veiw of progress on projects
async function fetchTasksData(projectID, userID = null) {
  try {
    let url = `Projects/query/get-tasks-db.php?projectID=${encodeURIComponent(
      projectID
    )}`;
    if (userID) {
      url += `&userID=${encodeURIComponent(userID)}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const tasksData = await response.json();
    return tasksData;
  } catch (error) {
    console.error("Error fetching Task Data for Progress:", error);
    return [];
  }
}

//Task Progress
function getTaskProgress(task) {
  const { Man_Hours, Status, Priority } = task;
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
    case "High":
      return 1.5;
    case "Medium":
      return 1;
    case "Low":
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


//fetch project for dropdown
// Fetch Users for Team Leader Selection
async function fetchProjects(dropdown) {
  try {
    const response = await fetch("Projects/query/fetch-projects.php");
    if (!response.ok) throw new Error("Failed to fetch projects");

    const projects = await response.json();

    // Clear existing options
    dropdown.innerHTML =
      '<option value="" selected disabled hidden>Choose</option>';

    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.Project_ID;
      option.textContent = `${project.Project_ID} - ${project.Project_Title}`;
      dropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
}




const addTaskButton = addProjectModal.querySelector("#add-task-btn");
const addProjectModalForm = addProjectModal.querySelector('#project-modal-form');
// Open Add Project Modal & Fetch Users

if (userRole == 'Admin') {
addProjectBtn.addEventListener("click", () => {
  addProjectModal.style.display = "flex";
  addTaskButton.style.display = "none";
  addProjectModalForm.style.display = "block";
  submitAddProject.style.display = "flex";
  const title = addProjectModal.querySelector("#task-title");
  title.value = "";
  const teamLeader = teamLeaderDropdownInput;
  teamLeader.value = "";
  const startDate = addProjectModal.querySelector("#start-date-project");
  startDate.value = "";
  const dueDate = addProjectModal.querySelector("#date-project");
  dueDate.value = "";
  fetchUsers(teamLeaderDropdown); // Load Team Leaders dynamically
});

// Close Modal
closeAddProjectModal.addEventListener("click", () => {
  addProjectModal.style.display = "none";
});

submitAddProject.addEventListener("click", async function () {
  const title = addProjectModal.querySelector("#task-title").value;
  const teamLeader = teamLeaderDropdownInput.value;
  const startDate = addProjectModal.querySelector("#start-date-project").value;
  const dueDate = addProjectModal.querySelector("#date-project").value;


  if (!title || !teamLeader || !startDate || !dueDate) {
    sendToast("Please fill in all fields.");
    return;
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Validation: Start Date should not be in the past
  if (startDate < today) {
    sendToast("Start date cannot be in the past.");
    return;
  }

  // Validation: Due Date should not be earlier than Start Date
  if (dueDate < startDate) {
    sendToast("Due date cannot be earlier than the start date.");
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
      sendToast("Project Added Successfully");
      //addProjectModal.style.display = "none";
      addTaskButton.style.display = "block";
      addProjectModalForm.style.display = "none";
      submitAddProject.style.display = "none";
      addTaskButton.onclick = async() => {
        addTaskModalProj.style.display = "flex";
        addTaskModalProj.querySelector(".modal-body").reset();

        const updatedProjDropdown = addTaskModalProj.querySelector('#task-project');
        await fetchProjects(updatedProjDropdown);
        const selectedDataList = addTaskModalProj.querySelector('#task-project :last-child');
        addTaskModalProj.querySelector("#task-project-dropdown").value = selectedDataList.value;

      }


      fetchProjectsData(
        userProjectsID,
        { status: "Active" },
        "#active-project-content #gridContainer"
      );
    } else {
      sendToast("Failed to add new project");
      return;
    }
  } catch (error) {
    console.error("Error adding project:", error);
    sendToast("An error occurred. Please try again.");
    return;
  }
});

}

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

/*
openProjectsFilterBtn.addEventListener("click", () => {
  projectsFilterModal.style.display = "block";
});
const closeProjectFilterModal = projectsFilterModal.querySelector(
  ".modal-box .modal-header .close-modal-btn"
);
closeProjectFilterModal.addEventListener("click", () => {
  projectsFilterModal.style.display = "none";
});*/

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

//Sawan

//Add Task Modal Functionality
const addTaskBtnProj = document.querySelector("#add-task-proj-btn");
const addTaskModalProj = document.querySelector("#add-task-modal-proj");
const closeAddTaskModalProj = addTaskModalProj.querySelector(".close-modal-btn");
const empDropdown = addTaskModalProj.querySelector('#task-user');
const projectDropdown = addTaskModalProj.querySelector('#task-project');
fetchUsers(empDropdown);
fetchProjects(projectDropdown);

addTaskBtnProj.addEventListener("click", () => {
  addTaskModalProj.style.display = "flex";
  
  
});

closeAddTaskModalProj.addEventListener("click", () => {
  addTaskModalProj.style.display = "none";
});

//====Add Task Modal Functionality
const confirmAddTaskProj = addTaskModalProj.querySelector('.add-task-btn')
confirmAddTaskProj.onclick = () => {
  //Get the values from the form
  
  const taskName = addTaskModalProj.querySelector('#task-title').value;
  const taskDescription = addTaskModalProj.querySelector('#task-description').value;
  const taskPriority = addTaskModalProj.querySelector('#priority').value;
  const taskDueDate = addTaskModalProj.querySelector('#date-input').value;
  const Assignee_ID = addTaskModalProj.querySelector('#task-user-dropdown').value;
  const authorID = parseInt(userProjectsID);
  const projectID = addTaskModalProj.querySelector('#task-project-dropdown').value;
  const manHours = parseInt(addTaskModalProj.querySelector('#man-hours-input').value);
  const startDate = addTaskModalProj.querySelector('#start-date-input').value;

  const errorText = addTaskModalProj.querySelector('#error-adding-message');
  console.log(errorText);

  console.log(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, manHours, startDate, authorID, projectID);

  const todays_date = new Date().toISOString().split('T')[0]

  console.log(addTaskModalProj.querySelector('.task-dropdown-start-date'));

  //Validaiton for the form fields
  if (!taskName || !taskDescription || !taskPriority || !taskDueDate || !Assignee_ID || !manHours || !startDate) {
    errorText.innerText = "Please fill in all the fields";
    errorText.style.display = 'block';
    return
  }
  
  if (manHours <= 0) {
    errorText.innerText = 'Man Hours has to be greater than 0';
    errorText.style.display = 'block';
    return
  }

  if (startDate > taskDueDate) {
    errorText.innerText = 'Start Date cannot be after the Due Date of the task';
    errorText.style.display = 'block';
    return 
  }

  //Check project deadline if task due date or start date is greater than project deadline
  //Sawan
  
  /*
  //Task cannot start or begin after project deadline
  if (taskDueDate > globalProjectDeadline || startDate > globalProjectDeadline) {
    errorText.innerText = `Task Due Date or Start Date cannot be past the project deadline: ${globalProjectDeadline}}`;
    errorText.style.display = 'block';
    return
  }
  */
  //today's date
  

  //if task due date is lower than today's date its not possible
  if (taskDueDate < todays_date) {
    errorText.innerText = 'Task Due Date cannot be in the past';
    errorText.style.display = 'block';
    return
  }

  if (startDate < todays_date) {
    errorText.innerText = 'Start date cannot be before today';
    errorText.style.display = 'block';
    return
  }



  errorText.style.display = 'none';
  addProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, manHours, startDate, authorID, projectID)
  addTaskModalProj.style.display = 'none';
  //Pass in task name




}

async function addProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, manHours, startDate, authorID, projectID) {
  console.log('function being run database');

  try {
    const url = 'Project-Kanban/addTaskProject.php';
    
    const data = {
      Name: taskName,
      Description: taskDescription,
      Status: "To Do",
      Due_Date: taskDueDate,
      Priority: taskPriority,
      Author_ID: authorID,
      Project_ID: projectID,
      Assignee_ID: Assignee_ID,
      Man_Hours: manHours,
      Start_Date: startDate
    };

    console.log(data);

    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      console.log(response);
    } else {
      sendToast(`Task has been successfully added!`);
      getProjectTable(globalSelectedProjectID);
      console.log('Task has been added');
    }

  } catch (error) {
    console.log("Error updating the task status", error);
  }
}