// Made by Quinn Little 23/12/24
// Updated by Quinn Little 03/02/25 lines 6 to 48
// Updated by Quinn Little 07/02/2025 

// Updated by Toby Tischler 08/02/2025


// Statistics Home Page

// =============================================================

// Switch project/user tab

const mgrStatsPostTypeButtons = document.querySelectorAll('.mgrStats-post-type-btns button');
mgrStatsPostTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
        mgrStatsPostTypeButtons.forEach(btn => {
            btn.classList.remove('mgrStats-activeTab')
            document.getElementById(btn.getAttribute("value")).style.display = "none";
        });
 
        button.classList.add('mgrStats-activeTab')
        document.getElementById(button.getAttribute("value")).style.display = "block";
    });
});


// Switch from table to stats view
// Fires the "selected" event on the div made visible to simulate DOMContentLoaded for subpage

const selected = new Event("selected");

function viewSelectedProject(id) {
    const params = new URLSearchParams(window.location.search);
    params.set("project", id);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    document.getElementById("projectStatsHomeTbl").style.display = "none";
    const container = document.getElementById("projectViewStats");
    container.style.display = "block";
    container.dispatchEvent(selected);
}

function viewSelectedUser(id, forename, surname) {
    const params = new URLSearchParams(window.location.search);
    params.set("user", id);
    params.set("forename", forename);
    params.set("surname", surname);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    document.getElementById("userStatsHomeTbl").style.display = "none";
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
};

// Projects table event handlers
// Populate on load as project is the default tab
document.getElementById('mgrProjStats').addEventListener('click', fetchProjectTable());
document.addEventListener('DOMContentLoaded', fetchProjectTable());

//Get all users query and generate user table

document.getElementById('mgrUserStats').addEventListener('click', async () => {
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
           container.innerHTML  += `<tr onclick=viewSelectedUser(` + item.User_ID + `,'` + item.Forename + `','` + item.Surname + `')>
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
});