// Made by Quinn Little 23/12/24
// Updated by Quinn Little 03/02/25 lines 6 to 48
// Updated by Quinn Little 07/02/2025 

/* Updated by Toby Tischler 08/02/2025: renamed mgrStatsUser to mgrStatsUser
   and wrapped long HTML insertion lines to improve readability */


//User Statistics Home Page

function redirectToPage(url) {
    window.location.href = url;
}

// =============================================================
const mgrStatsProj = document.getElementById('mgrProjStats');
const mgrStatsUser = document.getElementById('mgrUserStats');
mgrStatsProj.addEventListener("click", () => {
    if(mgrStatsProj.style.display == "block") {
        mgrStatsProj.classList.add('mgrStats-active')
        mgrStatsUser.classList.remove('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "none";
        document.getElementById("tabGroupUserStats").style.display = "block";

    } else {
        mgrStatsProj.classList.remove('mgrStats-active')
        mgrStatsUser.classList.add('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "none";
        document.getElementById("tabGroupProjectStats").style.display = "block";

    }
})

mgrStatsUser.addEventListener("click", () => {
    if(mgrStatsUser.style.display == "block") {
        mgrStatsProj.classList.remove('mgrStats-active')
        mgrStatsUser.classList.add('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "block";
        document.getElementById("tabGroupUserStats").style.display = "none";

    } else {
        mgrStatsProj.classList.add('mgrStats-active')
        mgrStatsUser.classList.remove('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "block";
        document.getElementById("tabGroupProjectStats").style.display = "none";

    }
})

//
const mgrStatsPostTypeButtons = document.querySelectorAll('.mgrStats-post-type-btns button');
mgrStatsPostTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
        mgrStatsPostTypeButtons.forEach(btn => btn.classList.remove('mgrStats-active'))
        button.classList.add('mgrStats-active')
    })
})
   

//Get all Projects query


async function fetchProjectTable() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/projectStatsPage-Queries/projectStatsHomePageQuery.php');
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
                                        <th>Project ID</th>
                                        <th>Project title</th>
                                        <th>Project Start Date</th>
                                        <th>Project Due Date</th>
                                        <th>Project Leader</th>
                                        <th>Project Leader Forename</th>
                                        <th>Project Leader Surname</th>
                                    </tr>
                                </thead>`
        container.innerHTML  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           container.innerHTML  += `<tr onclick=redirectToPage('ManagerDash-Stats/projectStatsPage.php?ID=` + item.Project_ID + `')>
                                        <td>` + item.Project_ID + `</td>
                                        <td>` + item.Project_Title + `</td>
                                        <td>` + item.Start_Date + `</td>
                                        <td>` + item.Due_Date + `</td>
                                        <td>` + item.Project_Leader + `</td>
                                        <td>` + item.Forename + `</td>
                                        <td>` + item.Surname+ `</td>
                                    </tr>`
        });     
        container.innerHTML  += '</tbody>'
        container.innerHTML  += '</table>';

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
    };

// Get all projects Event Listeners
document.getElementById('mgrProjStats').addEventListener('click', fetchProjectTable());
document.addEventListener('DOMContentLoaded', fetchProjectTable());



//Get all Users query
document.getElementById('mgrUserStats').addEventListener('click', async function() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsHomePageQuery.php');
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
                                        <th>Forename</th>
                                        <th>Surname</th>
                                        <th>Job Position</th>
                                    </tr>
                                </thead>`
        container.innerHTML  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           container.innerHTML  += `<tr onclick=redirectToPage('ManagerDash-Stats/userStatsPage.php?ID=` + item.User_ID + `&forename=` + item.Forename + `&surname=` + item.Surname + `')>
                                        <td>` + item.User_ID + `</td>
                                        <td>` + item.Forename + `</td>
                                        <td>` + item.Surname + `</td>
                                        <td>` + item.User_Type + `</td>
                                    </tr>`
        });     
        container.innerHTML  += '</tbody>'
        container.innerHTML  += '</table>';

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
});



