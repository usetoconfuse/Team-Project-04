const userID = document.querySelector('#emp-dash-content').getAttribute('data-user-id');
window.addEventListener('overviewLoaded', () => {
    getEmpStats(userID);
    getEmpTaskTable(userID, {});
})

async function getEmpStats(userID) {
  try {
    let url = `EmployeeDashboard/queries/emp-dash-stats.php?userID=${encodeURIComponent(userID)}`;

    const params = {
      method: "GET",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
    console.log("Fetch Issue", error);
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



async function getEmpTaskTable(userID, filters = {}) {

  try {
    let url = `EmployeeDashboard/queries/emp-dash-table.php?userID=${encodeURIComponent(userID)}`;

    const filterQuery = new URLSearchParams(filters).toString();
    url += filterQuery ? `&${filterQuery}` : "";

    const params = {
      method: "GET",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }

    const response = await fetch(url, params);

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }
    const empDashTableData = await response.json();
    console.log('Data::P ', empDashTableData);

    populateEmpTasksTable(empDashTableData);


  } catch (error) {
    console.log("Fetch Issue", error);
  }
}


function populateEmpTasksTable(tableData) {
  const tableBody = document.querySelector(".emp-projectKanban-bottom tbody");
  tableBody.innerHTML = "";
  tableData.forEach(task => {
    const row = document.createElement('tr');

    let taskStuck = (task.Stuck === '1' || task.Stuck === '2') ? "Yes" : "No";

    row.innerHTML = `   <td id="emp-task-id">${task.Task_ID}</td>
                            <td id="emp-task-title">${task.Name}</td>
                            <td><p class="emp-table-status emp-table-status-${task.Status.toLowerCase().replace(/\s+/g, '-')}">${task.Status}</p></td>
                            <td><p class="emp-table-priority emp-table-priority-${task.Priority.toLowerCase()}">${task.Priority}</p></td>
                            <td>${task.Due_Date}</td>
                            <td><p class="stuck-${taskStuck.toLowerCase()}">${taskStuck}</p></td>
                            <td id="emp-dash-project-value">${task.Project_ID}: ${task.Project_Title}</td>
                            <td>${task.Forename} ${task.Surname}</td>`

    tableBody.appendChild(row);

  })
}


//Keyword Search
const searchBar = document.querySelector('#emp-dash-content .task-search #searched-task');

searchBar.addEventListener('input', () => {
  const searchValue = searchBar.value.toLowerCase().trim();
  const allTasks = document.querySelectorAll('.emp-projectKanban-bottom tbody tr');
  let foundTasks = 0;

  allTasks.forEach(task => {
    const taskTitle = task.querySelector('#emp-task-title').innerHTML.toLowerCase();
    const projectValueSearch = task.querySelector('#emp-dash-project-value').innerHTML.toLowerCase();
    const taskIDSearch = task.querySelector('#emp-task-id').innerHTML.toLowerCase();


    if (taskTitle.includes(searchValue) || projectValueSearch.includes(searchValue) || taskIDSearch.includes(searchValue)) {
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
const filterEmpProjectTaskModal = document.querySelector("#emp-dash-content #filter-modal");
const filterEmpProjectTaskBtn = document.querySelector('#emp-dash-content  .filter-task-btn');
const closeEmpProjectFilterTaskModal = filterEmpProjectTaskModal.querySelector('#filter-modal .close-modal-btn')
const filterEmpAppliedAdminMsg = document.querySelector(
  "#emp-dash-content .filter-applied-msg"
);
const filterEmpRemoveAdminBtn = document.querySelector(
  "#emp-dash-content .remove-filters-btn"
);
filterEmpProjectTaskBtn.addEventListener('click', () => {
  filterEmpProjectTaskModal.style.display = 'flex';
})
closeEmpProjectFilterTaskModal.addEventListener('click', () => {
  filterEmpProjectTaskModal.style.display = 'none';
})

const confirmEmpFilterAdminTask = filterEmpProjectTaskModal.querySelector('#add-filter-btn')
confirmEmpFilterAdminTask.onclick = () => {
  const filterStuck = filterEmpProjectTaskModal.querySelector('#stuck-task').value;
  const filterPriority = filterEmpProjectTaskModal.querySelector('#priority').value;
  const filterDate = filterEmpProjectTaskModal.querySelector('#date-task').value;

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


  filterEmpAppliedAdminMsg.style.display = "block";
  filterEmpAppliedAdminMsg.innerHTML = createEmpFiltersMsgDashboard(filterData);



  let filtersLength = Object.keys(filterData).length;
  if (filtersLength > 0) {
    filterEmpRemoveAdminBtn.style.display = "flex";
  } else {
    filterEmpRemoveAdminBtn.style.display = "none";
  }

  filterEmpProjectTaskModal.style.display = "none";

  getEmpTaskTable(userID, filterData);
}

function createEmpFiltersMsgDashboard(filters) {
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
const orderEmpByAdminBtn = document.querySelector('#emp-dash-content .projects-intro-buttons .order-by-confirm');
orderEmpByAdminBtn.addEventListener('click', () => {
  const orderByDropdownValue = document.querySelector('#emp-dash-content .projects-intro-buttons .order-by-dropdown select').value;
  const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue } : {};


  const currentAdminFilters = getEmpCurrentFilters();
  const allAdminFilters = { ...currentAdminFilters, ...orderByParam };


  filterEmpAppliedAdminMsg.style.display = 'block';
  filterEmpAppliedAdminMsg.innerHTML = createFiltersMsg(allAdminFilters);

  let filtersLength = Object.keys(allAdminFilters).length;
  if (filtersLength > 0) {
    filterEmpRemoveAdminBtn.style.display = 'flex';
  } else {
    filterEmpRemoveAdminBtn.style.display = 'none';
  }

  getEmpTaskTable(userID, allAdminFilters);
})

filterEmpRemoveAdminBtn.addEventListener("click", () => {
  filterEmpAppliedAdminMsg.innerHTML = "";
  filterEmpAppliedAdminMsg.style.display = "none";
  filterEmpRemoveAdminBtn.style.display = "none";
  document.querySelector(
    "#emp-dash-content .projects-intro-buttons .order-by-dropdown select"
  ).value = "None";
  filterEmpProjectTaskModal.querySelector(".task-dropdown-priority #priority").value =
    "All";
  filterEmpProjectTaskModal.querySelector(
    ".task-dropdown-date #date-task"
  ).value = "All";
  filterEmpProjectTaskModal.querySelector(
    ".task-dropdown-stuck #stuck-task"
  ).value = "All";

  getEmpTaskTable(userID, {});
});

function getEmpCurrentFilters() {
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