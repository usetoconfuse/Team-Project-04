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

//====Dragging Features

  const taskCard = document.querySelectorAll('.kanban-card')
  const kanbanSection = document.querySelectorAll('.kanban-body')
  
  taskCard.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
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















