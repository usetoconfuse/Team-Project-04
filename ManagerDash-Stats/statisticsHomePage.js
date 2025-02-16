// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 13/02/2025
// Updated by Quinn Little 14/02/2025 


// Common functionality for all tabs

// =============================================================

// Switch between project and user tabs
// Clicking project/user tab brings you to that item list

const mgrStatsPostTypeButtons = document.querySelectorAll('#mgrStats-tabBtn button');
mgrStatsPostTypeButtons.forEach(button => {
    button.addEventListener("click", () => {

        mgrStatsPostTypeButtons.forEach(btn => { // Hide all other tabs
            btn.classList.remove('mgrStats-activeTab')
            document.getElementById(btn.getAttribute("value")).style.display = "none";
        });

        button.classList.add('mgrStats-activeTab'); // Show this tab

        // Show the tab in list view
        const showingTab = document.getElementById(button.getAttribute("value"));
        for (const subpage of showingTab.children) {
            subpage.style.display = "none";
        }
        showingTab.querySelector(".statsHome-grid").style.display = "block";
        showingTab.style.display = "block";
    });
});


// Statistics Home Page

// =============================================================

// Switch from table to stats view

async function viewSelectedProject(id) {
    const params = new URLSearchParams(window.location.search);
    params.set("project", id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    await(PopulateProjectStatsPage());
    document.getElementById("statsHomeGridProject").style.display = "none";
    document.getElementById("projectViewStats").style.display = "block";
}

async function viewSelectedUser(id) {
    const params = new URLSearchParams(window.location.search);
    params.set("user", id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    await(PopulateUserStatsPage());
    document.getElementById("statsHomeGridUser").style.display = "none";
    document.getElementById("userViewStats").style.display = "block";
}


//Get all projects query and generate project table - do this on DOM load as well since projects is the default tab

async function fetchProjectTable() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/statsHomePage-Queries/projectStatsHomePageQuery.php');
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log("2: ", data[0].Forename);

        // Build the new table to display
        let projectTable  = "<table id='projectStatsHomeTbl' class='statsHome-table userStats-tr'>"
        projectTable  += `<thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Leader</th>
                                    </tr>
                                </thead>`
        projectTable  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           projectTable  += `<tr onclick=viewSelectedProject(` + item.Project_ID + `)>
                                        <td>` + item.Project_Title + `</td>
                                        <td>` + item.Start_Date + `</td>
                                        <td>` + item.Due_Date + `</td>
                                        <td>` + item.Forename + ` ` + item.Surname + `</td>
                                    </tr>`
        });     
        projectTable  += '</tbody>'
        projectTable  += '</table>';

        // Find the container/table to display the data
        const container = document.getElementById('statsHomeTableProj');
        container.innerHTML = projectTable;
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
}


//Get all users query and generate user table

// async function fetchUserTable() {
//     try {
//         // Make an HTTP request to the PHP file
//         const response = await fetch('ManagerDash-Stats/statsHomePage-Queries/userStatsHomePageQuery.php');
//         console.log("1: ", response);
        
//         // Ensure the response is OK and return the JSON data 
//         if (!response.ok) { 
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         // Convert the response to JSON format
//         const data = await response.json();
//         console.log("2: ", data[0].Forename);

//         // Build the new table to display
//         let userTable  = "<table id='userStatsHomeTbl' class='statsHome-table'>"
//         userTable  += `<thead>
//                                     <tr>
//                                         <th>User ID</th>
//                                         <th>Name</th>
//                                         <th>Job Position</th>
//                                     </tr>
//                                 </thead>`
//         userTable  += '<tbody>'
//         // Loop through the data and create a new element for each item
//         data.forEach(function(item) {
//            userTable  += `<tr onclick=viewSelectedUser(` + item.User_ID + `)>
//                                         <td>` + item.User_ID + `</td>
//                                         <td>` + item.Forename + ` ` + item.Surname + `</td>
//                                         <td>` + item.User_Type + `</td>
//                                     </tr>`
//         });     
//         userTable  += '</tbody>'
//         userTable  += '</table>';

//         // Find the container/table to display the data
//         var container = document.getElementById('statsHomeTableUser');
//         container.innerHTML = userTable;

//     } catch (error) {
//         console.error('Error:', error); // Log any errors that occur
//     }
// };


async function fetchUserSearch(searchParams) {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch(`ManagerDash-Stats/statsHomePage-Queries/userStatsHomePageSearchQuery.php?searchParams=${searchParams}`);

        // console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        if (data.length > 0) {


            // console.log("2: ", data[0].Forename);

            // Build the new table to display
            let userTable  = "<table id='userStatsHomeTbl' class='statsHome-table userStats-tr'>"
            userTable  += `<thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Job Position</th>
                                        </tr>
                                    </thead>`
            userTable  += '<tbody>'
            // Loop through the data and create a new element for each item
            data.forEach(function(item) {
            userTable  += `<tr onclick=viewSelectedUser(` + item.User_ID + `)>
                                            <td>` + item.User_ID + `</td>
                                            <td>` + item.Forename + ` ` + item.Surname + `</td>
                                            <td>` + item.User_Type + `</td>
                                        </tr>`
            });     
            userTable  += '</tbody>'
            userTable  += '</table>';

            // Find the container/table to display the data
            var container = document.getElementById('statsHomeTableUser');
            container.innerHTML = userTable;
        } else {
            var container = document.getElementById('statsHomeTableUser');
            container.innerHTML = 'No matching users';
        }

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
}


async function fetchProjSearch(searchParams) {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch(`ManagerDash-Stats/statsHomePage-Queries/projectStatsHomePageSearchQuery.php?searchParams=${searchParams}`);

        // console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        if (data.length > 0) {

            // Build the new table to display
            let projectTable  = "<table id='projectStatsHomeTbl' class='statsHome-table userStats-tr'>"
            projectTable  += `<thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Start Date</th>
                                            <th>Due Date</th>
                                            <th>Leader</th>
                                        </tr>
                                    </thead>`
            projectTable  += '<tbody>'
            // Loop through the data and create a new element for each item
            data.forEach(function(item) {
            projectTable  += `<tr onclick=viewSelectedProject(` + item.Project_ID + `)>
                                            <td>` + item.Project_Title + `</td>
                                            <td>` + item.Start_Date + `</td>
                                            <td>` + item.Due_Date + `</td>
                                            <td>` + item.Forename + ` ` + item.Surname + `</td>
                                        </tr>`
            });     
            projectTable  += '</tbody>'
            projectTable  += '</table>';

            // Find the container/table to display the data
            const container = document.getElementById('statsHomeTableProj');
            container.innerHTML = projectTable;
        } else {
            var container = document.getElementById('statsHomeTableProj');
            container.innerHTML = 'No matching Projects';
        }

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
}

// Projects table event handlers
// Populate project table on load as project is the default tab
document.getElementById('mgrProjStats').addEventListener('click', fetchProjSearch(""));
// document.addEventListener('DOMContentLoaded', fetchUserSearch(""));
// document.getElementById('mgrUserStats').addEventListener('click', fetchUserSearch(""));



// Update selected posts when the search bar is used USER
// document.getElementById('searched-user').addEventListener("input", async (e) =>{
//     selectedQuery = e.target.value.trim();
//     fetchUserSearch(selectedQuery);
// });

// Update selected posts when the search bar is used PROJECT
document.getElementById('searched-proj').addEventListener("input", async (e) =>{
    selectedQuery = e.target.value.trim();
    fetchProjSearch(selectedQuery);
});

/* Redirect to correct sub-page if loading with URL params
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("project")) {
        viewSelectedProject(params.get("project"));
    }

    else if (params.has("user")) {
        viewSelectedUser(params.get("user"));
    }
}); */






// =======================FILTER FUNC ============================


async function getUsersHomeData(filters={}) {
    try {
  
      let url = `ManagerDash-Stats/statsHomePage-Queries/userStatsHomePageSearchQuery.php?`; 
  
      const filterQuery = new URLSearchParams(filters).toString();
      url += filterQuery ? `&${filterQuery}` : '';
  
      const params = { 
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
      console.log("filter OBJ",filterQuery);
  
      const response = await fetch(url, params);
  
      if (!response.ok) {
        throw new Error('Failed to fetch projects data');
      }
      const data = await response.json();

            var container = document.getElementById('statsHomeTableUser');
            container.innerHTML = ''; // No results, show user.
            

            if (data.length > 0) {
                console.log(data);
                // console.log("2: ", data[0].Task_ID);

                // Build the new table to display
                let userTable  = "<table class='statsHome-table'>"
                userTable  += `<thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Num of Stuck</th>
                                        <th>Num of Overdue</th>
                                        <th>Num of Completed</th>
                                        <th>Num of remaining (In Progress, To Do and Overdue)</th>
                                    </tr>
                                </thead>`
                                userTable  += '<tbody>'
                // Loop through the data and create a new element for each item
                data.forEach(function(item) {
                //     if (item.Stuck === "1") { // Make the "stuck" field readable for user.
                //         var stuck = "Yes";
                //         var stuckStyles = "color:red;font-weight:bold"; // RED background for when stuck
                //     } else {
                //         var stuck = "No";
                //         var stuckStyles = "color:black";
                //     }
                    
            userTable  += `<tr onclick=viewSelectedUser(` + item.User_ID + `)>
                            <td>` + item.User_ID + `</td>
                            <td>` + item.Forename + ` ` + item.Surname + `</td>
                            <td>` + item.count_stuck + `</td>
                            <td>` + item.count_overdue + `</td>
                            <td>` + item.count_completed + `</td>
                            <td>` + item.count_remaining + `</td>
                            </tr>`
                    });     
                    userTable  += '</tbody>'
                    userTable  += '</table>';

                    // Find the container/table to display the data
                    container.innerHTML = userTable;
            } else {
                if(stuck != '' || earliest != '' || high != '') {
                    container.innerHTML = '<h2>Sorry, no results for your selected filters</h2>'; // No results, show user.
                } else {
                    container.innerHTML = '<h2>Selected User isn\'t assigned to any projects or hasn\'t been assigned any tasks.</h2>'; // No results, show user.
                }
            }
  
    } catch (error) {
      console.log("Fetch Issue",error);
    }
  }

















// FILTERS id=#userStatsHome-filterAll



window.addEventListener("DOMContentLoaded", function () {

    const filterUserStatsHomeModal = document.querySelector('#userStatsHome-filterAll #filter-modal')
    // document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-dropdown select').value = 'None';
    filterUserStatsHomeModal.querySelector('.task-dropdown-priority #priority').value = 'All';
    filterUserStatsHomeModal.querySelector('.task-dropdown-date #date-task').value = 'All';
    filterUserStatsHomeModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";
      
  
    getUsersHomeData();
    
    //Filters
    const filterAppliedMsg = document.querySelector('#userStatsHome-filterAll .filter-applied-msg');
    const filterRemoveBtn = document.querySelector('#userStatsHome-filterAll .remove-filters-btn');

    const applyFilterBtn = filterUserStatsHomeModal.querySelector('#add-filter-btn');
    // console.log(applyFilterBtn);
    applyFilterBtn.addEventListener('click', () => {
      const priorityValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-priority #priority').value;
      const dateValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-date #date-task').value;
      const stuckValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-stuck #stuck-task').value;
      
      const filtersHome = {priorityValueHome, dateValueHome, stuckValueHome};

      if (priorityValueHome === "All") {
        delete filtersHome.priorityValueHome;
      }
      if (dateValueHome === "All") {
        delete filtersHome.dateValueHome;
      }
      if (stuckValueHome === "All") {
        delete filtersHome.stuckValueHome;
      }
      const orderByValueHome = document.querySelector('.projects-intro-buttons .order-by-dropdown select').value;
      if (orderByValueHome !== "None") {
        filtersHome.orderByValueHome = orderByValueHome;
      } 

      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(filtersHome);
      console.log(createFiltersMsg(filtersHome))
      console.log(filtersHome)

      let filtersLengthHome = Object.keys(filtersHome).length;
      if (filtersLengthHome > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      filterHomeModal.style.display = 'none';
      searchBarUserStats.value = "";

      getUsersHomeData(filtersHome);
    })



    function getcurrentFiltersHome() {
        const filterUserStatsHomeModal = document.querySelector('#userStatsHome-filterAll #filter-modal');
        const priorityValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-priority #priority').value;
        const dateValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-date #date-task').value;
        const stuckValueHome = filterUserStatsHomeModal.querySelector('.task-dropdown-stuck #stuck-task').value;
        
        const filtersHome = {priorityValueHome, dateValueHome, stuckValueHome};
      
        if (priorityValueHome === "All") {
          delete filtersHome.priorityValueHome;
        }
        if (dateValueHome === "All") {
          delete filtersHome.dateValueHome;
        }
        if (stuckValueHome === "All") {
          delete filtersHome.stuckValueHome;
        }
      
        return filtersHome;
      }

      
    //Order By Filters
    const orderByBtnHome = document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-confirm');
    orderByBtnHome.addEventListener('click', () => {
      const orderByDropDownValueHome = document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParamHome = orderByDropDownValueHome !== "None" ? { orderByValueHome: orderByDropDownValueHome} : {};
      console.log("brah", orderByParamHome);


      const currentFiltersHome = getcurrentFiltersHome();
      const allFiltersHome = { ...currentFiltersHome, ...orderByParamHome};


      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsg(allFiltersHome);

      let filtersLength = Object.keys(allFiltersHome).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      searchBarUserStats.value = "";

      getUsersHomeData(allFiltersHome);
    })

    filterRemoveBtn.addEventListener('click', () => {
      filterAppliedMsg.innerHTML = "";
      filterAppliedMsg.style.display = 'none';
      filterRemoveBtn.style.display = 'none';
      searchBarUserStats.value = "";
      document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-dropdown select').value = "None";
      filterUserStatsHomeModal.querySelector('.task-dropdown-priority #priority').value = "All";
      filterUserStatsHomeModal.querySelector('.task-dropdown-date #date-task').value = "All";
      filterUserStatsHomeModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";

      getUsersHomeData({})
    })


  }
);





function createFiltersMsg(filters) {
    let applied = [];
    if (filters.priorityValueHome && filters.priorityValueHome !== "All") {
      applied.push(filters.priorityValueHome + " Priority");
    }
    if (filters.dateValueHome && filters.dateValueHome !== "All") {
      applied.push("Due Date: " + filters.dateValueHome)
    }
    if (filters.stuckValueHome && filters.stuckValueHome !== "All") {
      if (filters.stuckValueHome === "Yes") {
        applied.push("Show Stuck Tasks");
      } else {
        applied.push("Show Non-Stuck Tasks");
      }
    }
    if (filters.orderByValue && filters.orderByValue !== "None") {
      applied.push("Order By " + filters.orderByValue)
    }
    if (applied.length === 0) {
      return '';
    } else {
      return 'Filters Applied: ' + applied.join(', ');
    }
  }








// filter button
const filterHomeModal = document.querySelector("#userStatsHome-filterAll #filter-modal");
const filterHomeBtn = document.querySelector('#userStatsHome-filterAll  .filter-task-btn');
const closefilterHomeModal = filterHomeModal.querySelector('#filter-modal .close-modal-btn');


filterHomeBtn.addEventListener('click', () => {
    filterHomeModal.style.display = 'flex';
    })
    closefilterHomeModal.addEventListener('click', () => {
      filterHomeModal.style.display = 'none';
    })















    //Keyword Search
const searchBarUserStats = document.querySelector('#searched-user');

searchBarUserStats.addEventListener('input', ()=>{
  const searchValue = searchBarUserStats.value.toLowerCase();

//   const orderByDropDownValueHome = document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-dropdown select').value;
  const searchValueHome = searchValue !== "None" ? { searchParam: searchValue} : {};
  console.log("brah", searchValueHome);


//   const currentFiltersHome = getcurrentFiltersHome();
  const allFiltersHome = {...searchValueHome};



  let filtersLength = Object.keys(allFiltersHome).length;
  if (filtersLength > 0) {
    filterRemoveBtn.style.display = 'flex';
  } else {
    filterRemoveBtn.style.display = 'none';
  }

  getUsersHomeData(allFiltersHome);

//   const allTasks = document.querySelectorAll('.kanban-content-project .kanban-card');
//   console.log(allTasks);
//   let foundTasks = 0;

//   allTasks.forEach(task => {
//     const taskTitle = task.getAttribute('data-task-title').toLowerCase();


//     if (taskTitle.includes(searchValue)) {
//       foundTasks++;
//       task.style.display = 'block';
//     } else {
//       task.style.display = 'none';
//     }
//   })

//   const cardCounts = {
//     "To Do": countBlockTasks("#proj-kanban-content #kanban-to-do"),
//     "In Progress": countBlockTasks("#proj-kanban-content #kanban-in-progress"),
//     "Completed": countBlockTasks("#proj-kanban-content #kanban-completed")
//   };
//   changeProjectsCount(cardCounts);


//   if (foundTasks === 0) {
//     document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'block';
//   } else {
//     document.querySelector('#proj-kanban-content .search-task-error-msg').style.display = 'none';
//   }
})

