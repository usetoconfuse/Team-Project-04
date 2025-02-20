//Assignining the global variables that are needed
let globalSelectedProjectID = null;
let globalSelectedProjectStatus = null;
let globalSelectedProjectCompletion = null;
let globalUserID = null;
let globalProjectDeadline = null;
let leadingFuncProject;

//Storage function to get data from the session storage

window.addEventListener("storage", function () {
  const selectedProjectID = sessionStorage.getItem("clicked-project-id");
  const selectedProjectStatus = sessionStorage.getItem(
    "clicked-project-status"
  );
  const selectedProjectCompletion = sessionStorage.getItem(
    "clicked-project-completion"
  );
  leadingFuncProject = sessionStorage.getItem("leading-on-project");

  globalSelectedProjectStatus = selectedProjectStatus;
  globalSelectedProjectID = selectedProjectID;
  globalSelectedProjectCompletion = selectedProjectCompletion;
  console.log(selectedProjectID);

  //Navigation Bar Active Link
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

  //Get the project name to render the page
  getAdminProjectName(selectedProjectID);

  const adminKanbanContent = document.querySelector("#admin-kanban-content");

  // Get the user-id from the data-user-id attribute
  globalUserID = adminKanbanContent.getAttribute("data-user-id");

  //Render the table for the project without any filters applied
  getAdminProjectTable(selectedProjectID, {});
});

//Get the project name to render the page
async function getAdminProjectName(selectedProjectID) {
  try {
    let url = `Project-Kanban/kanban-projectName-db.php?projectID=${encodeURIComponent(
      selectedProjectID
    )}`;

    const params = {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }
    document
      .querySelector("#admin-kanban-content")
      .setAttribute("data-project-status", "");
    const projectNameData = await response.json();
    document.querySelector(
      "#admin-kanban-content .project-intro .project-txt p"
    ).innerHTML = projectNameData[0].Project_Title;
    globalProjectDeadline = projectNameData[0].Due_Date;
  } catch (error) {
    console.log("Fetch Issue", error);
  }
}

//Get the project table data
async function getAdminProjectTable(selectedProjectID, filters = {}) {
  try {
    let url = `Project-Kanban/get-project-table-db.php?projectID=${encodeURIComponent(
      selectedProjectID
    )}`;

    const filterQuery = new URLSearchParams(filters).toString();
    url += filterQuery ? `&${filterQuery}` : "";

    const params = {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error("Failed to fetch projects data");
    }
    const adminProjectData = await response.json();
    console.log(adminProjectData);
    populateAdminTasksTable(adminProjectData);
  } catch (error) {
    console.log("Fetch Issue", error);
  }
}
// Function to populate the table with the project data
function populateAdminTasksTable(tableData) {
  const tableBody = document.querySelector(
    "#admin-kanban-content .emp-projectKanban-bottom tbody"
  );
  tableBody.innerHTML = "";
  const headerRow = document.querySelector(
    "#admin-kanban-content .emp-projectKanban-bottom table thead tr"
  );

  //Populate the table with the data
  tableData.forEach((task) => {
    const row = document.createElement("tr");
    let taskStuck;
    if (
      document
        .querySelector("#admin-kanban-content")
        .getAttribute("data-role") === "Admin"
    ) {
      taskStuck = task.Stuck === "2" ? "Yes" : "No";
    } else {
      taskStuck = task.Stuck === "2" || task.Stuck === "1" ? "Yes" : "No";
    }

    //Testing the global variables
    console.log(globalSelectedProjectStatus);
    console.log(globalSelectedProjectCompletion);

    row.innerHTML = `   <td>${task.Task_ID}</td>
                          <td id="emp-task-title">${task.Name}</td>
                          <td><p id="emp-task-status" class="emp-table-status emp-table-status-${task.Status.toLowerCase().replace(
                            /\s+/g,
                            "-"
                          )}">${task.Status}</p></td>
                          <td><p id="emp-task-priority" class="emp-table-priority emp-table-priority-${task.Priority.toLowerCase()}">${
      task.Priority
    }</p></td>
                          <td>${task.Due_Date}</td>
                          <td><p class="stuck-${taskStuck.toLowerCase()}">${taskStuck}</p></td>
                          <td  id="emp-task-assignee">${task.Assignee_ID}: ${
      task.assignee_forename
    } ${task.assignee_surname}</td>
                          <td id="emp-task-author">${task.Author_ID}: ${
      task.assigned_by_forename
    } ${task.assigned_by_surname}</td>`;

    if (
      globalSelectedProjectStatus === "Active" &&
      globalSelectedProjectCompletion === "null"
    ) {
      row.innerHTML += `<td><a class="edit-admin-functionality-btn" data-task-id="${task.Task_ID}">Edit</a></td> 
                          <td><a class="delete-admin-functionality-btn" data-task-id="${task.Task_ID}">Delete</a></td> `;
    }

    if (leadingFuncProject === "true" && task.Stuck === "1") {
      row.innerHTML += `<td><a class="leader-escalate-stuck" id="leader-escalate-stuck" data-task-id="${task.Task_ID}">Escalate</a><td>`;
    }
    tableBody.appendChild(row);
  });

  // Event delegation for escalate buttons
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("leader-escalate-stuck")) {
      const taskID = event.target.getAttribute("data-task-id");
      openEscalateModal(taskID);
    }
  });

  // Event delegation for edit buttons
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-admin-functionality-btn")) {
      const taskID = event.target.getAttribute("data-task-id");
      const task = tableData.find((t) => t.Task_ID == taskID);
      openEditModal(task);
    }
  });

  // Event delegation for delete buttons
  tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-admin-functionality-btn")) {
      const taskID = event.target.getAttribute("data-task-id");
      const taskName = tableData.find((t) => t.Task_ID == taskID).Name;
      openDeleteModal(taskID, taskName);
    }
  });
}
// Function to escalate the stuck status of a task
function openEscalateModal(taskID) {
  const escalateModal = document.querySelector("#escalate-project-task-modal");
  escalateModal.setAttribute("data-task-escalate-id", taskID);
  escalateModal.style.display = "flex";

  const escalateTaskConfirm = escalateModal.querySelector(
    "#escalate-project-task-confirm"
  );
  const newEscalateTaskConfirm = escalateTaskConfirm.cloneNode(true);
  escalateTaskConfirm.parentNode.replaceChild(
    newEscalateTaskConfirm,
    escalateTaskConfirm
  );

  newEscalateTaskConfirm.addEventListener("click", (e) => {
    escalateTask(taskID);
    escalateModal.style.display = "none";
  });

  const closeEscalateModal = escalateModal.querySelector(
    ".cancel-escalate-task-btn"
  );
  const newCloseEscalateModal = closeEscalateModal.cloneNode(true);
  closeEscalateModal.parentNode.replaceChild(
    newCloseEscalateModal,
    closeEscalateModal
  );

  newCloseEscalateModal.addEventListener("click", () => {
    escalateModal.style.display = "none";
  });
}

//Write escaltion to the data base takes in Task ID
async function escalateTask(taskID) {
  try {
    const url = `Project-Kanban/escalate-task-db.php`;

    const data = {
      Task_ID: taskID,
    };

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error("Failed to escalate task");
    } else {
      sendToast(`Task #${taskID} has been escalated as Stuck to Admin`);
      getAdminProjectTable(globalSelectedProjectID);
    }
  } catch (error) {
    console.log("Fetch Issue", error);
  }
}

// Modal to edit the task
function openEditModal(task) {
  let startDateEditable = true;
  const editActionsModal = document.querySelector(
    "#admin-kanban-content .edit-task-modal"
  );
  fetchUsersForEdit();
  editActionsModal.querySelector(
    ".modal-header p"
  ).innerText = `Actions for Task #${task.Task_ID}`;
  editActionsModal.style.display = "block";
  editActionsModal.querySelector("#task-title").value = task.Name;
  editActionsModal.querySelector("#priority").value = task.Priority;
  editActionsModal.querySelector("#date-input").value = task.Due_Date;
  editActionsModal.querySelector("#task-user-dropdown").value =
    task.Assignee_ID;
  editActionsModal.querySelector("#task-description").value = task.Description;
  editActionsModal.querySelector("#man-hours-input").value = task.Man_Hours;
  editActionsModal.querySelector("#start-date-input").value = task.Start_Date;

  const todays_date = new Date().toISOString().split("T")[0];
  const startDate = editActionsModal.querySelector("#start-date-input").value;
  if (startDate < todays_date) {
    editActionsModal.querySelector(".task-dropdown-start-date").style.display =
      "none";
    startDateEditable = false;
    console.log(startDate);
  } else if (startDate > todays_date) {
    editActionsModal.querySelector(".task-dropdown-start-date").style.display =
      "block";
  }
  // Submit the updated task details
  const updateTaskBtn = editActionsModal.querySelector("#update-task-btn");
  updateTaskBtn.onclick = () => {
    const taskName = editActionsModal.querySelector("#task-title").value;
    const taskDescription =
      editActionsModal.querySelector("#task-description").value;
    const taskPriority = editActionsModal.querySelector("#priority").value;
    const taskDueDate = editActionsModal.querySelector("#date-input").value;
    const Assignee_ID = editActionsModal.querySelector(
      "#task-user-dropdown"
    ).value;
    const manHours = editActionsModal.querySelector("#man-hours-input").value;
    const startDate = editActionsModal.querySelector("#start-date-input").value;
    const Task_ID = task.Task_ID;

    const errorText = editActionsModal.querySelector("#error-edit-message");
    console.log(errorText);

    //Validaiton for the form fields
    if (
      !taskName ||
      !taskDescription ||
      !taskPriority ||
      !taskDueDate ||
      !Assignee_ID ||
      !manHours ||
      !startDate ||
      !manHours ||
      !startDate
    ) {
      errorText.innerText = "Please fill in all the fields";
      errorText.style.display = "block";
      return;
    }

    if (manHours <= 0) {
      errorText.innerText = "Man Hours has to be greater than 0";
      errorText.style.display = "block";
      return;
    }

    if (startDate > taskDueDate) {
      errorText.innerText =
        "Start Date cannot be after the Due Date of the task";
      errorText.style.display = "block";
      return;
    }

    //Task cannot start or begin after project deadline
    if (
      taskDueDate > globalProjectDeadline ||
      startDate > globalProjectDeadline
    ) {
      errorText.innerText = `Task Due Date or Start Date cannot be past the project deadline: ${globalProjectDeadline}}`;
      errorText.style.display = "block";
      return;
    }

    if (taskDueDate < todays_date) {
      errorText.innerText = "Task Due Date cannot be in the past";
      errorText.style.display = "block";
      return;
    }

    if (startDateEditable) {
      console.log("start date is editable");
      if (startDate < todays_date) {
        errorText.innerText = "Start date cannot be before today";
        errorText.style.display = "block";
        return;
      }
    }

    updateProjectTasks(
      taskName,
      taskDescription,
      taskPriority,
      taskDueDate,
      Assignee_ID,
      Task_ID,
      manHours,
      startDate
    );
    sendToast(`Task has been successfully updated!`);
    editActionsModal.style.display = "none";
  };

  const closeAdminEditBtn = editActionsModal.querySelector(".close-modal-btn");
  closeAdminEditBtn.onclick = () => {
    errorText = editActionsModal.querySelector("#error-edit-message");
    errorText.innerHTML = "";
    editActionsModal.style.display = "none";
  };
}

// Deleting the task modal
function openDeleteModal(taskID, taskName) {
  const deleteProjectTaskModal = document.querySelector(
    "#admin-kanban-content #delete-project-task-modal"
  );
  deleteProjectTaskModal.querySelector(
    ".modal-header"
  ).innerText = `Delete Task #${taskID}: ${taskName}`;
  deleteProjectTaskModal.querySelector(
    ".modal-body"
  ).innerText = `Are you sure you want to delete Task #${taskID}?`;
  deleteProjectTaskModal.style.display = "flex";

  const deleteProjectTaskConfirm = deleteProjectTaskModal.querySelector(
    "#delete-project-task-confirm"
  );
  deleteProjectTaskConfirm.onclick = () => {
    deleteProjectTask(taskID);
    deleteProjectTaskModal.style.display = "none";
  };

  const closeProjectTaskModal = deleteProjectTaskModal.querySelector(
    "#cancel-delete-task-btn"
  );
  closeProjectTaskModal.onclick = () => {
    deleteProjectTaskModal.querySelector(".modal-header").innerText = "";
    deleteProjectTaskModal.querySelector(".modal-body").innerText = "";
    deleteProjectTaskModal.style.display = "none";
  };
}

// Writing out task deletion to the database
async function deleteProjectTask(projectTaskID) {
  try {
    let url = `Project-Kanban/delete-project-task-db.php?taskID=${encodeURIComponent(
      projectTaskID
    )}`;

    const params = {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      console.log(response);
    } else {
      sendToast(`Task has been successfully deleted!`);
      getAdminProjectTable(globalSelectedProjectID);
    }
  } catch (error) {
    console.log("Fetch Issue", error);
    //Show Error Card
  }
}

const taskDropdown = document.querySelector("#admin-kanban-content #task-user");
async function fetchUsersForEdit() {
  try {
    const response = await fetch("Projects/query/fetch-users.php");
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();

    // Clear existing options
    taskDropdown.innerHTML =
      '<option value="" selected disabled hidden>Choose</option>';

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.User_ID;
      option.textContent = `${user.User_ID} - ${user.Forename} ${user.Surname}`;
      taskDropdown.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Function to update the task details when we edit task
async function updateProjectTasks(
  taskName,
  taskDescription,
  taskPriority,
  taskDueDate,
  Assignee_ID,
  taskID,
  manHours,
  startDate
) {
  try {
    const url = "Project-Kanban/updateTaskDetails.php";

    const data = {
      Name: taskName,
      Description: taskDescription,
      Priority: taskPriority,
      Due_Date: taskDueDate,
      Assignee_ID: Assignee_ID,
      Task_ID: taskID,
      Man_Hours: manHours,
      Start_Date: startDate,
    };

    console.log(data);

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      console.log(response);
    } else {
      getAdminProjectTable(globalSelectedProjectID);
    }
  } catch (error) {
    console.log("Error updating the task status", error);
  }
}

// Stats button links to project stats page
const projStatsBtn = document.querySelector(
  "#admin-kanban-content .view-stats-btn"
);
projStatsBtn.addEventListener("click", () => {
  window.location.assign(
    `${window.location.pathname}?page=stats&view=projects&project=${globalSelectedProjectID}`
  );
});

//====Back to Projects Page Button
const backAdminToProjectsBtn = document.querySelector(
  "#admin-kanban-content .project-intro .projects-intro-buttons .all-projects-btn"
);

backAdminToProjectsBtn.addEventListener("click", backAdminToProjects);
window, addEventListener("projectsLoaded", backAdminToProjects);

function backAdminToProjects() {
  const params = new URLSearchParams(window.location.search);
  params.set("page", "projects");
  window.history.replaceState(
    {},
    "",
    `${window.location.pathname}?${params.toString()}`
  );

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));

  const currentProjectLink = document.querySelector("#current-project");
  currentProjectLink.style.display = "none";
  currentProjectLink.classList.remove("active");
  document.querySelector(".nav-item#projects").classList.add("active");

  const navItemContents = document.querySelectorAll(".nav-item-content");
  navItemContents.forEach((item) => item.classList.remove("open"));
  const currentProjectContentArea = document.querySelector("#projects-content");
  currentProjectContentArea.classList.add("open");
}

//====Add Task Modal
const addProjectTaskBtn = document.querySelector(
  "#admin-kanban-content .add-task-btn"
);
const addProjectTaskModal = document.querySelector(
  "#admin-kanban-content .add-task-modal"
);
const closeProjectAddTaskModal =
  addProjectTaskModal.querySelector(".close-modal-btn");

addProjectTaskBtn.addEventListener("click", () => {
  addProjectTaskModal.style.display = "flex";
  fetchUsersForEdit();
});
closeProjectAddTaskModal.addEventListener("click", () => {
  addProjectTaskModal.style.display = "none";
});
//====Add Task Modal Functionality
const confirmAddTask = addProjectTaskModal.querySelector(".add-task-btn");
confirmAddTask.onclick = () => {
  //Get the values from the form

  const taskName = addProjectTaskModal.querySelector("#task-title").value;
  const taskDescription =
    addProjectTaskModal.querySelector("#task-description").value;
  const taskPriority = addProjectTaskModal.querySelector("#priority").value;
  const taskDueDate = addProjectTaskModal.querySelector("#date-input").value;
  const Assignee_ID = addProjectTaskModal.querySelector(
    "#task-user-dropdown"
  ).value;
  const authorID = globalUserID;
  const projectID = globalSelectedProjectID;
  const manHours = addProjectTaskModal.querySelector("#man-hours-input").value;
  const startDate =
    addProjectTaskModal.querySelector("#start-date-input").value;

  const errorText = addProjectTaskModal.querySelector("#error-adding-message");
  console.log(errorText);

  const todays_date = new Date().toISOString().split("T")[0];

  console.log(addProjectTaskModal.querySelector(".task-dropdown-start-date"));

  //Validaiton for the form fields
  if (
    !taskName ||
    !taskDescription ||
    !taskPriority ||
    !taskDueDate ||
    !Assignee_ID ||
    !manHours ||
    !startDate
  ) {
    errorText.innerText = "Please fill in all the fields";
    errorText.style.display = "block";
    return;
  }

  if (manHours <= 0) {
    errorText.innerText = "Man Hours has to be greater than 0";
    errorText.style.display = "block";
    return;
  }

  if (startDate > taskDueDate) {
    errorText.innerText = "Start Date cannot be after the Due Date of the task";
    errorText.style.display = "block";
    return;
  }

  //Check project deadline if task due date or start date is greater than project deadline
  //Sawan

  //Task cannot start or begin after project deadline
  if (
    taskDueDate > globalProjectDeadline ||
    startDate > globalProjectDeadline
  ) {
    errorText.innerText = `Task Due Date or Start Date cannot be past the project deadline: ${globalProjectDeadline}}`;
    errorText.style.display = "block";
    return;
  }

  //today's date

  //if task due date is lower than today's date its not possible
  if (taskDueDate < todays_date) {
    errorText.innerText = "Task Due Date cannot be in the past";
    errorText.style.display = "block";
    return;
  }

  if (startDate < todays_date) {
    errorText.innerText = "Start date cannot be before today";
    errorText.style.display = "block";
    return;
  }

  errorText.style.display = "none";
  addProjectTasks(
    taskName,
    taskDescription,
    taskPriority,
    taskDueDate,
    Assignee_ID,
    manHours,
    startDate,
    authorID,
    projectID
  );
  addProjectTaskModal.style.display = "none";
  //Pass in task name
};

//Filter Modal Functionality
const filterProjectTaskModal = document.querySelector(
  "#admin-kanban-content #filter-modal"
);
const filterProjectTaskBtn = document.querySelector(
  "#admin-kanban-content  .filter-task-btn"
);
const closeProjectFilterTaskModal = filterProjectTaskModal.querySelector(
  "#filter-modal .close-modal-btn"
);
const filterAppliedAdminMsg = document.querySelector(
  "#admin-kanban-content .filter-applied-msg"
);
const filterRemoveAdminBtn = document.querySelector(
  "#admin-kanban-content .remove-filters-btn"
);
filterProjectTaskBtn.addEventListener("click", () => {
  filterProjectTaskModal.style.display = "flex";
});
closeProjectFilterTaskModal.addEventListener("click", () => {
  filterProjectTaskModal.style.display = "none";
});

// Submit the filters for the project tasks table
const confirmFilterAdminTask =
  filterProjectTaskModal.querySelector("#add-filter-btn");
confirmFilterAdminTask.onclick = () => {
  const filterStuck = filterProjectTaskModal.querySelector("#stuck-task").value;
  const filterPriority =
    filterProjectTaskModal.querySelector("#priority").value;
  const filterDate = filterProjectTaskModal.querySelector("#date-task").value;

  const filterData = { filterPriority, filterDate, filterStuck };

  if (filterPriority === "All") {
    delete filterData.filterPriority;
  }
  if (filterDate === "All") {
    delete filterData.filterDate;
  }
  if (filterStuck === "All") {
    delete filterData.filterStuck;
  }
  const orderByValue = document.querySelector(
    "#admin-kanban-content .projects-intro-buttons .order-by-dropdown select"
  ).value;

  if (orderByValue !== "None") {
    filterData.orderByValue = orderByValue;
  }

  filterAppliedAdminMsg.style.display = "block";
  filterAppliedAdminMsg.innerHTML = createFiltersMsg(filterData);
  console.log(createFiltersMsg(filterData));

  let filtersLength = Object.keys(filterData).length;
  if (filtersLength > 0) {
    filterRemoveAdminBtn.style.display = "flex";
  } else {
    filterRemoveAdminBtn.style.display = "none";
  }

  filterProjectTaskModal.style.display = "none";

  getAdminProjectTable(globalSelectedProjectID, filterData);
};

// Function to create the filters message for the admin project table based on the filters applied
function createFiltersMsg(filters) {
  let applied = [];
  if (filters.filterPriority && filters.filterPriority !== "All") {
    applied.push(filters.filterPriority + " Priority");
  }
  if (filters.filterDate && filters.filterDate !== "All") {
    applied.push("Due Date: " + filters.filterDate);
  }
  if (filters.filterStuck && filters.filterStuck !== "All") {
    if (filters.filterStuck === "Yes") {
      applied.push("Show Stuck Tasks");
    } else {
      applied.push("Show Non-Stuck Tasks");
    }
  }
  if (filters.orderByValue && filters.orderByValue !== "None") {
    applied.push("Order By " + filters.orderByValue);
  }
  if (applied.length === 0) {
    return "";
  } else {
    return "Filters Applied: " + applied.join(", ");
  }
}

//Order By Filters
const orderByAdminBtn = document.querySelector(
  "#admin-kanban-content .projects-intro-buttons .order-by-confirm"
);
orderByAdminBtn.addEventListener("click", () => {
  const orderByDropdownValue = document.querySelector(
    "#admin-kanban-content .projects-intro-buttons .order-by-dropdown select"
  ).value;
  const orderByParam =
    orderByDropdownValue !== "None"
      ? { orderByValue: orderByDropdownValue }
      : {};
  
  const currentAdminFilters = getCurrentFilters();
  const allAdminFilters = { ...currentAdminFilters, ...orderByParam };

  filterAppliedAdminMsg.style.display = "block";
  filterAppliedAdminMsg.innerHTML = createFiltersMsg(allAdminFilters);

  let filtersLength = Object.keys(allAdminFilters).length;
  if (filtersLength > 0) {
    filterRemoveAdminBtn.style.display = "flex";
  } else {
    filterRemoveAdminBtn.style.display = "none";
  }

  getAdminProjectTable(globalSelectedProjectID, allAdminFilters);
});

filterRemoveAdminBtn.addEventListener("click", () => {
  filterAppliedAdminMsg.innerHTML = "";
  filterAppliedAdminMsg.style.display = "none";
  filterRemoveAdminBtn.style.display = "none";
  document.querySelector(
    "#admin-kanban-content .projects-intro-buttons .order-by-dropdown select"
  ).value = "None";
  filterProjectTaskModal.querySelector(
    ".task-dropdown-priority #priority"
  ).value = "All";
  filterProjectTaskModal.querySelector(".task-dropdown-date #date-task").value =
    "All";
  filterProjectTaskModal.querySelector(
    ".task-dropdown-stuck #stuck-task"
  ).value = "All";

  getAdminProjectTable(globalSelectedProjectID, {});
});

//Checking for the current filters applied to the project tasks table
function getCurrentFilters() {
  const filterProjectTaskModal = document.querySelector(
    "#admin-kanban-content #filter-modal"
  );
  const filterStuck = filterProjectTaskModal.querySelector("#stuck-task").value;
  const filterPriority =
    filterProjectTaskModal.querySelector("#priority").value;
  const filterDate = filterProjectTaskModal.querySelector("#date-task").value;

  const filterData = { filterPriority, filterDate, filterStuck };

  if (filterPriority === "All") {
    delete filterData.filterPriority;
  }
  if (filterDate === "All") {
    delete filterData.filterDate;
  }
  if (filterStuck === "All") {
    delete filterData.filterStuck;
  }
  return filterData;
}
//Function to add the task to the project
async function addProjectTasks(
  taskName,
  taskDescription,
  taskPriority,
  taskDueDate,
  Assignee_ID,
  manHours,
  startDate,
  authorID,
  projectID
) {
  try {
    const url = "Project-Kanban/addTaskProject.php";

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
      Start_Date: startDate,
    };

    console.log(data);

    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      console.log(response);
    } else {
      sendToast(`Task has been successfully added!`);
      getAdminProjectTable(globalSelectedProjectID);
    }
  } catch (error) {
    console.log("Error updating the task status", error);
  }
}

//Keyword Search
const searchBarAdmin = document.querySelector(
  "#admin-kanban-content .task-search #searched-task"
);

searchBarAdmin.addEventListener("input", () => {
  const searchValue = searchBarAdmin.value.toLowerCase().trim();
  const allTasks = document.querySelectorAll(
    "#admin-kanban-content .emp-projectKanban-bottom tbody tr"
  );
  let foundTasks = 0;

  allTasks.forEach((task) => {
    const taskTitle = task
      .querySelector("#emp-task-title")
      .innerHTML.toLowerCase();
    const taskStatus = task
      .querySelector("#emp-task-status")
      .innerHTML.toLowerCase();
    const taskPriority = task
      .querySelector("#emp-task-priority")
      .innerHTML.toLowerCase();
    const taskAssignee = task
      .querySelector("#emp-task-assignee")
      .innerHTML.toLowerCase();
    const taskAuthor = task
      .querySelector("#emp-task-author")
      .innerHTML.toLowerCase();

    if (
      taskTitle.includes(searchValue) ||
      taskStatus.includes(searchValue) ||
      taskPriority.includes(searchValue) ||
      taskAssignee.includes(searchValue) ||
      taskAuthor.includes(searchValue)
    ) {
      foundTasks++;
      task.style.display = "table-row";
    } else {
      task.style.display = "none";
    }
  });
  if (foundTasks === 0) {
    document.querySelector(
      "#emp-dash-content .search-task-error-msg"
    ).style.display = "block";
  } else {
    document.querySelector(
      "#emp-dash-content .search-task-error-msg"
    ).style.display = "none";
  }
});
