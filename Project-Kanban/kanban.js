const kanbanContainers = document.querySelectorAll('.kanban-board');
// Listen for sessionStorage updates
let userId;
let projectID;
let leadingProject;

window.addEventListener("storage", function () {
  const selectedProjectID = sessionStorage.getItem('clicked-project-id');
  projectID = selectedProjectID;

  const currentProjectNavItem = this.document.querySelector('#current-project span');

  //sessionStorage.setItem("leading-on-project", "true");

  
  leadingProject = sessionStorage.getItem("leading-on-project");
  
  //Sawan
  if (leadingProject === "true") {
    const toggleView = document.querySelector('.leader-switch-buttons');
    if (toggleView) {
      toggleView.style.display = 'flex';
    }
  }
  
  
  
  

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

  if (selectedProjectID) {
    const kanbanContainer = document.querySelector('#proj-kanban-content')
    const userID = kanbanContainer.getAttribute('data-user-id');
    userId = userID;
    getKanbanData(userID, selectedProjectID, {});
    getProjectName(selectedProjectID, currentProjectNavItem);
    
    

  }
});


    const filterKanbanModal = document.querySelector('#proj-kanban-content .non-leader-modal')
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
      
      const filters = {priorityValue, dateValue, stuckValue};
      console.log(filters);

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
      console.log(createFiltersMsg(filters))

      let filtersLength = Object.keys(filters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      filterTaskModal.style.display = 'none';
      searchBarProject.value = "";

      getKanbanData(userId, projectID, filters);
    })

    //Order By Filters
    const orderByBtn = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-confirm');
    orderByBtn.addEventListener('click', () => {
      const orderByDropdownValue = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};


      const currentFilters = getEmpCurrentFilters();
      const allFilters = { ...currentFilters, ...orderByParam};


      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(allFilters);

      let filtersLength = Object.keys(allFilters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      searchBarProject.value = "";

      getKanbanData(userId, projectID, allFilters);
    })

    filterRemoveBtn.addEventListener('click', () => {
      filterAppliedMsg.innerHTML = "";
      filterAppliedMsg.style.display = 'none';
      filterRemoveBtn.style.display = 'none';
      searchBarProject.value = "";
      document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value = "None";
      filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = "All";
      filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = "All";
      filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";

      getKanbanData(userId, projectID, {})
    })


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

function formatDateDeadline(date) {
  const dateSplit = date.split('-');
  const year = dateSplit[0]
  const month = dateSplit[1];
  const day = dateSplit[2];
  return `${day}-${month}-${year}`;
}

function getEmpCurrentFilters() {
  const filterKanbanModal = document.querySelector('#proj-kanban-content #filter-modal');
  const priorityValue = filterKanbanModal.querySelector('.task-dropdown-priority #priority').value;
  const dateValue = filterKanbanModal.querySelector('.task-dropdown-date #date-task').value;
  const stuckValue = filterKanbanModal.querySelector('.task-dropdown-stuck #stuck-task').value;
  
  const filters = {priorityValue, dateValue, stuckValue};

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


async function getProjectName(selectedProjectID, currentProjectNavItem) {
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
    currentProjectNavItem.innerHTML = projectNameData[0].Project_Title;


  } catch (error) {
    console.log("Fetch Issue",error);
  }
}



async function getKanbanData(userID, projectID, filters={}) {
  try {

    let url = `Project-Kanban/kanban-db.php?userID=${encodeURIComponent(userID)}&projectID=${encodeURIComponent(projectID)}`; 


    const filterQuery = new URLSearchParams(filters).toString();
    url += filterQuery ? `&${filterQuery}` : '';

        console.log(url);

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       cache: 'no-store' 
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const allKanbanData = await response.json();
    console.log(allKanbanData);
    generateCard(allKanbanData);

    // Update the count display elements in the headers
    const cardCounts = {
      "To Do": document.querySelector("#proj-kanban-content #kanban-to-do").children.length,
      "In Progress": document.querySelector("#proj-kanban-content #kanban-in-progress").children.length,
      "Completed": document.querySelector("#proj-kanban-content #kanban-completed").children.length
    };
    changeProjectsCount(cardCounts);

  } catch (error) {
    console.log("Fetch Issue",error);
  }
}
      

function generateCard(kanbanData) {
  console.log('Generate card being called!')
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
                              <p>Due: ${formatDateDeadline(task.Due_Date)}</p>
                          </div>
                      </div>
                    </div>`;


    
    const userRole = document.getElementById('proj-kanban-content').getAttribute('data-role');

    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('modal', 'view-task-modal'); 
    const viewTaskBtn = taskCard.querySelector('.kanban-card-bottom a');
    
    //===Fields from database for View Modal
    

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
                              <option value="" selected disabled hidden>Choose</option>
                                <option value="kanban-to-do">To Do</option>
                                <option value="kanban-in-progress">In Progress</option>
                                <option value="kanban-completed">Completed</option>
                              </select>
                              <a href="#" class="move-task-confirm black-btn">Confirm Move</a>
                            </div>`
      roleBasedReassign = `<div class="modal-task-info-section">
                            </div>`
    }

    // View Task Modal content
    viewTaskModal.innerHTML = `
                                  <div class="modal-box view-task-modal-box">
                                            <!--Header-->
                                            <div class="modal-header">
                                                <p class="modal-task-title">${task.Name}</p>
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
                                                      <div class="status-box status-${task.Status.toLowerCase().replace(" ", '-')}-box">
                                                          <div class="task-indicator-circle status-${task.Status.toLowerCase().replace(" ", '-')}-box"></div>
                                                          <p>${task.Status}</p>
                                                      </div>
                                                  </div>

                                                  <div class="modal-task-info-section-top">
                                                      <p class="task-modal-title">Priority</p>
                                                      <div class="priority-box ${task.Priority.toLowerCase()}-priority">
                                                          <div class="task-indicator-circle ${task.Priority.toLowerCase()}-priority"></div>
                                                          <p>${task.Priority} Priority</p>
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
                                                          <p>${formatDateDeadline(task.Due_Date)}</p>
                                                      </div>
                                                  </div>

                                                  ${roleBasedReassign}
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

        const currentFilters = getEmpCurrentFilters();
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


      validate_date_icon(taskCard, kanbanCardDueDate, newSection);

      let newStatus = {
        'kanban-to-do': 'To Do',
        'kanban-in-progress': 'In Progress',
        'kanban-completed': 'Completed'
      }[newSection];
      
      await updateTaskStatus(task.Task_ID, newStatus);

      const orderByDropdownValue = document.querySelector('#proj-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};
      const currentFilters = getEmpCurrentFilters();
      const allFilters = { ...currentFilters, ...orderByParam};

      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(allFilters);

      let filtersLength = Object.keys(allFilters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      searchBarProject.value = "";

      getKanbanData(userId, projectID, allFilters);

      
    });
    

  })

  

}

function changeProjectsCount(cardCounts) {
  // Update the count display elements in the headers
  document.querySelector('#to-do-header .kanban-header-no').innerText = cardCounts["To Do"];
  document.querySelector('#in-progress-header .kanban-header-no').innerText = cardCounts["In Progress"];
  document.querySelector('#completed-header .kanban-header-no').innerText = cardCounts["Completed"];
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
        //endToast("Marked Task as Stuck");
        reportBtn.innerHTML = "Unmark as Stuck";
      } else {
        //sendToast("Unmarked Task as Stuck");
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
    else {
      
      switch (newStatus) {
        case 'To Do':
          break;
        case 'In Progress':
          break;
        case 'Completed':
          break;
      }
      sendToast(`Task status updated to "${newStatus}"`);
    }


  } catch (error) {
    console.log("Error updating the task status", error);
  }
}

function changeCount(cardCounts) {
  // Update the count display elements in the headers
  document.querySelector('#to-do-header .kanban-header-no').innerText = cardCounts["To Do"];
  document.querySelector('#in-progress-header .kanban-header-no').innerText = cardCounts["In Progress"];
  document.querySelector('#completed-header .kanban-header-no').innerText = cardCounts["Completed"];
}

//Add colours to due dates when moved
function validate_date_icon(task, kanbanCardDueDate, currentSectionId) {
  if (currentSectionId === 'kanban-to-do' || currentSectionId === 'kanban-in-progress') {
    if (task.id === 'kanban-task-overdue') {
      kanbanCardDueDate.style.backgroundColor = '#ffcdd2';
      kanbanCardDueDate.style.color = '#c62828';
    } else {
      kanbanCardDueDate.style.backgroundColor = '#F5F5F5';
      kanbanCardDueDate.style.color = '#656565';
    }
  } else if (currentSectionId === 'kanban-completed') {
    kanbanCardDueDate.style.backgroundColor = '#c8e6c9';
    kanbanCardDueDate.style.color = '#388e3c';
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


//====Back to Projects Page
const backToProjectsBtn = document.querySelector('.project-intro .projects-intro-buttons .all-projects-btn');

backToProjectsBtn.addEventListener('click', backToProjects);
window.addEventListener("projectsLoaded", backToProjects);

function backToProjects () {
  //Sawan
  const toggleView = document.querySelector('.leader-switch-buttons');
  toggleView.style.display = 'none';
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const currentProjectLink = document.querySelector('#current-project')
  currentProjectLink.style.display = 'none';
  currentProjectLink.classList.remove('active');
  document.querySelector('.nav-item#projects').classList.add('active');

  // Switch back to kanban tab in case not leader for another project
  switchKanbanTab('active-kanban');

  const navItemContents = document.querySelectorAll('.nav-item-content')
  navItemContents.forEach(item => item.classList.remove('open'))
  const currentProjectContentArea = document.querySelector('#projects-content')
  currentProjectContentArea.classList.add('open');
}





//Filter Modal Functionality
const filterTaskModal = document.querySelector("#proj-kanban-content .non-leader-modal");
const filterTaskBtn = document.querySelector('#proj-kanban-content  .filter-task-btn');
const closeFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn')

filterTaskBtn.addEventListener('click', () => {
  console.log("YAY");
  filterTaskModal.style.display = 'flex';
  })
  closeFilterTaskModal.addEventListener('click', () => {
    filterTaskModal.style.display = 'none';
  })


//Keyword Search
const searchBarProject = document.querySelector('#proj-kanban-content .task-search #searched-task');

searchBarProject.addEventListener('input', ()=>{
  const searchValue = searchBarProject.value.toLowerCase();
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

  const cardCounts = {
    "To Do": countBlockTasks("#proj-kanban-content #kanban-to-do"),
    "In Progress": countBlockTasks("#proj-kanban-content #kanban-in-progress"),
    "Completed": countBlockTasks("#proj-kanban-content #kanban-completed")
  };
  changeProjectsCount(cardCounts);


  if (foundTasks === 0) {
    document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'block';
  } else {
    document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'none';
  }
})


function countBlockTasks(column) {
  const kanbanColumn = document.querySelector(column);
  let tasks = [];
  tasks = kanbanColumn.children;
  let count = 0;
  Array.from(tasks).forEach(task => {
    if (task.style.display === 'block') {
      count++;
    }
  })
  return count;

}



const kanbanItems = document.querySelectorAll('#proj-kanban-content .kanban-item');
const kanbanItemContents = document.querySelectorAll('#proj-kanban-content .kanban-item-content');

function switchKanbanTab(pageId) {

    const kanbanItem = document.getElementById(pageId);

    kanbanItems.forEach(item => item.classList.remove('active'));
    kanbanItem.classList.add('active');


    kanbanItemContents.forEach(item => item.classList.remove('open'))
    const kanbanItemContent = document.querySelector(`#${kanbanItem.id}-content`)

    if (pageId === 'active-leader') {
      document.querySelector('#proj-project-intro-buttons .order-by-dropdown').style.display = 'none';
      document.querySelector('#proj-project-intro-buttons .filter-task-btn ').style.display = 'none';
      document.querySelector('#proj-search-container').style.display = 'none';
      document.querySelector('#admin-kanban-content .all-projects-btn').style.display = 'none';
      document.querySelector('#admin-kanban-content .project-txt').style.display = 'none';
      document.querySelector('#proj-kanban-content .filter-applied-container').style.display = "none";
    } else {
      document.querySelector('#proj-project-intro-buttons .order-by-dropdown').style.display = 'flex';
      document.querySelector('#proj-project-intro-buttons .filter-task-btn ').style.display = 'flex';
      document.querySelector('#proj-search-container').style.display = 'flex';
      document.querySelector('#admin-kanban-content .all-projects-btn').style.display = 'block';
      document.querySelector('#admin-kanban-content .project-txt').style.display = 'block';
      document.querySelector('#proj-kanban-content .filter-applied-container').style.display = "flex";
    }

    kanbanItemContent.classList.add('open');
}


kanbanItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        switchKanbanTab(item.id);
    })
})
