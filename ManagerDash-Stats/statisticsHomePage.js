// Made by Quinn Little 23/12/24
// Updated by Quinn Little 03/02/25 lines 6 to 48
// Updated by Quinn Little 07/02/2025 

// Updated by Toby Tischler 09/02/2025


// Statistics Home Page

// =============================================================


// Switch between project and user tabs
// When switching tabs return to the list page

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


// Switch from table to stats view
// Fires the "selected" event on the div made visible to simulate DOMContentLoaded for subpage

const selected = new Event("selected");

function viewSelectedProject(id) {
    const params = new URLSearchParams(window.location.search);
    params.set("project", id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    document.getElementById("statsHomeGridProject").style.display = "none";
    const container = document.getElementById("projectViewStats");
    container.style.display = "block";
    container.dispatchEvent(selected);
}

function viewSelectedUser(id) {
    const params = new URLSearchParams(window.location.search);
    params.set("user", id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    document.getElementById("statsHomeGridUser").style.display = "none";
    const container = document.getElementById("userViewStats");
    container.style.display = "block";
    container.dispatchEvent(selected);
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

        // Find the container/table to display the data
        var container = document.getElementById('projectStatsHomeTbl');
        container.innerHTML = ''; // Clear any existing content

        container.innerHTML  += "<table class='statsHome-table'>"
        container.innerHTML  += `<thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Leader</th>
                                    </tr>
                                </thead>`
        container.innerHTML  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           container.innerHTML  += `<tr onclick=viewSelectedProject(` + item.Project_ID + `)>
                                        <td>` + item.Project_Title + `</td>
                                        <td>` + item.Start_Date + `</td>
                                        <td>` + item.Due_Date + `</td>
                                        <td>` + item.Forename + ` ` + item.Surname + `</td>
                                    </tr>`
        });     
        container.innerHTML  += '</tbody>'
        container.innerHTML  += '</table>';

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
}


//Get all users query and generate user table

async function fetchUserTable() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/statsHomePage-Queries/userStatsHomePageQuery.php');
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log("2: ", data[0].Forename);

        // Find the container/table to display the data
        var container = document.getElementById('userStatsHomeTbl');
        container.innerHTML = ''; // Clear any existing content

        container.innerHTML  += "<table class='statsHome-table'>"
        container.innerHTML  += `<thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Job Position</th>
                                    </tr>
                                </thead>`
        container.innerHTML  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           container.innerHTML  += `<tr onclick=viewSelectedUser(` + item.User_ID + `)>
                                        <td>` + item.User_ID + `</td>
                                        <td>` + item.Forename + ` ` + item.Surname + `</td>
                                        <td>` + item.User_Type + `</td>
                                    </tr>`
        });     
        container.innerHTML  += '</tbody>'
        container.innerHTML  += '</table>';

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
};

// Projects table event handlers
// Populate project table on load as project is the default tab
document.getElementById('mgrProjStats').addEventListener('click', fetchProjectTable());
document.addEventListener('DOMContentLoaded', fetchProjectTable());
document.getElementById('mgrUserStats').addEventListener('click', fetchUserTable());