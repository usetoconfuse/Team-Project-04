window.addEventListener("storage", function () {
    const selectedProjectID = sessionStorage.getItem('clicked-project-id');
    console.log(selectedProjectID);

    getProjectName(selectedProjectID);


    //load project stats from the database
    getProjectTable(selectedProjectID);
    
});



async function getProjectName(selectedProjectID) {
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
      document.querySelector("#admin-kanban-content .project-intro .project-txt p").innerHTML = projectNameData[0].Project_Title;
  
  
    } catch (error) {
      console.log("Fetch Issue",error);
    }
}

  async function getProjectTable(selectedProjectID) {
    try {
    let url = `Project-Kanban/get-project-table-db.php?projectID=${encodeURIComponent(selectedProjectID)}`; 

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const adminProjectData = await response.json();
    console.log(adminProjectData);
    populateTasksTable(adminProjectData);
    
  
    } catch (error) {
        console.log("Fetch Issue",error);
    }
}


function populateTasksTable(tableData) {
    const tableBody = document.querySelector(".emp-projectKanban-bottom tbody");
    tableBody.innerHTML = "";
    tableData.forEach(task => {
        const row = document.createElement('tr');

        let taskStuck = (task.Stuck === '1' || task.Stuck === '2') ? "Yes" : "No";

        row.innerHTML = `   <td>${task.Task_ID}</td>
                            <td id="emp-task-title">${task.Name}</td>
                            <td><p class="emp-table-status emp-table-status-${task.Status.toLowerCase().replace(/\s+/g, '-')}">${task.Status}</p></td>
                            <td><p class="emp-table-priority emp-table-priority-${task.Priority.toLowerCase()}">${task.Priority}</p></td>
                            <td>${task.Due_Date}</td>
                            <td><p class="stuck-${taskStuck.toLowerCase()}">${taskStuck}</p></td>
                            <td>${task.Assignee_ID}: ${task.assignee_forename} ${task.assignee_surname}</td>
                            <td>${task.Author_ID}: ${task.assigned_by_forename} ${task.assigned_by_surname}</td>
                            <td><a class="view-admin-functionality-btn">More</a></td>  `;
        
        tableBody.appendChild(row);

    })
}



//====Back to Projects Page Button
const backToProjectsBtn = document.querySelector('#admin-kanban-content .project-intro .projects-intro-buttons .all-projects-btn');
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
const addProjectTaskBtn = document.querySelector('#admin-kanban-content .add-task-btn')
const addProjectTaskModal = document.querySelector('#admin-kanban-content .add-task-modal')
const closeProjectAddTaskModal = addProjectTaskModal.querySelector('.close-modal-btn')



addProjectTaskBtn.addEventListener('click', () => {
    addProjectTaskModal.style.display = 'flex';
})
closeProjectAddTaskModal.addEventListener('click', () => {
    addProjectTaskModal.style.display = 'none';
})



//Filter Modal Functionality
const filterProjectTaskModal = document.querySelector("#admin-kanban-content #filter-modal");
const filterProjectTaskBtn = document.querySelector('#admin-kanban-content  .filter-task-btn');
const closeProjectFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn')

filterProjectTaskBtn.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'flex';
  })
  closeProjectFilterTaskModal.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'none';
  })