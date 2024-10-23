const kanbanContainer = document.querySelector('.kanban-board');

//====Open and Close Task cards
kanbanContainer.addEventListener('click', (e) => {
    const kanbanCardHeader = e.target.closest('.kanban-card-top');
    if (!kanbanCardHeader) return;
    

    const kanbanCardGroup = kanbanCardHeader.parentElement;
    const kanbanCardBody = kanbanCardGroup.querySelector('.kanban-card-body');
    const openCloseIcon = kanbanCardGroup.querySelector('.kanban-card-top i:nth-of-type(2)');

    openCloseIcon.classList.toggle('fa-caret-down');
    openCloseIcon.classList.toggle('fa-caret-up');
    
    kanbanCardBody.classList.toggle('open');

    const otherCards = kanbanContainer.querySelectorAll('.kanban-card');
    otherCards.forEach(otherCard => {
        if (otherCard != kanbanCardGroup) {
            const otherCardBody = otherCard.querySelector('.kanban-card-body')
            const otherCardIcon = otherCard.querySelector('.kanban-card-top i:nth-of-type(2)')
            otherCardBody.classList.remove('open')
            otherCardIcon.classList.remove('fa-caret-up')
            otherCardIcon.classList.add('fa-caret-down')
        }
    })
})

//====Open and Close Kanban Columns
kanbanContainer.addEventListener('click', (e) => {
    const kanbanColumnHeader = e.target.closest('.kanban-header');
    if (!kanbanColumnHeader) return;

    const kanbanColumnGroup = kanbanColumnHeader.parentElement;
    const kanbanColumnBody = kanbanColumnGroup.querySelector('.kanban-body');
    const kanbanColumnIcon = kanbanColumnGroup.querySelector('.kanban-header i');

    kanbanColumnIcon.classList.toggle('fa-caret-down');
    kanbanColumnIcon.classList.toggle('fa-caret-up');

    kanbanColumnBody.classList.toggle('open');

    const otherColumns = kanbanContainer.querySelectorAll('.kanban-section')
    otherColumns.forEach(otherColumn => {
        if (otherColumn != kanbanColumnGroup) {
            const otherColumnBody = otherColumn.querySelector('.kanban-body');
            const otherColumnIcon = otherColumn.querySelector('.kanban-header i');
            otherColumnBody.classList.remove('open')
            otherColumnIcon.classList.remove('fa-caret-up')
            otherColumnIcon.classList.add('fa-caret-down')
        }
    })


})