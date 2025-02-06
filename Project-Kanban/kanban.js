const kanbanContainers = document.querySelectorAll('.kanban-board');

// Listen for sessionStorage updates
window.addEventListener("storage", function () {
  const selectedProjectID = sessionStorage.getItem('clicked-project-id');

  if (selectedProjectID) {
    const kanbanContainer = document.querySelector('#kanban-content')
    const userID = kanbanContainer.getAttribute('data-user-id');
    getKanbanData(userID, selectedProjectID);
    
  }

  


});


async function getKanbanData(userID, projectID) {
  try {

    let url = `Project-Kanban/kanban-db.php?userID=${encodeURIComponent(userID)}&projectID=${encodeURIComponent(projectID)}`; 
    const params = { 
      method: "GET" 
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const allKanbanData = await response.json();
    document.querySelector("#kanban-content .project-intro .project-txt p").innerHTML = allKanbanData[0].Project_Title;
    console.log(allKanbanData);
    generateCard(allKanbanData);

  } catch (error) {
    console.log("Fetch Issue",error);
  }
}
      

function generateCard(kanbanData) {
  const kanbanColumns = {
    "To Do": document.querySelector("#kanban-to-do"),
    "In Progress": document.querySelector("#kanban-in-progress"),
    "Completed": document.querySelector("#kanban-completed")
  };

  Object.values(kanbanColumns).forEach(column => column.innerHTML = ""); //clear columns

  kanbanData.forEach(task => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("kanban-card");
    taskCard.setAttribute("draggable", true);

    if (taskIsOverdue(task.Due_Date)) {
      taskCard.id = "kanban-task-overdue";
    }

    taskCard.innerHTML = `
                    <div class="kanban-card-top">
                      <div class='kanban-card-top-left'>
                          <div class="kanban-card-priority ${task.Priority.toLowerCase()}-priority"></div>
                          <p>${task.Name} <span>#${task.Task_ID}</span></p>
                      </div>
                      <div class="user" style="background-color: var(--blue);"><i class="fa fa-solid fa-user"></i>
                      </div>

                    </div>
                    <div class="kanban-card-body">
                      <p class="kanban-card-description">${task.Description}</p>

                      <div class="kanban-separator"></div>

                      <div class="kanban-card-bottom">
                          <a href="">View Task</a>
                          <div class="due-date">
                              <i class="fa fa-regular fa-calendar"></i>
                              <p>Due: ${task.Due_Date}</p>
                          </div>
                      </div>
                    </div>`;


    
    const userRole = document.getElementById('kanban-content').getAttribute('data-role');

    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('modal', 'view-task-modal'); 
    const viewTaskBtn = taskCard.querySelector('.kanban-card-bottom a');
    
    //===Fields from database for View Modal

    const taskTitle = task.Name;
    const taskDueDate = task.Due_Date;

    
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
    const previewTaskDescription = taskDescriptionWords.substring(0, 40) + '...';
  
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
      roleBasedBtns = ` <div class="report-task">
                              <p>Report as stuck</p>
                            </div>
                            <div class="move-task-dropdown">
                              <select>
                                <option value="to-do">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
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
                                  <div class="modal-box .view-task-modal-box">
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
                                                          <p>${taskDueDate}</p>
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

    //Add Card and Modal to body
    document.body.appendChild(viewTaskModal);
    kanbanColumns[task.Status]?.appendChild(taskCard);

    //on load, set status in card
    const statusBox = viewTaskModal.querySelector('.status-box');
    const statusCircle = viewTaskModal.querySelector('.status-box .task-indicator-circle');
    checkStatus(taskCard, statusBox, statusCircle)

    //Move Task Click
    const moveTaskDropDown = viewTaskModal.querySelector('.move-task-dropdown');
    
    
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


    
    //====Dragging Features
    const kanbanSection = document.querySelectorAll('.kanban-body')
    

    taskCard.addEventListener("dragstart", () => {
      taskCard.classList.add("dragging");
      setTimeout(() => {taskCard.classList.add('overlay')}, 1)
    });
    taskCard.addEventListener("dragend", () => {
        //Dynamically set task status when moving card to other columns
      checkStatus(taskCard, statusBox, statusCircle)

      taskCard.classList.remove("dragging");
      taskCard.classList.remove('overlay')

      const currentSectionId = taskCard.parentElement.id;
      const kanbanCardDueDate = taskCard.querySelector('.due-date');

      //Change the overdue tag depending on section it is in 
      validate_date_icon(taskCard, kanbanCardDueDate, currentSectionId);
      
    });



    kanbanSection.forEach((section) => {
      section.addEventListener("dragover", (e) => {
        e.preventDefault();
    
        const taskBelow = insertAbove(section, e.clientY);
        const draggedTask = document.querySelector(".dragging");
    
        if (!taskBelow) {
          section.appendChild(draggedTask);
        } else {
          section.insertBefore(draggedTask, taskBelow);
        }
      });
    });
    
    const insertAbove = (section, mouseY) => {
      const notDraggedTasks = section.querySelectorAll(".kanban-card:not(.dragging)");
    
      let closestTask = null;
      let closestOffset = Number.NEGATIVE_INFINITY;
    
      notDraggedTasks.forEach((task) => {
        const { top } = task.getBoundingClientRect();
    
        const offset = mouseY - top;
    
        if (offset < 0 && offset > closestOffset) {
          closestOffset = offset;
          closestTask = task;
        }
      });
    
      return closestTask;
    };


    const kanbanCardDueDate = taskCard.querySelector('.due-date');
    if (task.Status === "To Do" || task.Status === "In Progress") {
      if (taskCard.id === 'kanban-task-overdue') {
        kanbanCardDueDate.style.backgroundColor = '#E6757E';
        kanbanCardDueDate.style.color = 'white';
      } else {
        kanbanCardDueDate.style.backgroundColor = '#F5F5F5';
        kanbanCardDueDate.style.color = '#656565';
      }
    } else if (task.Status === "Completed") {
      kanbanCardDueDate.style.backgroundColor = '#ADDA9D';
      kanbanCardDueDate.style.color = 'white';
    }



  })

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
      kanbanCardDueDate.style.backgroundColor = '';
      kanbanCardDueDate.style.color = '#BAB7B7';
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
                        <input type="date" name="date" id="date">
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


//====View Task Modal 




//Filter Modal Functionality
const filterTaskModal = document.querySelector("#filter-modal");
const filterTaskBtn = document.querySelector('.filter-task-btn');
const closeFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn')

filterTaskBtn.addEventListener('click', () => {
  filterTaskModal.style.display = 'flex';
  })
  closeFilterTaskModal.addEventListener('click', () => {
    filterTaskModal.style.display = 'none';
  })
  window.addEventListener('click', (e) => {
    if (e.target == filterTaskModal) {
      filterTaskModal.style.display = 'none';
    }
  })
