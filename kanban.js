const kanbanContainers = document.querySelectorAll('.kanban-board');


kanbanContainers.forEach(kanbanContainer => {
  //====Open and Close Task cards
  kanbanContainer.addEventListener('click', (e) => {
    const kanbanCardHeader = e.target.closest('.kanban-card-top');
    if (!kanbanCardHeader) return;


    const kanbanCardGroup = kanbanCardHeader.parentElement;
    const kanbanCardBody = kanbanCardGroup.querySelector('.kanban-board .kanban-card-body');
    const openCloseIcon = kanbanCardGroup.querySelector('.kanban-board .kanban-card-top i:nth-of-type(2)');

    openCloseIcon.classList.toggle('fa-caret-down');
    openCloseIcon.classList.toggle('fa-caret-up');
    
    kanbanCardBody.classList.toggle('open');

    const otherCards = kanbanContainer.querySelectorAll('.kanban-board .kanban-card');
    otherCards.forEach(otherCard => {
        if (otherCard != kanbanCardGroup) {
            const otherCardBody = otherCard.querySelector('.kanban-board .kanban-card-body')
            const otherCardIcon = otherCard.querySelector('.kanban-board .kanban-card-top i:nth-of-type(2)')
            otherCardBody.classList.remove('open')
            otherCardIcon.classList.remove('fa-caret-up')
            otherCardIcon.classList.add('fa-caret-down')
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
  addTaskModal.classList.add('kanban-modal', 'add-task-modal')
  addTaskModal.innerHTML = `
    <div class="kanban-modal-box">
        <!--Header-->
        <div class="kanban-modal-header">
            <p>Add Task</p>
            <div class="kanban-close-modal-btn">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
        <!--Body-->
        <form>
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
    </div>
`

  document.body.appendChild(addTaskModal);

  const closeAddTaskModal = addTaskModal.querySelector('.kanban-close-modal-btn')

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
  taskCard.forEach((task) => {
    const viewTaskModal = document.createElement('div');
    viewTaskModal.classList.add('kanban-modal', 'view-task-modal')
    const viewTaskBtn = task.querySelector('.kanban-card-bottom a')
    viewTaskModal.innerHTML = `
      <div class="kanban-modal-box">
          <!--Header-->
          <div class="kanban-modal-header">
              <p>Task Title</p>
              <div class="kanban-close-modal-btn">
                  <i class="fa-solid fa-x"></i>
              </div>
          </div>
          <!--Body-->
          <div class="kanban-modal-body">
            <p></p>
          </div>
      </div>
  `
  document.body.appendChild(viewTaskModal)
  
    const closeViewTaskModal = viewTaskModal.querySelector('.kanban-close-modal-btn')
  
    viewTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewTaskModal.style.display = 'flex';
    })
    closeViewTaskModal.addEventListener('click', () => {
      viewTaskModal.style.display = 'none';
    })
    window.addEventListener('click', (e) => {
      if (e.target == viewTaskModal) {
        viewTaskModal.style.display = 'none';
      }
    })

    document.body.appendChild(viewTaskModal)
    
  })
})



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

