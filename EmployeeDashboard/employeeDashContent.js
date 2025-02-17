const userID = document.querySelector('#emp-dash-content').getAttribute('data-user-id');
document.addEventListener('DOMContentLoaded', () => {
    getEmpStats(userID);
    getEmpTaskTable(userID, {})
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



async function getEmpTaskTable(userID, filters={}) {
  
    try {
    let url = `EmployeeDashboard/queries/emp-dash-table.php?userID=${encodeURIComponent(userID)}`; 
    
    const filterQuery = new URLSearchParams(filters).toString();
    url += filterQuery ? `&${filterQuery}` : "";

    const params = { 
      method: "GET",
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const empDashTableData = await response.json();
    console.log('Data::P ', empDashTableData);

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

//Filter Modal Functionality
const filterProjectTaskModal = document.querySelector("#emp-dash-content #filter-modal");
const filterProjectTaskBtn = document.querySelector('#emp-dash-content  .filter-task-btn');
const closeProjectFilterTaskModal = filterProjectTaskModal.querySelector('#filter-modal .close-modal-btn')
const filterAppliedAdminMsg = document.querySelector(
  "#emp-dash-content .filter-applied-msg"
);
const filterRemoveAdminBtn = document.querySelector(
  "#emp-dash-content .remove-filters-btn"
);
filterProjectTaskBtn.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'flex';
  })
  closeProjectFilterTaskModal.addEventListener('click', () => {
    filterProjectTaskModal.style.display = 'none';
  })

  const confirmFilterAdminTask = filterProjectTaskModal.querySelector('#add-filter-btn')
  confirmFilterAdminTask.onclick = () => {
    const filterStuck = filterProjectTaskModal.querySelector('#stuck-task').value;
    const filterPriority = filterProjectTaskModal.querySelector('#priority').value;
    const filterDate = filterProjectTaskModal.querySelector('#date-task').value;
    
      const filterData = { filterPriority, filterDate, filterStuck };
      
      if (filterPriority === "All") {
        delete filterData.filterPriority;
      }
      if (filterDate === "All") {
        delete filterData.filterDate;
      }
      if (filterStuck === "All") {
        delete filterData.filterStuck;
      }
      const orderByValue = document.querySelector(
        "#emp-dash-content .projects-intro-buttons .order-by-dropdown select").value;

      if (orderByValue !== "None") {
        filterData.orderByValue = orderByValue;
      }

    
      filterAppliedAdminMsg.style.display = "block";
      filterAppliedAdminMsg.innerHTML = createFiltersMsgDashboard(filterData);
      


      let filtersLength = Object.keys(filterData).length;
      if (filtersLength > 0) {
        filterRemoveAdminBtn.style.display = "flex";
      } else {
        filterRemoveAdminBtn.style.display = "none";
      }

      filterProjectTaskModal.style.display = "none";
      
      getEmpTaskTable(userID, filterData);
  }

  function createFiltersMsgDashboard(filters) {
    console.log('Create filters running');
    let applied = [];
    if (filters.filterPriority && filters.filterPriority !== "All") {
      applied.push(filters.filterPriority + " Priority");
    }
    if (filters.filterDate && filters.filterDate !== "All") {
      applied.push("Due Date: " + filters.filterDate);
    }
    if (filters.filterStuck && filters.filterStuck !== "All") {
      if (filters.filterStuck === "Yes") {
        applied.push("Show Stuck Tasks");
      } else {
        applied.push("Show Non-Stuck Tasks");
      }
    }
    if (filters.orderByValue && filters.orderByValue !== "None") {
      applied.push("Order By " + filters.orderByValue);
    }
    if (applied.length === 0) {
      return '';
    } else {
      return 'Filters Applied: ' + applied.join(', ');
    }
  }

    //Order By Filters
  const orderByAdminBtn = document.querySelector('#emp-dash-content .projects-intro-buttons .order-by-confirm');
  orderByAdminBtn.addEventListener('click', () => {
    const orderByDropdownValue = document.querySelector('#emp-dash-content .projects-intro-buttons .order-by-dropdown select').value;
    const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};
    
    
    const currentAdminFilters = getCurrentFilters();
    const allAdminFilters = { ...currentAdminFilters, ...orderByParam };


    filterAppliedAdminMsg.style.display = 'block';
    filterAppliedAdminMsg.innerHTML = createFiltersMsg(allAdminFilters);

    let filtersLength = Object.keys(allAdminFilters).length;
    if (filtersLength > 0) {
      filterRemoveAdminBtn.style.display = 'flex';
    } else {
      filterRemoveAdminBtn.style.display = 'none';
    }

    getEmpTaskTable(userID, allAdminFilters);
  })

  filterRemoveAdminBtn.addEventListener("click", () => {
    filterAppliedAdminMsg.innerHTML = "";
    filterAppliedAdminMsg.style.display = "none";
    filterRemoveAdminBtn.style.display = "none";
    document.querySelector(
      "#emp-dash-content .projects-intro-buttons .order-by-dropdown select"
    ).value = "None";
    filterProjectTaskModal.querySelector(".task-dropdown-priority #priority").value =
      "All";
    filterProjectTaskModal.querySelector(
      ".task-dropdown-date #date-task"
    ).value = "All";
    filterProjectTaskModal.querySelector(
      ".task-dropdown-stuck #stuck-task"
    ).value = "All";

    getEmpTaskTable(userID, {});
  });

  function getCurrentFilters() {
    console.log('Current filter running');
    const filterProjectTaskModal = document.querySelector(
      "#emp-dash-content #filter-modal"
    );
    const filterStuck = filterProjectTaskModal.querySelector("#stuck-task").value;
    const filterPriority =
      filterProjectTaskModal.querySelector("#priority").value;
    const filterDate = filterProjectTaskModal.querySelector("#date-task").value;

    const filterData = { filterPriority, filterDate, filterStuck };

    if (filterPriority === "All") {
      delete filterData.filterPriority;
    }
    if (filterDate === "All") {
      delete filterData.filterDate;
    }
    if (filterStuck === "All") {
      delete filterData.filterStuck;
    }
    return filterData;
  }