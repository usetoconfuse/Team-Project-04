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

  // Ensure the title of the page is reset
  const pageHomeTitle = document.querySelector('#stats-title');
  pageHomeTitle.innerHTML = `Statistics`;

  //Ensure the backbutton isn't visible
  document.querySelector('#backButton').style.display = 'none';

  //Ensure the backbutton isn't visible
  document.querySelector('#backButtonProj').style.display = 'none';
  

  console.log(params + " from switch")
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
};


// View stats for a specific project/user
function viewSelectedItem(itemType, id) {
    
    var homeGridId;
    var itemStatsViewId;
    var populationFun;

    if (itemType == "project") {
      switchTab("projects");
      homeGridId = "statsHomeGridProject";
      itemStatsViewId = "projectViewStats";
      populationFun = () => PopulateProjectStatsPage();
    }
    else if (itemType == "user") {
      switchTab("users");
      homeGridId = "statsHomeGridUser";
      itemStatsViewId = "userViewStats";
      populationFun = () => PopulateUserStatsPage();
    }
    else {
      console.log(`Error: invalid item type ${itemType}`);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set(itemType, id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    populationFun();
    document.getElementById(homeGridId).style.display = "none";
    document.getElementById(itemStatsViewId).style.display = "block";
}





// Statistics Home Page



// ======================= FILTER TABLES ============================

// Projects table event handlers
// Populate project table on load as project is the default tab
document.getElementById('mgrProjStats').addEventListener('click', fetchProjSearch(""));

// Update selected posts when the search bar is used PROJECT
document.getElementById('searched-proj').addEventListener("input", async (e) =>{
    selectedQuery = e.target.value.trim();
    fetchProjSearch(selectedQuery);
});

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
                                          <th>Leader</th>
                                          <th>Members</th>
                                          <th>Tasks</th>
                                          <th>Due Date</th>
                                          <th>Completed</th>
                                          <th>Overdue</th>
                                      </tr>
                                  </thead>`
          projectTable  += '<tbody>'
          // Loop through the data and create a new element for each item
          data.forEach(function(item) {
            
            // Colour complete and overdue text
            let completionTextCol = item.Completed == 'Yes' ? "stats-GreenText" : "stats-YellowText";
            let overdueTextCol = item.Overdue == 'Yes' ? "stats-RedText" : "stats-GreenText";

            projectTable  += `<tr onclick=viewSelectedItem("project",` + item.Project_ID + `)>
                                            <td>` + item.Project_Title + `</td>
                                            <td>` + item.Forename + ` ` + item.Surname + `</td>
                                            <td>` + item.Members + `</td>
                                            <td>` + item.Tasks + `</td>
                                            <td>` + item.Due_Date + `</td>
                                            <td><p class=${completionTextCol}>` + item.Completed + `</p></td>
                                            <td><p class=${overdueTextCol}>` + item.Overdue + `</p></td>
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
        throw new Error('Failed to fetch users data');
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








window.addEventListener("statsLoaded", () => {

    // Set font for charts
    Chart.defaults.font.family = 'Avenir Next';
    Chart.defaults.font.size = 16;
    Chart.defaults.color = '#000000';


    //Get back button from UserStatsPage
    // Back Button functionality when clicked in userStatsPage.php
    const backButtonProj = document.getElementById('backButtonProj');
    backButtonProj.addEventListener("click", () => {
      switchTab("projects");
    })

    //Get back button from UserStatsPage
    // Back Button functionality when clicked in userStatsPage.php
    const backButtonUser = document.getElementById('backButton');
    backButtonUser.addEventListener("click", () => {
      switchTab("users");
    })

  // Redirect based on URL params

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
    switchTab("projects");
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




// Adds filter message to screen
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


})

