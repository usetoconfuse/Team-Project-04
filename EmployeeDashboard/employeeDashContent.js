const userID = document.querySelector('#emp-dash-content').getAttribute('data-user-id');
document.addEventListener('DOMContentLoaded', () => {
    getEmpStats(userID);
    getEmpTaskTable(userID)
})

async function getEmpStats(userID) {
    try {
    let url = `EmployeeDashboard/queries/emp-dash-stats.php?userID=${encodeURIComponent(userID)}`; 

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const empDashStatsData = await response.json();
    console.log(empDashStatsData);
    populateEmpStats(empDashStatsData);
    populateEmpPersonalTasks(empDashStatsData);


    } catch (error) {
        console.log("Fetch Issue",error);
    }
}


function populateEmpStats(empDashData) {
    const statsData = empDashData.stats[0];

    document.querySelector('#emp-stat-to-do .emp-stat-nums').innerHTML = statsData.to_do_count + " Tasks";
    document.querySelector('#emp-stat-in-progress .emp-stat-nums').innerHTML = statsData.in_progress_count + " Tasks";
    document.querySelector('#emp-stat-completed .emp-stat-nums').innerHTML = statsData.completed_count + " Tasks";
    document.querySelector('#emp-stat-overdue .emp-stat-nums').innerHTML = statsData.overdue_count + " Tasks";
}

function populateEmpPersonalTasks(empDashData) {
    const personalTasksData = empDashData.personalTasks;
    const personalKanbanContainer = document.querySelector('#emp-personalkanban-container .emp-kanban-bottom');
    personalKanbanContainer.innerHTML = "";

    if (personalTasksData.length === 0) {
        personalKanbanContainer.innerHTML = "No Personal Tasks to Show";
    }

    personalTasksData.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('emp-task');

        taskCard.innerHTML = ` <div class="emp-task-top">
                                    <p>${task.Name}</p>
                                    <div class="emp-task-priority emp-${task.Priority.toLowerCase()}-priority">${task.Priority}</div>
                                </div>
                                <div class="emp-task-line"></div>`;
        
        personalKanbanContainer.appendChild(taskCard);

    })
}



async function getEmpTaskTable(userID) {
    try {
    let url = `EmployeeDashboard/queries/emp-dash-table.php?userID=${encodeURIComponent(userID)}`; 

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const empDashTableData = await response.json();
    populateTasksTable(empDashTableData);


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
                            <td>${task.Project_ID}: ${task.Project_Title}</td>
                            <td>${task.Forename} ${task.Surname}</td>`
        
        tableBody.appendChild(row);

    })
}


//Keyword Search
const searchBar = document.querySelector('#emp-dash-content .task-search #searched-task');

searchBar.addEventListener('input', ()=>{
  const searchValue = searchBar.value.toLowerCase();
  const allTasks = document.querySelectorAll('.emp-projectKanban-bottom tbody tr');
  let foundTasks = 0;

  allTasks.forEach(task => {
    const taskTitle = task.querySelector('#emp-task-title').innerHTML.toLowerCase();


    if (taskTitle.includes(searchValue)) {
      foundTasks++;
      task.style.display = 'table-row';
    } else {
      task.style.display = 'none';
    }
  })
  if (foundTasks === 0) {
    document.querySelector('#emp-dash-content .search-task-error-msg').style.display = 'block';
  } else {
    document.querySelector('#emp-dash-content .search-task-error-msg').style.display = 'none';
  }
})

//Filters

const filterButton = document.querySelector('#emp-dash-content .emp-projectKanban-container .filter-task-btn');
const filterEmpModal = document.querySelector('#emp-dash-content #filter-modal');

//Opening and Closing Filter Modal
filterButton.addEventListener('click', () => {
  filterEmpModal.style.display = 'block';
})

filterEmpModal.querySelector('.close-modal-btn').addEventListener('click', () => {
  filterEmpModal.style.display = 'none';
})

//Submit Filter Functionality
filterEmpModal.querySelector('.add-filter-btn').addEventListener('click', () => {
  const filterPriority = filterEmpModal.querySelector('#priority').value;
  const filterDate = filterEmpModal.querySelector('#date-task').value;
  const filterStuck = filterEmpModal.querySelector('#stuck-task').value;

  console.log(filterPriority, filterDate, filterStuck);

})
