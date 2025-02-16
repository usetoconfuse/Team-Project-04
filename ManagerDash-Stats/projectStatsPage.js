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

    if(dialData[0] === 0 && dialData[1] ==0 && dialData[2] === 0) { // Improve readbility for when there are no tasks for a user. (Error handling)
        let prjStatsPercentText = document.getElementById('prjStatsPercentText');
        prjStatsPercentText.innerHTML = "";
        document.getElementById("prjStTaskDialPercentageText").innerText = "No projects have been set for userID: " +  projDetails.title;
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

    // SET PROJECT END DATe

    // End date of duration to fetch tasks for, in priority order:
    // - If completed, end is completion/due date, whichever is later
    // - If incomplete, end is current/due date, whichever is later
    // Sets flag to show completion line if completed
    const dueDateObj = new Date(projDetails.due);
    var projEndDate;
    var showCompletion;

    if (projDetails.completed) {

        if (dueDateObj < new Date(projDetails.completed)) {
            projEndDate = projDetails.completed;
        }
        else {
            projEndDate = projDetails.due;
        }

        showCompletion = true;
    }

    else {

        if (dueDateObj < Date.now()) {
            projEndDate = new Date().toISOString().substring(0, 10);
        }
        else {
            projEndDate = projDetails.due;
        }

        showCompletion = false;
    } 

    console.log("end date " + projEndDate);
    console.log("show completion " + showCompletion);



    // FETCH DATABASE DATA
    
    // Fetch data each week between start and end dates
    const data = await(FetchStatsData(
        `projectStatsBurnupQuery.php?ID=${projDetails.id}&START=${projDetails.start}&END=${projEndDate}`));


    // FORMAT DATA FOR CHART

    // Number of milliseconds in a week used for date comparisons
    const WEEK_MILLIS = 1000 * 60 * 60 * 24 * 7;

    // Count weeks from start for x-axis labels and annotation positions
    var weekCounter = 0;
    var dueDateWeek = -1;
    var completionWeek = -1;

    // Arrays to store fetched data in correct format for chart
    const burnUpLabels = new Array();
    const burnUpDates = new Array();
    const burnUpCompleted = new Array();
    const burnUpScope = new Array();
    
    data.forEach(item => {
        burnUpLabels.push(weekCounter);
        burnUpDates.push(item[0].week);
        burnUpCompleted.push(item[0].comp);
        burnUpScope.push(item[0].scope);

        // Set correct week number for due date
        // and completion date if showing completion
        if (dueDateObj - new Date(item[0].week) < WEEK_MILLIS
            && dueDateWeek == -1) {
            dueDateWeek = weekCounter;
        }

        if (showCompletion
            && new Date(projDetails.completed) - new Date(item[0].week) < WEEK_MILLIS
            && completionWeek == -1) {
            completionWeek = weekCounter;
        }

        weekCounter++;
    });

    console.log("due week: " + dueDateWeek + " " + burnUpDates[dueDateWeek]);
    console.log("complete week: " + completionWeek + " " + burnUpDates[completionWeek]);
    
    
    // DRAW CHART

    // Get global colours
    const col = document.querySelector(':root');
    const cols = getComputedStyle(col);

    // Extend x axis to prevent cutoff
    var xMaxCalc = Math.ceil(burnUpScope.length * 1.1);

    // Extend "virtual" y axis to prevent cutoff
    // True y axis is further extended based on this value
    var yMaxCalc = Math.ceil(burnUpScope[burnUpCompleted.length-1] * 0.12) * 10;
    if (yMaxCalc == 0) yMaxCalc = 10;

    projBurnup.destroy();

    projBurnup = new Chart(burnupCtx, {
        type: "line",
        data: {
            labels: burnUpLabels,
            datasets: [
                {
                    label: "Scope",
                    data: burnUpScope,
                    borderColor: "#6d8ce5",
                    backgroundColor: "#6d8ce5",
                    fill: false
                },
                {
                    label: "Delivered",
                    data: burnUpCompleted,
                    borderColor: cols.getPropertyValue('--green'),
                    backgroundColor: cols.getPropertyValue('--green'),
                    fill: false
                },
                {
                    label: "Ideal Delivery",
                    data: [{x: 0, y: 0}, {x: dueDateWeek, y: burnUpScope[dueDateWeek]}],
                    borderDash: [10,5],
                    borderColor: 'rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(0,0,0,0)'
                }
            ]
        },
        options: {
            responsive: true,

            font: {
                family: 'Avenir Next'
            },

            scales: {
                x: {
                    type: 'linear',
                    max: xMaxCalc,

                    title: {
                        display: true,
                        text: "Weeks elapsed"
                    },
                    grid: {
                        display: true,
                        drawOnChartArea: false
                    },
                    ticks: {
                        includeBounds: false
                    }
                },

                y: {
                    type: 'linear',
                    max: yMaxCalc * 1.3,
                    
                    title: {
                        display: true,
                        text: "Hours of work"
                    },
                    ticks: {
                        beginAtZero: true,
                        includeBounds: false
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

                tooltip: {
                    enabled: false
                },

                title: {
                    display: true,
                    align: 'start',
                    text: `Total hours of work for ${projDetails.title}`,
                    padding: {
                        top: 10,
                        bottom: 0
                    }
                },
                
                legend: {
                    align: 'start',
                    labels: {
                        boxHeight: 0,
                        textAlign: 'left'
                    }
                },
                
                annotation: {
                    clip: false,

                    annotations: {
                        deadlineLine: {
                            type: 'line',
                            display: true,
                            xMin: dueDateWeek,
                            xMax: dueDateWeek,
                            yMin: 0,
                            yMax: yMaxCalc,
                            borderColor: cols.getPropertyValue('--red'),
                            borderWidth: 2,
                            z: 2
                        },

                        deadlineLabel: {
                            type: 'label',
                            display: true,
                            content: 'Deadline',
                            position: 'center',
                            xValue: dueDateWeek,
                            yValue: yMaxCalc,
                            yAdjust: -10,
                            padding: 0,
                            backgroundColor: cols.getPropertyValue('--light-gray-bg'),
                            z: 2,
                            callout: {
                                display: true,
                                position: 'bottom',
                                margin: 0,
                                borderColor: cols.getPropertyValue('--red')
                            }
                        },

                        completionLine: {
                            type: 'line',
                            display: showCompletion,
                            xMin: completionWeek,
                            xMax: completionWeek,
                            yMin: 0,
                            yMax: yMaxCalc,
                            borderColor: cols.getPropertyValue('--dark-green'),
                            borderWidth: 2,
                            z: 1
                        },

                        completionLabel: {
                            type: 'label',
                            display: showCompletion,
                            content: 'Completed',
                            position: 'center',
                            xValue: completionWeek,
                            yValue: yMaxCalc,
                            yAdjust: -30,
                            padding: 0,
                            backgroundColor: cols.getPropertyValue('--light-gray-bg'),
                            z: 1,
                            callout: {
                                display: true,
                                position: 'bottom',
                                margin: 0,
                                borderColor: cols.getPropertyValue('--dark-green')
                            }
                        }
                    }
                }
            }
        }
    });

    Chart.defaults.font.family = 'Avenir Next';
}