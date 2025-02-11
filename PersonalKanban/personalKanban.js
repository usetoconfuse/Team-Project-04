//Fetch from database send a request to server the database
// to get the personal kanban board
// Send user iD to the personalTaskfetch.php data

document.addEventListener('DOMContentLoaded',()=>{
    const userID = document.querySelector('.kanban-content').getAttribute('data-user-id');
    fetchPersonalData(userID);
})



async function fetchPersonalData(userID) {
    try {
      let url = `PersonalKanban/queries/personal-tasks-db.php?userID=${encodeURIComponent(userID)}`;


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


console.log(document.querySelector("#personal-kanban-content #kanban-to-do"))
console.log(document.querySelector("#personal-kanban-content #kanban-in-progress"))
console.log(document.querySelector("#personal-kanban-content #kanban-completed"))


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
    taskCard.setAttribute("draggable", true);
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

                                              </div>

                                              <div class="modal-task-info">
                                                
                                                  <div class="modal-task-info-section">
                                                      <div class="modal-task-info-section-header">
                                                          <i class="fa fa-regular fa-calendar"></i>
                                                          <p>Due date</p>
                                                      </div>
                                                      <div class="modal-task-info-section-body modal-task-due-date">
                                                          <div class="task-indicator-circle"></div>
                                                          <p>${task.Due_Date}</p>
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

     

    
    
    taskCard.addEventListener("dragstart", () => {
      taskCard.classList.add("dragging");
      setTimeout(() => {taskCard.classList.add('overlay')}, 1)
    });
    taskCard.addEventListener("dragend", () => {
        //Dynamically set task status when moving card to other columns
      //checkStatus(taskCard, statusBox, statusCircle)

      taskCard.classList.remove("dragging");
      taskCard.classList.remove('overlay')

      //const currentSectionId = taskCard.parentElement.id;
      //const kanbanCardDueDate = taskCard.querySelector('.due-date');
      //validate_date_icon(taskCard, kanbanCardDueDate, currentSectionId);
      
    });

    


    



  });
  
}

    //====Dragging Features
    const kanbanSection = document.querySelectorAll('#personal-kanban-content .kanban-body')  
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
 