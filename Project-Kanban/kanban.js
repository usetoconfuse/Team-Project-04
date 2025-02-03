const kanbanContainers = document.querySelectorAll('.kanban-board');

//Wait for View button to be clicked and when it is, Project.js deals with opening the 
//new kanban tab on the site, but the projectID is got here for use in the Fetch request



// Listen for sessionStorage updates
window.addEventListener("storage", function () {
  const selectedProjectID = sessionStorage.getItem('clicked-project-id');

  if (selectedProjectID) {
    console.log("Selected Project:", selectedProjectID);
    //document.querySelector("#kanban-content .project-intro .project-txt p").innerHTML = selectedProjectID;
    const kanbanContainer = document.querySelector('#kanban-content')
    const userID = kanbanContainer.getAttribute('data-user-id');
    console.log(userID);
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

    const kanbanData = await response.json();

    console.log(kanbanData);

    kanbanData.forEach((task) => {
      console.log("do something")
    })
  } catch (error) {
    console.log("Fetch Issue",error);
  }
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

  //Switch back to the normal URL
  const currentURL = new URL(window.location.href);
  currentURL.searchParams.delete('projectID');
  history.pushState(null, '', currentURL.toString());
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
  window.addEventListener('click', (e) => {
    if (e.target == addTaskModal) {
      addTaskModal.style.display = 'none';
    }
  })
})


//====Add Task Modal 
const taskCard = document.querySelectorAll('.kanban-card')

document.addEventListener('DOMContentLoaded', () => {
  const taskCards = document.querySelectorAll('.kanban-card');
  const userRole = document.getElementById('kanban-content').getAttribute('data-role');

  taskCards.forEach((task) => {
    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('modal', 'view-task-modal'); 
    const viewTaskBtn = task.querySelector('.kanban-card-bottom a');
    
    //===Fields from the card:===
    //Task Status, Task Title, Description, Due Date
    let taskStatus = ""
    if (task.parentElement.id === 'kanban-to-do') {
      taskStatus = "To Do";
    } else if (task.parentElement.id === "kanban-in-progress") {
      taskStatus = "In Progress";
    } else if (task.parentElement.id === "kanban-completed") {
      taskStatus = "Completed";
    }

    const taskTitle = task.querySelector('.kanban-card-top p').innerText;
    const taskDueDate = task.querySelector('.due-date p').innerText;

    console.log(task.querySelector('.kanban-card-priority'))
    
    const priorityElement = task.querySelector('.kanban-card-priority');
    let taskPriority = "";
    if (priorityElement.classList.contains('high-priority')) {
      taskPriority = "High Priority";
    } else if (priorityElement.classList.contains('medium-priority')) {
      taskPriority = "Medium Priority";
    } else if (priorityElement.classList.contains('low-priority')) {
      taskPriority = "Low Priority";
    } else if (priorityElement.classList.contains('none-priority')) {
      taskPriority = "No Priority";
    }


    const fullTaskDescription = task.querySelector('.kanban-card-description').innerText;
    //const taskDescriptionWords = fullTaskDescription.split(' ');
    //const previewTaskDescription = taskDescriptionWords.slice(0, 20).join(' ') + '...';
    const taskDescriptionWords = fullTaskDescription
    const previewTaskDescription = taskDescriptionWords.substring(0, 40) + '...';
  
    //Set shorter description inside the card
    const taskDescriptionElement = task.querySelector('.kanban-card .kanban-card-body .kanban-card-description');
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
                                                          <p>${taskStatus}</p>
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
                                                      <p>Quinn Little</p>
                                                  </div>
                                              </div>


                                              <div class="modal-task-info">
                                                  <div class="modal-task-info-section">
                                                      <div class="modal-task-info-section-header">
                                                          <i class="fa fa-solid fa-user"></i>
                                                          <p>Created by</p>
                                                      </div>
                                                      <div class="modal-task-info-section-body">
                                                          <p>John Little</p>
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

    //add modal to body of document
    document.body.appendChild(viewTaskModal);

    //Move Task Click
    const moveTaskDropDown = viewTaskModal.querySelector('.move-task-dropdown');
    
    
    
    //Priority Colours in modal 
    const priorityBox = viewTaskModal.querySelector('.priority-box');
    const priorityCircle = viewTaskModal.querySelector('.priority-box .task-indicator-circle');

    if (priorityElement.classList.contains('high-priority')) {
      priorityBox.style.backgroundColor = "#dd9592";
      priorityCircle.style.backgroundColor = "red";
    } else if (priorityElement.classList.contains('medium-priority')) {
      priorityBox.style.backgroundColor = "#EAB385";
      priorityCircle.style.backgroundColor = "orange";
    } else if (priorityElement.classList.contains('low-priority')) {
      priorityBox.style.backgroundColor = "#ADDA9D";
      priorityCircle.style.backgroundColor = "green";
    } else if (priorityElement.classList.contains('none-priority')) {
      priorityBox.style.backgroundColor = "#F5F5F5";
      priorityCircle.style.backgroundColor = "#8E8E91";
    }

     //Due Date dot colour 
     const dueDateDot = viewTaskModal.querySelector('.modal-task-due-date .task-indicator-circle');
     if (task.id === 'kanban-task-overdue') {
       dueDateDot.style.backgroundColor = "#E6757E";
     } else {
       dueDateDot.style.backgroundColor = "#ADDA9D";
     }

    //Dynamically set task status when moving card to other columns
    const statusBox = viewTaskModal.querySelector('.status-box');
    const statusCircle = viewTaskModal.querySelector('.status-box .task-indicator-circle');
    checkStatus(task, statusBox, statusCircle)

    task.addEventListener('dragend', () => {
      checkStatus(task, statusBox, statusCircle)
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

    window.addEventListener('click', (e) => {
      if (e.target === viewTaskModal) {
        viewTaskModal.style.display = 'none';
      }
    });

  });
});

function checkStatus(task, statusBox, statusCircle) {
  let taskStatus;
  if (task.parentElement.id === 'kanban-to-do') {
    taskStatus = "To Do";
    statusBox.style.backgroundColor = "#dd9592";
    statusCircle.style.backgroundColor = "red";
  } else if (task.parentElement.id === "kanban-in-progress") {
    taskStatus = "In Progress";
    statusBox.style.backgroundColor = "#EAB385";
    statusCircle.style.backgroundColor = "orange";
  } else if (task.parentElement.id === "kanban-completed") {
    taskStatus = "Completed";
    statusBox.style.backgroundColor = "#ADDA9D";
    statusCircle.style.backgroundColor = "green";
  }
  
  // Update the displayed task status text in the modal
  statusBox.querySelector('p').textContent = taskStatus;
}

//====Dragging Features
  const kanbanSection = document.querySelectorAll('.kanban-body')
  
  taskCard.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
      setTimeout(() => {task.classList.add('overlay')}, 1)
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
      task.classList.remove('overlay')

      const currentSectionId = task.parentElement.id;
      const kanbanCardDueDate = task.querySelector('.due-date');

      //Change the overdue tag depending on section it is in 
      validate_date_icon(task, kanbanCardDueDate, currentSectionId);
      
    });

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

//Add colours to due dates on load
document.addEventListener('DOMContentLoaded', () => {
  const taskCards = document.querySelectorAll('.kanban-board .kanban-card');
  taskCards.forEach(task => {
    const kanbanCardDueDate = task.querySelector('.due-date');
    const currentSectionId = task.parentElement.id;
    validate_date_icon(task, kanbanCardDueDate, currentSectionId);
    if (currentSectionId === 'kanban-completed'){
      kanbanCardDueDate.style.backgroundColor = '#ADDA9D';
      kanbanCardDueDate.style.color = 'white';
    }
  });




});



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
