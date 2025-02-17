// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 13/02/2025
// Updated by Quinn Little 14/02/2025 


// Common functionality for all tabs

// =============================================================

// Switch between project and user tabs
// Clicking a tab brings you to the list of projects/users
function switchTab(tabName) {

  const params = new URLSearchParams(window.location.search);
  params.set("view", tabName);
  params.delete("project");
  params.delete("user");

  var currentTabId;
  var currentBtnId;

  if (tabName == "projects") {
    currentTabId = "tabGroupProjectStats";
    currentBtnId = "mgrProjStats";
  }
  else if (tabName == "users") {
    currentTabId = "tabGroupUserStats";
    currentBtnId = "mgrUserStats";
  }
  else {
    console.log(`Error: tab name ${tabName} does not exist`);
    return;
  }

  const tabs = document.querySelectorAll('.tabGroup');
  tabs.forEach(tab => { // Hide all tabs
    tab.style.display = "none";
  })
  
  const showingTab = document.getElementById(currentTabId);
  for (const subpage of showingTab.children) {
      subpage.style.display = "none"; // Hide all subpages
  }

  const mgrStatsPostTypeButtons = document.querySelectorAll('#mgrStats-tabBtn button');
  mgrStatsPostTypeButtons.forEach(btn => {
    btn.classList.remove('mgrStats-activeTab'); // Set all buttons inactive
  });

  // Show this tab viewing the list subpage
  showingTab.querySelector(".statsHome-grid").style.display = "flex";
  showingTab.style.display = "flex";

  const selectedBtn = document.getElementById(currentBtnId);
  selectedBtn.classList.add('mgrStats-activeTab'); // Set the correct button active
  const pageHomeTitle = document.querySelector('#stats-title');
  pageHomeTitle.innerHTML = `Statistics`;
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
};


// Switch from table to stats view
// Assumes that the correct tab is already open
function viewSelectedItem(itemType, id) {
    const params = new URLSearchParams(window.location.search);
    params.set(itemType, id);
    
    var homeGridId;
    var itemStatsViewId;
    var populationFun;

    if (itemType == "project") {
      params.delete("user");
      homeGridId = "statsHomeGridProject";
      itemStatsViewId = "projectViewStats";
      populationFun = () => PopulateProjectStatsPage();
    }
    else if (itemType == "user") {
      params.delete("project");
      homeGridId = "statsHomeGridUser";
      itemStatsViewId = "userViewStats";
      populationFun = () => PopulateUserStatsPage();
    }
    else {
      console.log(`Error: invalid item type ${itemType}`);
    }

    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    // CHANGE TO JUST REDIRECT TO APPROPRIATE PAGE INSTEAD OF DOING THIS MANUALLY
    populationFun();
    document.getElementById(homeGridId).style.display = "none";
    document.getElementById(itemStatsViewId).style.display = "block";
}





// Statistics Home Page

// =============================================================

//Get all projects query and generate project table - do this on DOM load as well since projects is the default tab

/* async function fetchProjectTable() {
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
           projectTable  += `<tr onclick=viewSelectedItem("project",` + item.Project_ID + `)>
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
} */


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
//            userTable  += `<tr onclick=viewSelectedItem("user",` + item.User_ID + `)>
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


// async function fetchUserSearch(searchParams) {
//     try {
//         // Make an HTTP request to the PHP file
//         const response = await fetch(`ManagerDash-Stats/statsHomePage-Queries/userStatsHomePageSearchQuery.php?searchParams=${searchParams}`);

//         // console.log("1: ", response);
        
//         // Ensure the response is OK and return the JSON data 
//         if (!response.ok) { 
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         // Convert the response to JSON format
//         const data = await response.json();
//         if (data.length > 0) {


//             // console.log("2: ", data[0].Forename);

//             // Build the new table to display
//             let userTable  = "<table id='userStatsHomeTbl' class='statsHome-table userStats-tr'>"
//             userTable  += `<thead>
//                                         <tr>
//                                             <th>User ID</th>
//                                             <th>Name</th>
//                                             <th>Job Position</th>
//                                         </tr>
//                                     </thead>`
//             userTable  += '<tbody>'
//             // Loop through the data and create a new element for each item
//             data.forEach(function(item) {
//             userTable  += `<tr onclick=viewSelectedUser(` + item.User_ID + `)>
//                                             <td>` + item.User_ID + `</td>
//                                             <td>` + item.Forename + ` ` + item.Surname + `</td>
//                                             <td>` + item.User_Type + `</td>
//                                         </tr>`
//             });     
//             userTable  += '</tbody>'
//             userTable  += '</table>';

//             // Find the container/table to display the data
//             var container = document.getElementById('statsHomeTableUser');
//             container.innerHTML = userTable;
//         } else {
//             var container = document.getElementById('statsHomeTableUser');
//             container.innerHTML = 'No matching users';
//         }

//     } catch (error) {
//         console.error('Error:', error); // Log any errors that occur
//     }
// }


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
            projectTable  += `<tr onclick=viewSelectedItem("project",` + item.Project_ID + `)>
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
                // console.log(data);
                // console.log("2: ", data[0].Task_ID);

                // Build the new table to display
                let userTable  = "<table class='statsHome-table'>"
                userTable  += `<thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Tasks Stuck</th>
                                        <th>Tasks Overdue</th>
                                        <th>Tasks Completed</th>
                                        <th>Tasks Remaining</th>
                                    </tr>
                                </thead>`
                                userTable  += '<tbody>'
                // Loop through the data and create a new element for each item
                data.forEach(function(item) {
                    userTable  += `<tr onclick=viewSelectedItem("user",` + item.User_ID + `)>
                            <td>` + item.User_ID + `</td>
                            <td>` + item.Forename + ` ` + item.Surname + `</td>`;
                      if(item.count_stuck > 0) { 
                        userTable  += `<td style="background-color:#ffcdd2;color:#c62828;">` + item.count_stuck + `</td>`;
                      } else {
                        userTable  +=  `<td>` + item.count_stuck + `</td>`;
                      }
                      if(item.count_overdue > 0) { 
                        userTable  += `<td style="background-color:#ffcdd2;color:#c62828;">` + item.count_overdue + `</td>`;
                      } else {
                        userTable  +=  `<td>` + item.count_overdue + `</td>`;
                      }
                      if(item.count_completed > 0) { 
                        userTable  += `<td style="background-color:#c8e6c9;color:#388e3c;">` + item.count_completed + `</td>`;
                      } else {
                        userTable  +=  `<td>` + item.count_completed + `</td>`;
                      }
                      if(item.count_remaining > 0) { 
                        userTable  += `<td style="background-color:#fff0c2;color:#947c01;">` + item.count_remaining + `</td>`;
                      } else {
                        userTable  +=  `<td>` + item.count_remaining + `</td>`;
                      }
            userTable += `</tr>`
                    });     
                    userTable  += '</tbody>'
                    userTable  += '</table>';

                    // Find the container/table to display the data
                    container.innerHTML = userTable;
            } else {
                container.innerHTML = 'Sorry, no users matching your filters.';
            }
  
    } catch (error) {
      console.log("Fetch Issue",error);
    }
  }

















// FILTERS id=#userStatsHome-filterAll



window.addEventListener("DOMContentLoaded", function () {

    // REDIRECT BASED ON URL PARAMS

    const params = new URLSearchParams(window.location.search);
    let view = params.get("view");
    if (view == "projects") {
      switchTab("projects");
      let proj = params.get("project");
      if (proj) {
        viewSelectedItem("project", proj);
      }
    }
    else if (view == "users") {
      switchTab("users");
      let user = params.get("user");
      if (user) {
        viewSelectedItem("user", user);
      }
    }
    else {
      params.set("view", "projects");
      params.delete("project");
      params.delete("user");
    }

    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);


    

    const filterUserStatsHomeModal = document.querySelector('#userStatsHome-filterAll #filter-modal')
    // document.querySelector('#userStatsHome-filterAll .projects-intro-buttons .order-by-dropdown select').value = 'None';
    filterUserStatsHomeModal.querySelector('.task-dropdown-priority #priority').value = 'All';
    filterUserStatsHomeModal.querySelector('.task-dropdown-date #date-task').value = 'All';
    filterUserStatsHomeModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";
      
  
    getUsersHomeData();
    
    //Filters
    const filterAppliedMsg = document.querySelector('#statsHomeGridUser .filter-applied-msg');
    const filterRemoveBtn = document.querySelector('#statsHomeGridUser .remove-filters-btn');

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
      filterAppliedMsg.innerHTML = createFiltersMsgStatsHome(filtersHome);
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
      console.log("clicked");
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





function createFiltersMsgStatsHome(filters) {
  console.log("CLLED RIGHT ONE")
    let applied = [];
    if (filters.priorityValueHome && filters.priorityValueHome !== "All") {
      applied.push(filters.priorityValueHome + " Priority");
    }
    if (filters.dateValueHome && filters.dateValueHome !== "All") {
      applied.push("Users with Overdue Tasks: " + filters.dateValueHome)
    }
    if (filters.stuckValueHome && filters.stuckValueHome !== "All") {
      if (filters.stuckValueHome === "Yes") {
        applied.push("Show users with Stuck Tasks");
      } else {
        applied.push("Show users with Non-Stuck Tasks");
      }
    }
    if (filters.orderByValueHome && filters.orderByValueHome !== "None") {
      applied.push("Order By " + filters.orderByValueHome)
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

