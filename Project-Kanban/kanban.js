const kanbanContainers = document.querySelectorAll('.kanban-board');

// Listen for sessionStorage updates
let userId;
let projectID;
window.addEventListener("storage", function () {
  const selectedProjectID = sessionStorage.getItem('clicked-project-id');
  projectID = selectedProjectID;

  if (selectedProjectID) {
    const kanbanContainer = document.querySelector('#proj-kanban-content')
    const userID = kanbanContainer.getAttribute('data-user-id');
    userId = userID;
    getKanbanData(userID, selectedProjectID, {});
    getProjectName(selectedProjectID)

    const filterKanbanModal = document.querySelector('#proj-kanban-content #filter-modal')
    document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value = 'None';
    filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = 'All';
    filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = 'All';
    filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";
      
  
    
    //Filters
    const filterAppliedMsg = document.querySelector('#proj-kanban-content .filter-applied-msg');
    const filterRemoveBtn = document.querySelector('#proj-kanban-content .remove-filters-btn');

    const applyFilterBtn = filterKanbanModal.querySelector('#add-filter-btn');
    applyFilterBtn.addEventListener('click', () => {
      const priorityValue = filterKanbanModal.querySelector('.task-dropdown-priority #priority').value;
      const dateValue = filterKanbanModal.querySelector('.task-dropdown-date #date-task').value;
      const stuckValue = filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value;
      
      const filters = {priorityValue,dateValue,stuckValue};

      if (priorityValue === "All") {
        delete filters.priorityValue;
      }
      if (dateValue === "All") {
        delete filters.dateValue;
      }
      if (stuckValue === "All") {
        delete filters.stuckValue;
      }
      const orderByValue = document.querySelector('.projects-intro-buttons .order-by-dropdown select').value;
      if (orderByValue !== "None") {
        filters.orderByValue = orderByValue;
      } 

      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(filters);

      let filtersLength = Object.keys(filters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      filterTaskModal.style.display = 'none';
      searchBar.value = "";

      getKanbanData(userID, selectedProjectID, filters);
    })

    //Order By Filters
    const orderByBtn = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-confirm');
    orderByBtn.addEventListener('click', () => {
      const orderByDropdownValue = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};


      const currentFilters = getCurrentFilters();
      const allFilters = { ...currentFilters, ...orderByParam};


      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(allFilters);

      let filtersLength = Object.keys(allFilters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      searchBar.value = "";

      getKanbanData(userID, selectedProjectID, allFilters);
    })

    filterRemoveBtn.addEventListener('click', () => {
      filterAppliedMsg.innerHTML = "";
      filterAppliedMsg.style.display = 'none';
      filterRemoveBtn.style.display = 'none';
      searchBar.value = "";
      document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value = "None";
      filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = "All";
      filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = "All";
      filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";

      getKanbanData(userID, selectedProjectID, {})
    })


  }
});


function createFiltersMsg(filters) {
  let applied = [];
  if (filters.priorityValue && filters.priorityValue !== "All") {
    applied.push(filters.priorityValue + " Priority");
  }
  if (filters.dateValue && filters.dateValue !== "All") {
    applied.push("Due Date: " + filters.dateValue)
  }
  if (filters.stuckValue && filters.stuckValue !== "All") {
    if (filters.stuckValue === "Yes") {
      applied.push("Show Stuck Tasks");
    } else {
      applied.push("Show Non-Stuck Tasks");
    }
  }
  if (filters.orderByValue && filters.orderByValue !== "None") {
    applied.push("Order By " + filters.orderByValue)
  }
  if (applied.length === 0) {
    return '';
  } else {
    return 'Filters Applied: ' + applied.join(', ');
  }
}

function formatDate(date) {
  const dateSplit = date.split('-');
  const year = dateSplit[0]
  const month = dateSplit[1];
  const day = dateSplit[2];
  return `${day}-${month}-${year}`;
}

function getCurrentFilters() {
  const filterKanbanModal = document.querySelector('#proj-kanban-content #filter-modal');
  const priorityValue = filterKanbanModal.querySelector('.task-dropdown-priority #priority').value;
  const dateValue = filterKanbanModal.querySelector('.task-dropdown-date #date-task').value;
  const stuckValue = filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value;
  
  const filters = {priorityValue,dateValue,stuckValue};

  if (priorityValue === "All") {
    delete filters.priorityValue;
  }
  if (dateValue === "All") {
    delete filters.dateValue;
  }
  if (stuckValue === "All") {
    delete filters.stuckValue;
  }

  return filters;
}


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
    document.querySelector("#proj-kanban-content .project-intro .project-txt p").innerHTML = projectNameData[0].Project_Title;


  } catch (error) {
    console.log("Fetch Issue",error);
  }
}



async function getKanbanData(userID, projectID, filters={}) {
  try {

    let url = `Project-Kanban/kanban-db.php?userID=${encodeURIComponent(userID)}&projectID=${encodeURIComponent(projectID)}`; 

    const filterQuery = new URLSearchParams(filters).toString();
    url += filterQuery ? `&${filterQuery}` : '';

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const allKanbanData = await response.json();
    generateCard(allKanbanData);

  } catch (error) {
    console.log("Fetch Issue",error);
  }
}
      

function generateCard(kanbanData) {
  const kanbanColumns = {
    "To Do": document.querySelector("#proj-kanban-content #kanban-to-do"),
    "In Progress": document.querySelector("#proj-kanban-content #kanban-in-progress"),
    "Completed": document.querySelector("#proj-kanban-content #kanban-completed")
  };

  Object.values(kanbanColumns).forEach(column => column.innerHTML = ""); //clear columns

  kanbanData.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("kanban-card");
    //taskCard.setAttribute("draggable", true);
    taskCard.setAttribute('data-task-title', task.Name);

    if (taskIsOverdue(task.Due_Date)) {
      taskCard.id = "kanban-task-overdue";
    }

    taskCard.innerHTML = `
                    <div class="kanban-card-top">
                      <div class="kanban-card-top-details">
                          <p>${task.Name}</p>
                          <i class="fa fa-solid fa-caret-down"></i>
                      </div>
                      <div class="kanban-card-priority ${task.Priority.toLowerCase()}-priority">${task.Priority} Priority</div>
                    </div>

                    </div>
                    <div class="kanban-card-body">
                      <p class="kanban-card-description">${task.Description}</p>

                      <div class="kanban-separator"></div>

                      <div class="kanban-card-bottom">
                          <a href="">View Task</a>
                          <div class="due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${formatDate(task.Due_Date)}</p>
                          </div>
                      </div>
                    </div>`;


    
    const userRole = document.getElementById('proj-kanban-content').getAttribute('data-role');

    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('modal', 'view-task-modal'); 
    const viewTaskBtn = taskCard.querySelector('.kanban-card-bottom a');
    
    //===Fields from database for View Modal

    const taskTitle = task.Name;


    
    const priorityElement = taskCard.querySelector('.kanban-card-priority');
    let taskPriority = "";
    if (task.Priority === "High") {
      taskPriority = "High Priority";
    } else if (task.Priority === "Medium") {
      taskPriority = "Medium Priority";
    } else if (task.Priority === "Low") {
      taskPriority = "Low Priority";
    } else if (task.Priority === "None") {
      taskPriority = "No Priority";
    }

    

    const fullTaskDescription = task.Description;
    const taskDescriptionWords = fullTaskDescription;
    const previewTaskDescription = taskDescriptionWords.substring(0, 60) + '...';
  
    //Set shorter description inside the card
    const taskDescriptionElement = taskCard.querySelector('.kanban-card .kanban-card-body .kanban-card-description');
    if (taskDescriptionElement) {
      taskDescriptionElement.innerText = previewTaskDescription;
    }

    //Role based content for buttons in modal 
    let roleBasedBtns = '';
    let roleBasedReassign =''
    if (userRole === 'Admin') {
      roleBasedBtns = `<div class="delete-task">
                            <p>Delete</p>
                          </div>
                          `
      roleBasedReassign = `<div class="modal-task-info-section">
                              <div class="modal-task-info-section-header">
                                  <i class="fa fa-solid fa-user"></i>
                                  <p>Reassign</p>
                              </div>
                              <div class="modal-task-info-section-body">
                                  <p>Choose</p>
                              </div>
                          </div>`
    } else if (userRole === 'Employee' || userRole === 'Team Leader') {
      if (task.Stuck === '0') {
        roleBasedBtns = ` <a class="report-task">
                              Report as Stuck
                            </a>`
      } else {
        roleBasedBtns = ` <a class="report-task">
                              Unmark as Stuck
                            </a>`
      }
      roleBasedBtns += `
                            <div class="move-task-dropdown">
                              <select>
                                <option value="kanban-to-do">To Do</option>
                                <option value="kanban-in-progress">In Progress</option>
                                <option value="kanban-completed">Completed</option>
                              </select>
                              <div>
                                <a href="#" class="move-task-confirm black-btn">Confirm Move</a>
                              </div>
                            </div>`
      roleBasedReassign = `<div class="modal-task-info-section">
                            </div>`
    }

    // View Task Modal content
    viewTaskModal.innerHTML = `
                                  <div class="modal-box view-task-modal-box">
                                            <!--Header-->
                                            <div class="modal-header">
                                                <p class="modal-task-title">${taskTitle}</p>
                                                <div class="close-modal-btn">
                                                    <i class="fa-solid fa-x"></i>
                                                </div>
                                            </div>
                                            <!--Body-->
                                            <div class="modal-body">
                                              <p class="modal-task-description">${fullTaskDescription}</p>



                                              <div class="modal-task-info">
                                                  <div class="modal-task-info-section-top">
                                                      <p class="task-modal-title">Status</p>
                                                      <div class="status-box">
                                                          <div class="task-indicator-circle"></div>
                                                          <p>${task.Status}</p>
                                                      </div>
                                                  </div>

                                                  <div class="modal-task-info-section-top">
                                                      <p class="task-modal-title">Priority</p>
                                                      <div class="priority-box">
                                                          <div class="task-indicator-circle"></div>
                                                          <p>${taskPriority}</p>
                                                      </div>
                                                  </div>

                                                  <div class="modal-task-info-section-top">
                                                      <p class="task-modal-title">Assigned to</p>
                                                      <p>${task.User_Forename} ${task.User_Surname}</p>
                                                  </div>
                                              </div>


                                              <div class="modal-task-info">
                                                  <div class="modal-task-info-section">
                                                      <div class="modal-task-info-section-header">
                                                          <i class="fa fa-solid fa-user"></i>
                                                          <p>Created by</p>
                                                      </div>
                                                      <div class="modal-task-info-section-body">
                                                          <p>${task.Author_Forename} ${task.Author_Surname}</p>
                                                      </div>
                                                  </div>

                                                  <div class="modal-task-info-section">
                                                      <div class="modal-task-info-section-header">
                                                          <i class="fa fa-regular fa-calendar"></i>
                                                          <p>Due date</p>
                                                      </div>
                                                      <div class="modal-task-info-section-body modal-task-due-date">
                                                          <div class="task-indicator-circle"></div>
                                                          <p>${formatDate(task.Due_Date)}</p>
                                                      </div>
                                                  </div>

                                                  ${roleBasedReassign}
                                              </div>

                                              <div class="modal-task-attachments">
                                                  <p class="task-modal-title">Attachments</p>
                                                  <div class="modal-task-attachments-box"></div>
                                              </div>

                                              

                                              <div class="modal-task-btns">
                                                  ${roleBasedBtns}
                                              </div>

                                            </div>
                                        </div>
    `;

    const reportModal = document.querySelector('.report-task-modal');
    const openReportModalBtn = viewTaskModal.querySelector('.report-task');
    openReportModalBtn.addEventListener('click',  () =>{
      viewTaskModal.style.display = 'none';
      const currentStuck = task.Stuck;
      const reportMsg = reportModal.querySelector('#report-modal-message');
      const reportTaskBtn = reportModal.querySelector('.report-task-db');

      if (currentStuck === '0') {
        reportMsg.innerHTML = `Are you sure you'd like to report Task ${task.Task_ID}: ${task.Name} as Stuck?`;
        reportTaskBtn.innerHTML = 'Report as Stuck';
      } else {
        reportMsg.innerHTML = `Are you sure you'd like to Unmark Task ${task.Task_ID}: ${task.Name} as Stuck?`;
        reportTaskBtn.innerHTML = 'Unmark as Stuck';
      }

      reportModal.style.display = 'block';

      reportTaskBtn.addEventListener('click', async () => {
        const currentStuck = task.Stuck;
        const newStuck = currentStuck === '0' ? '1' : '0';
        await reportStuck(task.Task_ID, newStuck, openReportModalBtn);
        task.Stuck = newStuck;
        reportModal.style.display = 'none';

        const currentFilters = getCurrentFilters();
        const kanbanContainer = document.querySelector('#proj-kanban-content')
        const userID = kanbanContainer.getAttribute('data-user-id');
        getKanbanData(userID, projectID, currentFilters);

      })
  
      const closeReportModal = reportModal.querySelector('.close-modal-btn');
      closeReportModal.addEventListener('click', () => {
        reportModal.style.display = 'none';
      })
  

    });

  



    //Add Card and Modal to body
    document.body.appendChild(viewTaskModal);
    
    kanbanColumns[task.Status]?.appendChild(taskCard);
    
    //on load, set status in card
    const statusBox = viewTaskModal.querySelector('.status-box');
    const statusCircle = viewTaskModal.querySelector('.status-box .task-indicator-circle');
    checkStatus(taskCard, statusBox, statusCircle)

    //Move Task Click

    
    
    //Priority Colours in modal 
    const priorityBox = viewTaskModal.querySelector('.priority-box');
    const priorityCircle = viewTaskModal.querySelector('.priority-box .task-indicator-circle');

    if (task.Priority === "High") {
      priorityBox.style.backgroundColor = "#dd9592";
      priorityCircle.style.backgroundColor = "red";
    } else if (task.Priority === "Medium") {
      priorityBox.style.backgroundColor = "#EAB385";
      priorityCircle.style.backgroundColor = "orange";
    } else if (task.Priority === "Low") {
      priorityBox.style.backgroundColor = "#ADDA9D";
      priorityCircle.style.backgroundColor = "green";
    } else if (task.Priority === "None") {
      priorityBox.style.backgroundColor = "#F5F5F5";
      priorityCircle.style.backgroundColor = "#8E8E91";
    }

     //Due Date dot colour 
     const dueDateDot = viewTaskModal.querySelector('.modal-task-due-date .task-indicator-circle');
     if (taskCard.id === 'kanban-task-overdue') {
       dueDateDot.style.backgroundColor = "#E6757E";
       
     } else {
       dueDateDot.style.backgroundColor = "#ADDA9D";
     }

   


  
    //Closing and opening modal
    const closeViewTaskModal = viewTaskModal.querySelector('.close-modal-btn');

    viewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewTaskModal.style.display = 'flex';
    });

    closeViewTaskModal.addEventListener('click', () => {
      viewTaskModal.style.display = 'none';
    });


   

    const kanbanCardDueDate = taskCard.querySelector('.due-date');
    const currentSectionId = taskCard.parentElement.id;
    validate_date_icon(taskCard, kanbanCardDueDate, currentSectionId);
 
    //Move button and Update Task Status in Database
    const moveTaskDropDown = viewTaskModal.querySelector('.move-task-dropdown select');
    const moveTaskBtn = viewTaskModal.querySelector('.move-task-dropdown .move-task-confirm');

    //Moving Cards Using Dropdown
    moveTaskBtn.addEventListener('click', async () => {
      const newSection = moveTaskDropDown.value;
      const newSectionElement = document.getElementById(newSection);

      newSectionElement.insertBefore(taskCard, newSectionElement.firstChild);
      viewTaskModal.style.display = 'none';

      checkStatus(taskCard, statusBox, statusCircle)
      validate_date_icon(taskCard, kanbanCardDueDate, newSection);

      let newStatus = {
        'kanban-to-do': 'To Do',
        'kanban-in-progress': 'In Progress',
        'kanban-completed': 'Completed'
      }[newSection];
      
      await updateTaskStatus(task.Task_ID, newStatus);

      const orderByDropdownValue = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};
      const currentFilters = getCurrentFilters();
      const allFilters = { ...currentFilters, ...orderByParam};

      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(allFilters);

      let filtersLength = Object.keys(allFilters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      searchBar.value = "";

      getKanbanData(userId, projectID, allFilters);

      
    });


  })

}

async function reportStuck(taskID, newStatus, reportBtn) {
  try {
    const url = 'Project-Kanban/confirmStuck.php';
    const data = {
      Task_ID: taskID,
      Stuck_Status: newStatus,
    };
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error('Failed to update task status');
    } else {
      if (newStatus === '1' || newStatus === '2') {
        reportBtn.innerHTML = "Unmark as Stuck";
      } else {
        reportBtn.innerHTML = "Report as Stuck";
      }
    }

  } catch (error) {
    console.log("Error reporting a task as stuck", error);
  }
}

async function updateTaskStatus(taskID, newStatus) {
  try {
    const url = 'Project-Kanban/update-status-db.php';
    
    const data = {
      Task_ID: taskID,
      Status: newStatus
    };
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, params);
    if (!response.ok) {
      throw new Error('Failed to update task status');
    }


  } catch (error) {
    console.log("Error updating the task status", error);
  }
}



function checkStatus(taskCard, statusBox, statusCircle) {
  let taskStatus;
  if (taskCard.parentElement.id === 'kanban-to-do') {
    taskStatus = "To Do";
    statusBox.style.backgroundColor = "#dd9592";
    statusCircle.style.backgroundColor = "red";
  } else if (taskCard.parentElement.id  === 'kanban-in-progress') {
    taskStatus = "In Progress";
    statusBox.style.backgroundColor = "#EAB385";
    statusCircle.style.backgroundColor = "orange";
  } else if (taskCard.parentElement.id  === 'kanban-completed') {
    taskStatus = "Completed";
    statusBox.style.backgroundColor = "#ADDA9D";
    statusCircle.style.backgroundColor = "green";
  }
  
  // Update the displayed task status text in the modal
  statusBox.querySelector('p').innerText = taskStatus;
}


//Add colours to due dates when moved
function validate_date_icon(task, kanbanCardDueDate, currentSectionId) {
  if (currentSectionId === 'kanban-to-do' || currentSectionId === 'kanban-in-progress') {
    if (task.id === 'kanban-task-overdue') {
      kanbanCardDueDate.style.backgroundColor = '#E6757E';
      kanbanCardDueDate.style.color = 'white';
    } else {
      kanbanCardDueDate.style.backgroundColor = '#F5F5F5';
      kanbanCardDueDate.style.color = '#656565';
    }
  } else if (currentSectionId === 'kanban-completed') {
    kanbanCardDueDate.style.backgroundColor = '#ADDA9D';
    kanbanCardDueDate.style.color = 'white';
  }

}





function taskIsOverdue(dueDate) {
  return new Date(dueDate) < new Date();
}




kanbanContainers.forEach(kanbanContainer => {
  //====Open and Close Task cards
  kanbanContainer.addEventListener('click', (e) => {
    const kanbanCardHeader = e.target.closest('.kanban-card-top');
    if (!kanbanCardHeader) return;

   


    const kanbanCardGroup = kanbanCardHeader.parentElement;
    const kanbanCardBody = kanbanCardGroup.querySelector('.kanban-board .kanban-card-body');
    const kanbanCardIcon = kanbanCardHeader.querySelector('.kanban-card-top-details i');

    kanbanCardIcon.classList.toggle('fa-caret-up');
    kanbanCardIcon.classList.toggle('fa-caret-down');
  
    
    kanbanCardBody.classList.toggle('open');

    const otherCards = kanbanContainer.querySelectorAll('.kanban-board .kanban-card');
    otherCards.forEach(otherCard => {
        if (otherCard != kanbanCardGroup) {
            const otherCardBody = otherCard.querySelector('.kanban-board .kanban-card-body')
            const otherCardIcon = otherCard.querySelector('.kanban-board .kanban-card-top i')
            otherCardBody.classList.remove('open')
        }
    })
  })

  //====Open and Close Kanban Columns
  kanbanContainer.addEventListener('click', (e) => {
    const kanbanColumnHeader = e.target.closest('.kanban-board .kanban-header');
    if (!kanbanColumnHeader) return;

    const kanbanColumnGroup = kanbanColumnHeader.parentElement;
    const kanbanColumnBody = kanbanColumnGroup.querySelector('.kanban-board .kanban-body');
    const kanbanColumnIcon = kanbanColumnGroup.querySelector('.kanban-board .kanban-header i');

    kanbanColumnIcon.classList.toggle('fa-caret-down');
    kanbanColumnIcon.classList.toggle('fa-caret-up');

    kanbanColumnBody.classList.toggle('open');

    const otherColumns = kanbanContainer.querySelectorAll('.kanban-board .kanban-section')
    otherColumns.forEach(otherColumn => {
        if (otherColumn != kanbanColumnGroup) {
            const otherColumnBody = otherColumn.querySelector('.kanban-board .kanban-body');
            const otherColumnIcon = otherColumn.querySelector('.kanban-board .kanban-header i');
            otherColumnBody.classList.remove('open')
            otherColumnIcon.classList.remove('fa-caret-up')
            otherColumnIcon.classList.add('fa-caret-down')
        }
    })
  });
})


//====Back to Projects Page Button
const backToProjectsBtn = document.querySelector('.project-intro .projects-intro-buttons .all-projects-btn');
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
const addTaskBtn = document.querySelectorAll('.add-task-btn')

addTaskBtn.forEach(btn => {

  const addTaskModal = document.createElement('div');
  addTaskModal.classList.add('modal', 'add-task-modal')
  addTaskModal.innerHTML = `
    <div class="modal-box">
        <!--Header-->
        <div class="modal-header">
            <p>Add Task</p>
            <div class="close-modal-btn">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
        <!--Body-->
        <form class="modal-body">
            <!--Title and Description-->
            <div class="task-title-form">
                <label for="task-title">Title</label>
                <input type="text" id="task-title" name="task-title">
            </div>
            <div class="task-description-form">
                <label for="task-description">Description</label>
                <textarea type="text" id="task-description" name="task-description"></textarea>
            </div>
            <!--Dropdowns-->
            <div class="task-dropdowns-form">
                <!--Choose User-->
                <div class="task-dropdown task-dropdown-user">
                    <label for="user">Employee</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-user-icon task-dropdown-icon">
                            <i class="fa fa-solid fa-user"></i>
                        </div>
                        <select name="user" id="user">
                            <option value="" selected disabled hidden>Choose User</option>
                            <option value="jlittle">John Little</option>
                            <option value="slarkin">Sandra Larkin</option>
                            <option value="ncage">Nick Cage</option>
                            <option value="ssmith">Sally Smith</option>
                        </select>
                    </div>  
                </div>
                <!--Choose Priority-->
                <div class="task-dropdown task-dropdown-priority">
                    <label for="priority">Priority</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-priority-icon task-dropdown-icon">
                            <i class="fa fa-solid fa-exclamation"></i>
                        </div>
                        <select name="priority" id="priority">
                            <option value="" selected disabled hidden>Choose Priority</option>
                            <option value="no priority">No Priority</option>
                            <option value="low priority">Low Priority</option>
                            <option value="medium priority">Medium Priority</option>
                            <option value="high priority">High Priority</option>
                        </select>
                    </div>  
                </div>
                <!--Choose Due Date-->
                <div class="task-dropdown task-dropdown-date">
                    <label for="date">Due Date</label>
                    <div class="task-dropdown-select-options">
                        <div class="task-dropdown-date-icon task-dropdown-icon">
                            <i class="fa fa-regular fa-calendar"></i>
                        </div>
                        <input type="date" name="date" id="date-input">
                    </div>  
                </div>
            </div>
            <!--Add Attachments-->
            <div class="task-upload-form">
                <label for="task-upload">Upload Attachments</label>
                <input type="file" id="upload" name="upload" multiple>
            </div>
        </form>
        <div class="task-submit-buttons">
            <div class="add-task-btn">
                Add Task
                <i class="fa fa-arrow-right"></i>
            </div>
        </div>
    </div>
`

  document.body.appendChild(addTaskModal);

  const closeAddTaskModal = addTaskModal.querySelector('.close-modal-btn')

  btn.addEventListener('click', () => {
    addTaskModal.style.display = 'flex';
  })
  closeAddTaskModal.addEventListener('click', () => {
    addTaskModal.style.display = 'none';
  })

})

//Filter Modal Functionality
const filterTaskModal = document.querySelector("#proj-kanban-content #filter-modal");
const filterTaskBtn = document.querySelector('#proj-kanban-content  .filter-task-btn');
const closeFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn')

filterTaskBtn.addEventListener('click', () => {
  filterTaskModal.style.display = 'flex';
  })
  closeFilterTaskModal.addEventListener('click', () => {
    filterTaskModal.style.display = 'none';
  })


//Keyword Search
const searchBar = document.querySelector('#proj-kanban-content .task-search #searched-task');

searchBar.addEventListener('input', ()=>{
  const searchValue = searchBar.value.toLowerCase();
  const allTasks = document.querySelectorAll('.kanban-content-project .kanban-card');
  console.log(allTasks);
  let foundTasks = 0;

  allTasks.forEach(task => {
    const taskTitle = task.getAttribute('data-task-title').toLowerCase();


    if (taskTitle.includes(searchValue)) {
      foundTasks++;
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
  if (foundTasks === 0) {
    document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'block';
  } else {
    document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'none';
  }
})



