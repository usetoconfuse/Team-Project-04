const kanbanContainer = document.querySelector('.kanban-board');

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

//====Add Task Modal 
const addTaskModal = document.querySelector('.kanban-add-task-modal')
const addTaskBtn = document.querySelector('.add-task-btn')
const closeAddTaskModal = document.querySelector('.kanban-close-modal-btn')

addTaskBtn.addEventListener('click', () => {
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

//====Dragging Features

  const taskCard = document.querySelectorAll('.kanban-card')
  const kanbanSection = document.querySelectorAll('.kanban-body')
  
  taskCard.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
      setTimeout(() => {task.classList.add('overlay')}, 1)
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
      task.classList.remove('overlay')
      // GET THE ID OF WHERE TH EITEM IS DROPPED IN
      // DEPENDING ON THIS WE RUN SOME CODE
      const currentSectionId = task.parentElement.id;
      const kanbanCardDueDate = task.querySelector('.due-date');

      //Change the overdue tag depending on section it is in 
      if (task.id === 'kanban-task-overdue') {
        if (currentSectionId === 'kanban-to-do' || currentSectionId === 'kanban-in-progress') {
          kanbanCardDueDate.style.backgroundColor = '#E6757E';
          kanbanCardDueDate.style.color = 'white';
        } else if (currentSectionId === 'kanban-completed') {
          kanbanCardDueDate.style.backgroundColor = '';
          kanbanCardDueDate.style.color = '#BAB7B7';
        }
      } 
      
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















