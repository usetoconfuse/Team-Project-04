
const userID = document.querySelector('#emp-dash-content').getAttribute('data-user-id');
document.addEventListener('DOMContentLoaded', () => {
    getEmpStats(userID);
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

