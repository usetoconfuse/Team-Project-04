//Fetch from database send a request to server the database
// to get the personal kanban board
// Send user iD to the personalTaskfetch.php data
const userId = document.querySelector('.kanban-content').getAttribute('data-user-id');
document.addEventListener('DOMContentLoaded',()=>{
    fetchPersonalData(userId, {});
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
    } catch(error) {
      //console.log("Fetch Issue",error);
      //Show Error Card
    }
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
                       <div class="status-box">
                           <div class="task-indicator-circle"></div>
                           <p>${task.Status}</p>
                       </div>
                   </div>

                   <div class="modal-task-info-section-top">
                       <p class="task-modal-title">Priority</p>
                       <div class="priority-box">
                           <div class="task-indicator-circle"></div>
                           <p>${task.Priority}</p>
                       </div>
                   </div>

                    <div class="modal-task-info-section-top">
                       <p class="task-modal-title">Due Date</p>
                       <div class="status-box">
                           <div class="task-indicator-circle"></div>
                           <p>${task.Due_Date}</p>
                       </div>
                   </div>

               </div>


               <div class="modal-task-btns">
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

    //Closing and opening modal
    const closeViewTaskModal = viewTaskModal.querySelector('.close-modal-btn');

    viewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewTaskModal.style.display = 'flex';
    });

    closeViewTaskModal.addEventListener('click', () => {
      viewTaskModal.style.display = 'none';
    });

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
       
       await updatePersonalTaskStatus(task.PersonalTask_ID, newStatus);
 
       const orderByDropdownValue = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
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
 
       fetchPersonalData(userId, allFilters);
 
       
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
  if (foundTasks === 0) {
    document.querySelector('#personal-kanban-content .search-task-error-msg').style.display = 'block';
  } else {
    document.querySelector('#personal-kanban-content .search-task-error-msg').style.display = 'none';
  }
})


//Filters
const filterTaskModal = document.querySelector("#personal-kanban-content #filter-modal");
const filterTaskBtn = document.querySelector('#personal-kanban-content  .filter-task-btn');
const closeFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn')

filterTaskBtn.addEventListener('click', () => {
  filterTaskModal.style.display = 'flex';
  })
  closeFilterTaskModal.addEventListener('click', () => {
    filterTaskModal.style.display = 'none';
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

  fetchPersonalData(userId, filters);
})

//Order By Filters
const orderByBtn = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-confirm');
orderByBtn.addEventListener('click', () => {
  const orderByDropdownValue = document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value;
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

  fetchPersonalData(userID, allFilters);
})

filterRemoveBtn.addEventListener('click', () => {
  filterAppliedMsg.innerHTML = "";
  filterAppliedMsg.style.display = 'none';
  filterRemoveBtn.style.display = 'none';
  searchBarPersonal.value = "";
  document.querySelector('#personal-kanban-content .projects-intro-buttons .order-by-dropdown select').value = "None";
  filterKanbanModal.querySelector('.task-dropdown-priority #priority').value = "All";
  filterKanbanModal.querySelector('.task-dropdown-date #date-task').value = "All";

  fetchPersonalData(userID, {});
})

function getCurrentFilters() {
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



function createFiltersMsg(filters) {
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