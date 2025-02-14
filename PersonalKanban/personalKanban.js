//Fetch from database send a request to server the database
// to get the personal kanban board
// Send user iD to the personalTaskfetch.php data
const userIdPersonal = document.querySelector('.kanban-content').getAttribute('data-user-id');
document.addEventListener('DOMContentLoaded',()=>{
    fetchPersonalData(userIdPersonal, {});
})



async function fetchPersonalData(userID, filters={}) {
    try {
      let url = `PersonalKanban/queries/personal-tasks-db.php?userID=${encodeURIComponent(userID)}`;

      const filterQuery = new URLSearchParams(filters).toString();
      url += filterQuery ? `&${filterQuery}` : '';
  
      const params = { 
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }

      const response = await fetch(url, params);

      if (!response.ok) {
          //throw new Error('Failed to fetch Personal Tasks data');
          console.log(response);
      }
      
    
      const personalTaskData = await response.json();
      console.log(personalTaskData);
      populatePersonalTasks(personalTaskData)

      const personalCardCounts = {
        "To Do": document.querySelector("#personal-kanban-content #kanban-to-do").children.length,
        "In Progress": document.querySelector("#personal-kanban-content #kanban-in-progress").children.length,
        "Completed": document.querySelector("#personal-kanban-content #kanban-completed").children.length
      };
      changePersonalCount(personalCardCounts);
    } catch(error) {
      console.log("Fetch Issue",error);
      //Show Error Card
    }
}

function changePersonalCount(cardCounts) {
  // Update the count display elements in the headers
  document.querySelector('#personal-kanban-content #to-do-header .kanban-header-no').innerText = cardCounts["To Do"];
  document.querySelector('#personal-kanban-content #in-progress-header .kanban-header-no').innerText = cardCounts["In Progress"];
  document.querySelector('#personal-kanban-content #completed-header .kanban-header-no').innerText = cardCounts["Completed"];
}

function populatePersonalTasks(tasks) {
  const kanbanColumns = {
    "To Do": document.querySelector("#personal-kanban-content #kanban-to-do"),
    "In Progress": document.querySelector("#personal-kanban-content #kanban-in-progress"),
    "Completed": document.querySelector("#personal-kanban-content #kanban-completed")
  };

  Object.values(kanbanColumns).forEach(column => column.innerHTML = ""); //clear columns

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("kanban-card");
    taskCard.setAttribute('data-task-title', task.Name);


    if (taskIsOverdue(task.Due_Date)) {
      taskCard.id = "kanban-task-overdue";
    }


    const fullTaskDescription = task.Description;
    const taskDescriptionWords = fullTaskDescription;
    const previewTaskDescription = taskDescriptionWords.substring(0, 60) + '...';

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
                  <p class="kanban-card-description">${previewTaskDescription}</p>

                  <div class="kanban-separator"></div>

                  <div class="kanban-card-bottom">
                      <a href="">View Task</a>
                      <div class="due-date">
                          <i class="fa fa-regular fa-calendar"></i>
                          <p>Due: ${task.Due_Date}</p>
                      </div>
                  </div>
                </div>`;

    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('modal', 'view-task-modal'); 
    const viewTaskBtn = taskCard.querySelector('.kanban-card-bottom a');




    
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
               <p class="modal-task-description">${task.Description}</p>

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
                           <p>${task.Priority}</p>
                       </div>
                   </div>

                    <div class="modal-task-info-section-top">
                       <p class="task-modal-title">Due Date</p>
                       <div class="modal-task-due-date modal-task-info-section-body">
                           <div class="task-indicator-circle"></div>
                           <p>${task.Due_Date}</p>
                       </div>
                   </div>

               </div>


               <div class="modal-task-btns">
                <a class="personal-delete-task"><i class="fa fa-solid fa-trash"></i> Delete Task</a>
                   
                <div class="move-task-dropdown">
                  <select>
                    <option value="kanban-to-do">To Do</option>
                    <option value="kanban-in-progress">In Progress</option>
                    <option value="kanban-completed">Completed</option>
                  </select>
                  <div>
                    <a href="#" class="move-task-confirm black-btn">Confirm Move</a>
                  </div>
                </div>
                </div>

 

             </div>
         </div>
`;
    

    document.body.appendChild(viewTaskModal);
    kanbanColumns[task.Status]?.appendChild(taskCard);

    //Close and Open Delete Task Modal
    const deleteTaskModal = document.querySelector('#personal-kanban-content #delete-personal-modal');
    const openDeleteTaskModal = viewTaskModal.querySelector('.personal-delete-task');
    const closeDeleteTaskModal = deleteTaskModal.querySelector('#cancel-delete-task-btn');
    openDeleteTaskModal.addEventListener('click', () => {
      deleteTaskModal.style.display = 'flex';
      viewTaskModal.style.display = 'none';
      deleteTaskModal.querySelector('.modal-header').innerHTML = `Delete Personal Task`;
      deleteTaskModal.setAttribute("deleted-personal-task-id", task.PersonalTask_ID);
      deleteTaskModal.querySelector('.modal-body').innerHTML = `Are you sure you want to delete task: #${task.PersonalTask_ID}, ${task.Name}`;
    })
    closeDeleteTaskModal.addEventListener('click', () => {
      deleteTaskModal.style.display = 'none';
    })

    //Closing and opening modal
    const closeViewTaskModal = viewTaskModal.querySelector('.close-modal-btn');

    viewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewTaskModal.style.display = 'flex';
    });

    closeViewTaskModal.addEventListener('click', () => {
      viewTaskModal.style.display = 'none';
    });

    const dueDateDot = viewTaskModal.querySelector('.modal-task-due-date .task-indicator-circle');
    if (taskCard.id === 'kanban-task-overdue') {
      dueDateDot.style.backgroundColor = "#E6757E";
      
    } else {
      dueDateDot.style.backgroundColor = "#ADDA9D";
    }


    const kanbanCardDueDate = taskCard.querySelector('.due-date');
    const currentSectionId = taskCard.parentElement.id;
    validate_date_icon(taskCard, kanbanCardDueDate, currentSectionId)

     //Move button and Update Task Status in Database
     const moveTaskDropDown = viewTaskModal.querySelector('.move-task-dropdown select');
     const moveTaskBtn = viewTaskModal.querySelector('.move-task-dropdown .move-task-confirm');
 
     //Moving Cards Using Dropdown
     moveTaskBtn.addEventListener('click', async () => {
       const newSection = moveTaskDropDown.value;
       const newSectionElement = document.getElementById(newSection);
 
       newSectionElement.insertBefore(taskCard, newSectionElement.firstChild);
       viewTaskModal.style.display = 'none';
 
       //checkStatus(taskCard, statusBox, statusCircle)
       //validate_date_icon(taskCard, kanbanCardDueDate, newSection);
 
       let newStatus = {
         'kanban-to-do': 'To Do',
         'kanban-in-progress': 'In Progress',
         'kanban-completed': 'Completed'
       }[newSection];

       validate_date_icon(taskCard, kanbanCardDueDate, newSection)
       
       await updatePersonalTaskStatus(task.PersonalTask_ID, newStatus);
 
       const orderByDropdownValue = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
       const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};
       const currentFilters = getCurrentFilterPersonal();
       const allFilters = { ...currentFilters, ...orderByParam};
 
       filterAppliedMsg.style.display = 'block';
       filterAppliedMsg.innerHTML = createFiltersMsgPersonal(allFilters);
 
       let filtersLength = Object.keys(allFilters).length;
       if (filtersLength > 0) {
         filterRemoveBtn.style.display = 'flex';
       } else {
         filterRemoveBtn.style.display = 'none';
       }
 
       searchBarPersonal.value = "";
 
       fetchPersonalData(userIdPersonal, allFilters);
 
       
     });


  });
  
}




async function updatePersonalTaskStatus(taskID, newStatus) {
  try {
    const url = 'PersonalKanban/queries/update-status-db.php';
    
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




//Keyword Search
const searchBarPersonal = document.querySelector('#personal-kanban-content .task-search #searched-task');

searchBarPersonal.addEventListener('input', ()=>{
  const searchValue = searchBarPersonal.value.toLowerCase();
  const allTasks = document.querySelectorAll('.kanban-card');
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

  const personalCardCounts = {
    "To Do": countBlockTasks("#personal-kanban-content #kanban-to-do"),
    "In Progress": countBlockTasks("#personal-kanban-content #kanban-in-progress"),
    "Completed": countBlockTasks("#personal-kanban-content #kanban-completed")
  };
  changePersonalCount(personalCardCounts);

  if (foundTasks === 0) {
    document.querySelector('#personal-kanban-content .search-task-error-msg').style.display = 'block';
  } else {
    document.querySelector('#personal-kanban-content .search-task-error-msg').style.display = 'none';
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


//Filters
const filterTaskModalPersonal = document.querySelector("#personal-kanban-content #filter-modal");
const filterTaskBtnPersonal = document.querySelector('#personal-kanban-content  .filter-task-btn');
const closeFilterTaskModalPersonal = filterTaskModalPersonal.querySelector('#filter-modal .close-modal-btn')

filterTaskBtnPersonal.addEventListener('click', () => {
  filterTaskModalPersonal.style.display = 'flex';
  })
  closeFilterTaskModalPersonal.addEventListener('click', () => {
    filterTaskModalPersonal.style.display = 'none';
  })




  const filterKanbanModal = document.querySelector('#personal-kanban-content #filter-modal')
  document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value = 'None';
  filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = 'All';
  filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = 'All';
    

  
//Filters
const filterAppliedMsg = document.querySelector('#personal-kanban-content .filter-applied-msg');
const filterRemoveBtn = document.querySelector(' #personal-kanban-content .remove-filters-btn');

const applyFilterBtn = filterKanbanModal.querySelector('#add-filter-btn');
applyFilterBtn.addEventListener('click', () => {
  const priorityValue = filterKanbanModal.querySelector('.task-dropdown-priority #priority').value;
  const dateValue = filterKanbanModal.querySelector('.task-dropdown-date #date-task').value;
  
  const filters = {priorityValue,dateValue};

  if (priorityValue === "All") {
    delete filters.priorityValue;
  }
  if (dateValue === "All") {
    delete filters.dateValue;
  }

  const orderByValue = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
  if (orderByValue !== "None") {
    filters.orderByValue = orderByValue;
  } 

  filterAppliedMsg.style.display = 'block';
  filterAppliedMsg.innerHTML = createFiltersMsgPersonal(filters);
  let filtersLength = Object.keys(filters).length;
  if (filtersLength > 0) {
    filterRemoveBtn.style.display = 'flex';
  } else {
    filterRemoveBtn.style.display = 'none';
  }


  filterTaskModalPersonal.style.display = 'none';
  searchBarPersonal.value = "";

  fetchPersonalData(userIdPersonal, filters);
})

//Order By Filters
const orderByBtn = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-confirm');
orderByBtn.addEventListener('click', () => {
  const orderByDropdownValue = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
  const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};


  const currentFilters = getCurrentFilterPersonal();
  const allFilters = { ...currentFilters, ...orderByParam};


  filterAppliedMsg.style.display = 'block';
  filterAppliedMsg.innerHTML = createFiltersMsgPersonal(allFilters);

  let filtersLength = Object.keys(allFilters).length;
  if (filtersLength > 0) {
    filterRemoveBtn.style.display = 'flex';
  } else {
    filterRemoveBtn.style.display = 'none';
  }

  searchBarPersonal.value = "";

  fetchPersonalData(userIdPersonal, allFilters);
})

filterRemoveBtn.addEventListener('click', () => {
  filterAppliedMsg.innerHTML = "";
  filterAppliedMsg.style.display = 'none';
  filterRemoveBtn.style.display = 'none';
  searchBarPersonal.value = "";
  document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value = "None";
  filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = "All";
  filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = "All";

  fetchPersonalData(userIdPersonal, {});
})

function getCurrentFilterPersonal() {
  const filterKanbanModal = document.querySelector('#personal-kanban-content #filter-modal');
  const priorityValue = filterKanbanModal.querySelector('.task-dropdown-priority #priority').value;
  const dateValue = filterKanbanModal.querySelector('.task-dropdown-date #date-task').value;
  
  const filters = {priorityValue,dateValue};

  if (priorityValue === "All") {
    delete filters.priorityValue;
  }
  if (dateValue === "All") {
    delete filters.dateValue;
  }

  return filters;
}



function createFiltersMsgPersonal(filters) {
  let applied = [];
  if (filters.priorityValue && filters.priorityValue !== "All") {
    applied.push(filters.priorityValue + " Priority");
  }
  if (filters.dateValue && filters.dateValue !== "All") {
    applied.push("Due Date: " + filters.dateValue)
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

//=== Personal Board Task Board
const addTaskBtn = document.querySelector('#personal-content .add-task-btn')
const addTaskModal = document.querySelector('#personal-content .add-task-modal')
const closeAddTaskModal = addTaskModal.querySelector('.close-modal-btn')
const submitTaskBtn = addTaskModal.querySelector('.add-task-btn')

addTaskBtn.addEventListener('click', () => {
  addTaskModal.style.display = 'flex';
})
closeAddTaskModal.addEventListener('click', () => {
  addTaskModal.style.display = 'none';
})

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

//Sending data whena adding task to data base 
async function addPersonalTask(taskName, taskDescription, taskPriority, taskDueDate, userIdPersonal) {
    try {
      const url = 'PersonalKanban/queries/add-personal-task-db.php';
      
      const data = {
        Name: taskName,
        Description: taskDescription,
        Priority: taskPriority,
        Due_Date: taskDueDate,
        User_ID: userIdPersonal,
        Status: 'To Do'
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

submitTaskBtn.addEventListener('click', async () => {
  //get data from add task modal and validate it firts
  const taskName = addTaskModal.querySelector('#task-title').value;
  const taskDescription = addTaskModal.querySelector('#task-description').value;
  const taskPriority = addTaskModal.querySelector('#priority').value;
  const taskDueDate = addTaskModal.querySelector('#date-input').value;
  const errorMessage = addTaskModal.querySelector('#error-message');
  
  console.log(taskName, taskDescription, taskPriority, taskDueDate);
  
  if (taskName === "" || taskDescription === "" || taskPriority === "" || taskDueDate === "") {
    errorMessage.textContent = 'Please fill out all fields';
    errorMessage.style.display = 'block';
    return;
  }
  alert('Task Added');
  addTaskModal.style.display = 'none';
  //send data to database to write 
  await addPersonalTask(taskName, taskDescription, taskPriority, taskDueDate, userIdPersonal);
  fetchPersonalData(userIdPersonal, {});

})


//Open and Close Kanban Modal 
const kanbanContainersPersonal = document.querySelectorAll('#personal-kanban-content .kanban-board .kanban-section')
kanbanContainersPersonal.forEach(kanbanContainer => {
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
