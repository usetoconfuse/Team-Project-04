// Created by Quinn Little 23/12/24
// Updated by Toby Tischler 13/02/2025
// Updated by Quinn Little 10/02/2025 


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

// Projects table event handlers
// Populate project table on load as project is the default tab
document.getElementById('mgrProjStats').addEventListener('click', fetchProjectTable());
document.addEventListener('DOMContentLoaded', fetchProjectTable());
document.getElementById('mgrUserStats').addEventListener('click', fetchUserSearch(""));



// Update selected posts when the search bar is used
document.getElementById('searched-user').addEventListener("input", async (e) =>{
    selectedQuery = e.target.value.trim();
    fetchUserSearch(selectedQuery);
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