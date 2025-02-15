let globalSelectedProjectID = null;
let globalUserID = null;
let globalProjectDeadline = null;
window.addEventListener("storage", function () {
    const selectedProjectID = sessionStorage.getItem('clicked-project-id');
    globalSelectedProjectID = selectedProjectID;
    console.log(selectedProjectID);
    

    
    getProjectName(selectedProjectID);

    
    const adminKanbanContent = document.querySelector("#admin-kanban-content");

    // Get the user-id from the data-user-id attribute
    globalUserID = adminKanbanContent.getAttribute("data-user-id");

    
    getProjectTable(selectedProjectID);
    
});



async function getProjectName(selectedProjectID) {
    try {
        
      let url = `Project-Kanban/kanban-projectName-db.php?projectID=${encodeURIComponent(selectedProjectID)}`; 
  
      const params = { 
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
  
      const response = await fetch(url, params);
  
      if (!response.ok) {
        throw new Error('Failed to fetch projects data');
      }
      const projectNameData = await response.json();
      document.querySelector("#admin-kanban-content .project-intro .project-txt p").innerHTML = projectNameData[0].Project_Title;
      globalProjectDeadline = projectNameData[0].Due_Date;
      
      
  
      
    } catch (error) {
      console.log("Fetch Issue",error);
    }
}

  async function getProjectTable(selectedProjectID) {
    try {
    let url = `Project-Kanban/get-project-table-db.php?projectID=${encodeURIComponent(selectedProjectID)}`; 

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const adminProjectData = await response.json();
    console.log(adminProjectData);
    populateTasksTable(adminProjectData);
    
  
    } catch (error) {
        console.log("Fetch Issue",error);
    }
}


function populateTasksTable(tableData) {
  const tableBody = document.querySelector(".emp-projectKanban-bottom tbody");
  tableBody.innerHTML = "";
  tableData.forEach(task => {
      const row = document.createElement('tr');

      let taskStuck = (task.Stuck === '2') ? "Yes" : "No";

      row.innerHTML = `   <td>${task.Task_ID}</td>
                          <td id="emp-task-title">${task.Name}</td>
                          <td><p class="emp-table-status emp-table-status-${task.Status.toLowerCase().replace(/\s+/g, '-')}">${task.Status}</p></td>
                          <td><p class="emp-table-priority emp-table-priority-${task.Priority.toLowerCase()}">${task.Priority}</p></td>
                          <td>${task.Due_Date}</td>
                          <td><p class="stuck-${taskStuck.toLowerCase()}">${taskStuck}</p></td>
                          <td>${task.Assignee_ID}: ${task.assignee_forename} ${task.assignee_surname}</td>
                          <td>${task.Author_ID}: ${task.assigned_by_forename} ${task.assigned_by_surname}</td>
                          <td><a class="edit-admin-functionality-btn" data-task-id="${task.Task_ID}">Edit</a></td> 
                          <td><a class="delete-admin-functionality-btn" data-task-id="${task.Task_ID}">Delete</a></td>   `;
      
      tableBody.appendChild(row);
  });

  // Event delegation for edit buttons
  tableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-admin-functionality-btn')) {
          const taskID = event.target.getAttribute('data-task-id');
          const task = tableData.find(t => t.Task_ID == taskID);
          openEditModal(task);
      }
  });

  // Event delegation for delete buttons
  tableBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-admin-functionality-btn')) {
          const taskID = event.target.getAttribute('data-task-id');
          openDeleteModal(taskID);
      }
  });
}

function openEditModal(task) {
  const editActionsModal = document.querySelector('#admin-kanban-content .edit-task-modal');
  fetchUsersForEdit();
  editActionsModal.querySelector('.modal-header p').innerText = `Actions for Task #${task.Task_ID}`;
  editActionsModal.style.display = 'block';
  editActionsModal.querySelector('#task-title').value = task.Name;
  editActionsModal.querySelector('#priority').value = task.Priority;
  editActionsModal.querySelector('#date-input').value = task.Due_Date;
  editActionsModal.querySelector('#task-user-dropdown').value = task.Assignee_ID;
  editActionsModal.querySelector('#task-description').value = task.Description;
  editActionsModal.querySelector('#man-hours-input').value = task.Man_Hours;
  editActionsModal.querySelector('#start-date-input').value = task.Start_Date;


  const updateTaskBtn = editActionsModal.querySelector('#update-task-btn');
  updateTaskBtn.onclick = () => {
      const taskName = editActionsModal.querySelector('#task-title').value;
      const taskDescription = editActionsModal.querySelector('#task-description').value;
      const taskPriority = editActionsModal.querySelector('#priority').value;
      const taskDueDate = editActionsModal.querySelector('#date-input').value;
      const Assignee_ID = editActionsModal.querySelector('#task-user-dropdown').value;
      const manHours = editActionsModal.querySelector('#man-hours-input').value;
      const startDate = editActionsModal.querySelector('#start-date-input').value;
      const Task_ID = task.Task_ID;

      
      const errorText = editActionsModal.querySelector('#error-edit-message');
      console.log(errorText);

      //Validaiton for the form fields
      if (!taskName || !taskDescription || !taskPriority || !taskDueDate || !Assignee_ID || !manHours || !startDate || !manHours || !startDate) {
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
        errorText.innerText = 'Start Date cannot be before than Due Date';
        errorText.style.display = 'block';
        return 
      }

      //Task cannot start or begin after project deadline
      if (taskDueDate > globalProjectDeadline || startDate > globalProjectDeadline) {
        errorText.innerText = 'Task Due Date or Start Date cannot be greater than Project Deadline';
        errorText.style.display = 'block';
        return
      }


      
      
     updateProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, Task_ID, manHours, startDate);
      editActionsModal.style.display = 'none';
  };

  const closeAdminEditBtn = editActionsModal.querySelector('.close-modal-btn');
  closeAdminEditBtn.onclick = () => {
      editActionsModal.style.display = 'none';
  };
}

function openDeleteModal(taskID) {
  const deleteProjectTaskModal = document.querySelector('#admin-kanban-content #delete-project-task-modal');
  deleteProjectTaskModal.querySelector('.modal-header').innerText = `Delete Task #${taskID}`;
  deleteProjectTaskModal.querySelector('.modal-body').innerText = `Are you sure you want to delete Task #${taskID}?`;
  deleteProjectTaskModal.style.display = 'flex';

  const deleteProjectTaskConfirm = deleteProjectTaskModal.querySelector('#delete-project-task-confirm');
  deleteProjectTaskConfirm.onclick = () => {
      deleteProjectTask(taskID);
      deleteProjectTaskModal.style.display = 'none';
    
  };

  const closeProjectTaskModal = deleteProjectTaskModal.querySelector('#cancel-delete-task-btn');
  closeProjectTaskModal.onclick = () => {
      deleteProjectTaskModal.querySelector('.modal-header').innerText = "";
      deleteProjectTaskModal.querySelector('.modal-body').innerText = "";
      deleteProjectTaskModal.style.display = 'none';
  };
}

async function deleteProjectTask(projectTaskID) {
  try {
    let url = `Project-Kanban/delete-project-task-db.php?taskID=${encodeURIComponent(projectTaskID)}`;

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
        console.log(response);
    } else {
      getProjectTable(globalSelectedProjectID);
        
    }
  } catch(error) {
    console.log("Fetch Issue",error);
    //Show Error Card
  }
}


const taskDropdown = document.querySelector('#admin-kanban-content #task-user')
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

async function updateProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, taskID, manHours, startDate) {
  try {
    const url = 'Project-Kanban/updateTaskDetails.php';
    
    const data = {
      Name: taskName,
      Description: taskDescription,
      Priority: taskPriority,
      Due_Date: taskDueDate,
      Assignee_ID: Assignee_ID,
      Task_ID: taskID,
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
      getProjectTable(globalSelectedProjectID);
    }

  } catch (error) {
    console.log("Error updating the task status", error);
  }
}




//====Back to Projects Page Button
const backToProjectsBtn = document.querySelector('#admin-kanban-content .project-intro .projects-intro-buttons .all-projects-btn');
backToProjectsBtn.addEventListener('click', () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const currentProjectLink = document.querySelector('#current-project')
  currentProjectLink.style.display = 'none';
  currentProjectLink.classList.remove('active');
  document.querySelector('.nav-item#projects').classList.add('active');

  const navItemContents = document.querySelectorAll('.nav-item-content')
  navItemContents.forEach(item => item.classList.remove('open'))
  const currentProjectContentArea = document.querySelector('#projects-content')
  currentProjectContentArea.classList.add('open');
})



//====Add Task Modal  
const addProjectTaskBtn = document.querySelector('#admin-kanban-content .add-task-btn')
const addProjectTaskModal = document.querySelector('#admin-kanban-content .add-task-modal')
const closeProjectAddTaskModal = addProjectTaskModal.querySelector('.close-modal-btn')

addProjectTaskBtn.addEventListener('click', () => {
    addProjectTaskModal.style.display = 'flex';
    fetchUsersForEdit();
})
closeProjectAddTaskModal.addEventListener('click', () => {
    addProjectTaskModal.style.display = 'none';
})
//====Add Task Modal Functionality
const confirmAddTask = addProjectTaskModal.querySelector('.add-task-btn')
confirmAddTask.onclick = () => {
  //Get the values from the form
  
  const taskName = addProjectTaskModal.querySelector('#task-title').value;
  const taskDescription = addProjectTaskModal.querySelector('#task-description').value;
  const taskPriority = addProjectTaskModal.querySelector('#priority').value;
  const taskDueDate = addProjectTaskModal.querySelector('#date-input').value;
  const Assignee_ID = addProjectTaskModal.querySelector('#task-user-dropdown').value;
  const authorID = globalUserID;
  const projectID = globalSelectedProjectID;
  const manHours = addProjectTaskModal.querySelector('#man-hours-input').value;
  const startDate = addProjectTaskModal.querySelector('#start-date-input').value;

  const errorText = addProjectTaskModal.querySelector('#error-adding-message');
  console.log(errorText);

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
    errorText.innerText = 'Start Date cannot be greater than Due Date';
    errorText.style.display = 'block';
    return 
  }

  //Check project deadline if task due date or start date is greater than project deadline
  //Sawan
  
  //Task cannot start or begin after project deadline
  if (taskDueDate > globalProjectDeadline || startDate > globalProjectDeadline) {
    errorText.innerText = 'Task Due Date or Start Date cannot be greater than Project Deadline';
    errorText.style.display = 'block';
    return
  }






  errorText.style.display = 'none';
  addProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, manHours, startDate, authorID, projectID)
  addProjectTaskModal.style.display = 'none';
  //Pass in task name
  sendToast(`🎉 Task "${taskName}" has been successfully added!`);



}




//Filter Modal Functionality
const filterProjectTaskModal = document.querySelector("#admin-kanban-content #filter-modal");
const filterProjectTaskBtn = document.querySelector('#admin-kanban-content  .filter-task-btn');
const closeProjectFilterTaskModal = filterProjectTaskModal.querySelector('#filter-modal .close-modal-btn')

filterProjectTaskBtn.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'flex';
  })
  closeProjectFilterTaskModal.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'none';
  })


async function addProjectTasks(taskName, taskDescription, taskPriority, taskDueDate, Assignee_ID, manHours, startDate, authorID, projectID) {
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
      getProjectTable(globalSelectedProjectID);
    }

  } catch (error) {
    console.log("Error updating the task status", error);
  }
}