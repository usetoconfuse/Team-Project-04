// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 12/02/2025

// Path of project queries folder
const PRJST_QUERY_PATH = "ManagerDash-Stats/projectStatsPage-Queries/";


// Object that stores the project details used by the page
// Attributes: id, title start, due, created, completed, leader
const projDetails = {};


// CHART INSTANCE LOCATIONS

// Task dial chart
const dialCtx = document.getElementById("prjStTaskDialChart").getContext("2d");
var taskDial = new Chart(dialCtx)

// Task burnup chart
const burnupCtx = document.getElementById("prjStBurnupChart").getContext("2d");
var projBurnup = new Chart(burnupCtx);


// Generic query function
async function FetchStatsData(query) {
    try {
        //Fetch full project details from ID
        const response = await(fetch(PRJST_QUERY_PATH + query));
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        return null;
    }
};




//==============================================================



// Populate page when a project is selected
async function PopulateProjectStatsPage() {

    // Fetch full project details from ID
    await(FetchProjectData());

    PopulateProjectStatsHeader();

    PopulateMemberList();

    PopulateTaskDialChart();

    PopulateBurnUpChart();
}



//Fetch user details for project object
async function FetchProjectData() {

    //Get project ID from URL
    const params = new URLSearchParams(window.location.search);
    const projID = params.get('project');

    //Fetch full project details from ID
    const data = await(FetchStatsData(
        `projectStatsDetailsQuery.php?ID=${projID}`));

    // Populate projDetails object
    projDetails.id = projID;
    projDetails.title = data[0].Project_Title;
    projDetails.start = data[0].Start_Date;
    projDetails.due = data[0].Due_Date;
    projDetails.created = data[0].Creation_Date;
    projDetails.completed = data[0].Completion_Date;
    projDetails.leader = data[0].Project_Leader;
    console.log(projDetails);
};



// Project header
function PopulateProjectStatsHeader() {
    const header = `
        <p id="prjStTitle">`+projDetails.title+`</p>
        <p id="prjStStartDate">Started: `+projDetails.start+`</p>
        <p id="prjStDueDate">Due: `+projDetails.due+`</p>
        <p id="prjStCreationDate">Created: `+projDetails.created+`</p>
        <p id="prjStCompletionDate">Completed: `+projDetails.completed+`</p>
        <p id="prjStLeader">Leader: `+projDetails.leader+`</p>
    `;

    document.getElementById("prjStHeaderNums").innerHTML = header;
}



//====================== MEMBER LIST ========================
async function PopulateMemberList() {

    // LIST DATA

    const data = await(FetchStatsData(
        `projectStatsMembersQuery.php?ID=${projDetails.id}`));

    // Build the new table to display
    let membersTable  = "<table class='statsHome-table'>"
    membersTable  += `<thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Tasks</th>
                                <th>Stuck</th>
                            </tr>
                        </thead>`
    membersTable  += '<tbody>'

    // Loop through the data and create a new element for each item provided there are project members
    if(data[0][0]) {
        data.forEach(item => {
            let crown = `<i class="fa-solid fa-circle fa-stack-2x"></i>
                        <i class="fa-solid fa-crown fa-stack-1x fa-inverse"></i>`;
            if ((item[0].User_ID) == projDetails.leader) {
                crown = ""
            }
    
            membersTable  += `<tr>
                                <td><span class="fa-stack">${crown}</span> ${item[0].Forename} ${item[0].Surname}</td>
                                <td>${item[0].Email}</td>
                                <td>${item[0].Tasks}</td>
                                <td>${item[0].Stuck}</td>
                            </tr>`
        });     
        membersTable  += '</tbody>'
        membersTable  += '</table>';
    
        // Find the container/table to display the data
        var container = document.getElementById('prjStMembersList');
        container.innerHTML = membersTable;
    }
    else {
        var container = document.getElementById('prjStMembersList');
        container.innerHTML = "<p>This project has no members</p>";
    }
}


//====================== TASK DIAL ========================

async function PopulateTaskDialChart() {

    // CHART DATA

    const data = await(FetchStatsData(
        `projectStatsDialQuery.php?ID=${projDetails.id}`));

    const dialData = [data[0][0]["Done"], data[0][0]["Inprog"], data[0][0]["Todo"]];

    // DRAW CHART

    // Calculate progress completion percentage
    let totalTasks = dialData[0] + dialData[1] + dialData[2];
    let percentage = Math.round((dialData[0]*100) / totalTasks);
    document.getElementById("prjStTaskDialPercentageText").innerText = percentage + "%";

    if(dialData.length > 0) { // Improve readbility for when there are no tasks for a user. (Error handling)
        let prjStatsPercentText = document.getElementById('prjStatsPercentText');
        prjStatsPercentText.innerHTML = "";
        document.getElementById("prjStTaskDialPercentageText").innerText = "No projects have been set for userID: " + userDetails.id;
    }

    // Populate chart legend text
    document.getElementById("prjStLegendDone").innerText = dialData[0];
    document.getElementById("prjStLegendInprog").innerText = dialData[1];
    document.getElementById("prjStLegendTodo").innerText = dialData[2];

    taskDial.destroy();

    taskDial = new Chart(dialCtx, {
        type: 'doughnut',

        data: {
            labels: ['Done',
                'In Progress',
                'To Do'],
            datasets: [{
                data: dialData,
                backgroundColor: [
                    '#adda9d',
                    '#eab385',
                    '#8e8e91'
                ]
            }],
        },
        
        options: {
            rotation: -90,
            circumference: 180, 
            cutout: '80%',
            responsive: true,
            aspectRatio: 2,
    
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}



//====================== BURNUP CHART ========================
async function PopulateBurnUpChart() {

    // CHART DATA

    const data = await(FetchStatsData(
        `projectStatsBurnupQuery.php?ID=${projDetails.id}&START=${projDetails.start}&END=${projDetails.completed}`));
    

    // Translate data to chart
    // Also count weeks from start for label and flag week of due date
    var weekCounter = 1;
    var dueDateWeek = null;
    const burnUpLabels = new Array();
    const burnUpDates = new Array();
    const burnUpCompleted = new Array();
    const burnUpScope = new Array();

    data.forEach(item => {
        burnUpLabels.push(weekCounter);
        burnUpDates.push(item[0].week);
        burnUpCompleted.push(item[0].comp);
        burnUpScope.push(item[0].scope);

        if (new Date(projDetails.due) < new Date(item[0].week)
            && !dueDateWeek) {
            dueDateWeek = weekCounter;
        }

        weekCounter++;
    });

    // Show deadline for overdue projects
    const isOverdue = new Date(projDetails.due) < new Date(projDetails.completed)
                    || !projDetails.completed ?
                    true : false;


    // DRAW CHART

    projBurnup.destroy();

    projBurnup = new Chart(burnupCtx, {
        type: "line",
        data: {
            labels: burnUpLabels,
            datasets: [
                {
                    label: "Completed",
                    data: burnUpCompleted,
                    borderColor: "#6d8ce5",
                    backgroundColor: "#6d8ce5",
                    fill: false
                },
                {
                    label: "Scope",
                    data: burnUpScope,
                    borderColor: "#c1524f",
                    backgroundColor: "#c1524f",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Week"
                    },
                    grid: {
                        display: false
                    }
                },

                y: {
                    suggestedMin: 0,
                    // Set max of y scale to 20% above max person-hours, rounded to the nearest 10
                    max: Math.ceil(burnUpScope[burnUpCompleted.length-1] * 0.12) * 10,
                    
                    title: {
                        display: true,
                        text: "Person-Hours"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            },

            elements: {
                point: {
                    radius: 0
                },

                line: {
                    tension: 0
                }
            },

            plugins: {
                title: {
                    display: true,
                    text: "Team Person-Hour Burnup Chart",
                },

                annotation: {
                    annotations: {
                        deadlineLine: {
                            type: 'line',
                            display: isOverdue,
                            xMin: dueDateWeek,
                            xMax: dueDateWeek,
                            borderColor: '#000000',
                            borderWidth: 2
                        }
                    }
                }
            }
        }
    });
}