// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 16/02/2025

// Path of project queries folder
const PRJST_QUERY_PATH = "ManagerDash-Stats/projectStatsPage-Queries/";

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


// Object that stores the project details used by the page
// Attributes: id, title start, due, created, completed, leader
const projDetails = {};


// Get global colours
const col = document.querySelector(':root');
const cols = getComputedStyle(col);

// Leader crown icon for team leader
const leaderCrown = `<span class="fa-stack small-stack">
                        <i class="fa-solid fa-circle fa-stack-2x"></i>
                        <i class="fa-solid fa-crown fa-stack-1x"></i>
                    </span>`;

// CHART INSTANCE LOCATIONS
// Need to be declared as each chart population function calls destroy()
// which requires an existing chart instance

// Task dial chart
const dialCtx = document.getElementById("prjStTaskDialChart").getContext("2d");
var taskDial;

// Project prev week contribution breakdown chart
const prevWeekCtx = document.getElementById("prjStPrevWeekChart").getContext("2d");
var prevWeek;

// Project total hours burnup chart
const burnupCtx = document.getElementById("prjStBurnupChart").getContext("2d");
var projBurnup;




//==============================================================



// Populate page when a project is selected
async function PopulateProjectStatsPage() {

    // show back button
    document.querySelector('#backButtonProj').style.display = 'block';


    // Hide page until populated
    document.getElementById("prjStContainer").style.display = "none";
    document.getElementById("prjStErrorBox").style.display = "none";

    // Fetch full project details from ID
    // Show project not found message and abort if not found
    if (!await FetchProjectData()) {
        document.getElementById("prjStErrorBox").style.display = "block";
        return;
    }

    const pageTitle = document.querySelector('#stats-title');
    pageTitle.innerHTML = `Statistics for ${projDetails.title}` + ` (ID ${projDetails.id})`;

    PopulateProjectStatsHeader();

    PopulateMemberList();

    await PopulateTaskDialChart();

    await PopulatePrevWeekChart();

    await PopulateBurnUpChart();

    document.getElementById("prjStContainer").style.display = "flex";
}

// Fetch user details for project object
async function FetchProjectData() {

    // Get project ID from URL
    const params = new URLSearchParams(window.location.search);
    const projID = params.get('project');

    // Fetch full project details from ID
    const data = await(FetchStatsData(
        `projectStatsDetailsQuery.php?ID=${projID}`));

    // Exit if project not found
    if (!data[0][0]) {
        return 0;
    }

    // Populate projDetails object
    projDetails.id = projID;
    projDetails.title = data[0][0].Project_Title;
    projDetails.start = data[0][0].Start_Date;
    projDetails.due = data[0][0].Due_Date;
    projDetails.created = data[0][0].Creation_Date;
    projDetails.completed = data[0][0].Completion_Date;
    projDetails.ledId = data[0][0].Project_Leader;
    projDetails.ledForename = data[0][0].Forename;
    projDetails.ledSurname = data[0][0].Surname;

    return 1;
};



// Project header
function PopulateProjectStatsHeader() {

    let leaderText = `${projDetails.ledForename} ${projDetails.ledSurname} (${projDetails.ledId})`
    let completionTextCol = projDetails.completed ? "stats-GreenText" : "stats-YellowText";
    let completionText = projDetails.completed ? "Completed" : "Ongoing";
    
    let statusTextCol;
    let statusText;

    if (projDetails.completed) {
        if (new Date(projDetails.completed) > new Date(projDetails.due)) {
            statusTextCol = "stats-RedText";
            statusText = "Overdue";
        }
        else {
            statusTextCol = "stats-GreenText";
            statusText = "On Schedule";
        }
    }

    else {
        if (new Date() > new Date(projDetails.due)) {
            statusTextCol = "stats-RedText";
            statusText = "Overdue";
        }
        else {
            statusTextCol = "stats-YellowText";
            statusText = "On Schedule";
        }
    }

    const header = `
        <p id="prjStCompletion" class=${completionTextCol}><strong>`+completionText+`</strong></p>
        <p id="prjStStatus" class=${statusTextCol}><strong>`+statusText+`</strong></p>
        <p id="prjStLeader"><strong>Led by:</strong> `+leaderCrown+leaderText+`</p>
        <p id="prjStStartDate"><strong>Started:</strong> `+projDetails.start+`</p>
        <p id="prjStDueDate"><strong>Due:</strong> `+projDetails.due+`</p>
        <p id="prjStCreationDate"><strong>Created:</strong> `+projDetails.created+`</p>
    `;

    document.getElementById("prjStHeader").innerHTML = header;
}



//====================== MEMBER LIST ========================

async function PopulateMemberList() {

    // LIST DATA

    const data = await(FetchStatsData(
        `projectStatsMembersQuery.php?ID=${projDetails.id}`));

    // Build the new table to display
    let membersTable  = "<table>"
    membersTable  += `<thead>
                            <tr>
                                <th>Member</th>
                                <th>Tasks</th>
                                <th>Stuck</th>
                                <th>Email</th>
                            </tr>
                        </thead>`
    membersTable  += '<tbody>'

    // Loop through the data and create a new element for each item provided there are project members
    if(data[0][0]) {
        data[0].forEach(item => {
            // Add crown icon next to project leader's name
            let isLeaderTag = "";
            let crown = "";
            if ((item.User_ID) == projDetails.ledId) {
                isLeaderTag = `id="prjStMembersLeaderRow"`;
                crown = leaderCrown;
            }

            // Highlight stuck status
            let isStuckCol = item.Stuck == 'Yes' ? "stats-RedText" : "stats-GreenText";
    
            membersTable  += `<tr ${isLeaderTag} onclick="viewSelectedItem('user', ${item.User_ID})">
                                <td>
                                    ${item.Forename} ${item.Surname}
                                    ${crown}
                                </td>
                                <td>${item.Tasks}</td>
                                <td><p class=${isStuckCol}>${item.Stuck}</p></td>
                                <td>${item.Email}</td>
                            </tr>`
        });     
        membersTable  += '</tbody>'
        membersTable  += '</table>';
    
        // Find the container/table to display the data
        var container = document.getElementById('prjStMembersList');
        container.innerHTML = membersTable;

        // Move leader row to the top
        const leaderRow = document.getElementById('prjStMembersLeaderRow');
        if (leaderRow) {
            const memberTableBody = document.querySelector('#prjStMembersList table tbody');
            const firstRow = memberTableBody.firstChild;
            memberTableBody.insertBefore(leaderRow, firstRow);
        }
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

    // Skip drawing and show "no tasks" message if project has no tasks
    var noTasksHeader = document.getElementById('prjStTaskDialEmptyText');
    if(dialData[0] + dialData[1] + dialData[2] === 0) {
        noTasksHeader.innerText = `${projDetails.title} has no tasks assigned to it.`;
        document.getElementById('prjStTaskDialDisplay').style.display = "none";
        noTasksHeader.style.display = "block";
    }
    else {
        noTasksHeader.style.display = "none";
        document.getElementById('prjStTaskDialDisplay').style.display = "block";
    }

    // Calculate progress completion percentage
    let totalTasks = dialData[0] + dialData[1] + dialData[2];
    let percentage = Math.round((dialData[0]*100) / totalTasks);
    document.getElementById("prjStTaskDialPercentageText").innerText = percentage + "%";

    // Populate chart legend text
    document.getElementById("prjStLegendDone").innerText = dialData[0];
    document.getElementById("prjStLegendInprog").innerText = dialData[1];
    document.getElementById("prjStLegendTodo").innerText = dialData[2];

    if(taskDial) {
        taskDial.destroy();
    }

    const dialCtx = document.getElementById("prjStTaskDialChart").getContext("2d");
    taskDial = new Chart(dialCtx, {
        type: 'doughnut',

        data: {
            labels: ['Done',
                'In Progress',
                'To Do'],
            datasets: [{
                data: dialData,
                backgroundColor: [
                    cols.getPropertyValue('--green'),
                    cols.getPropertyValue('--orange'),
                    cols.getPropertyValue('--medium-gray')
                ]
            }]
        },
        
        options: {
            rotation: -90,
            circumference: 180, 
            cutout: '80%',
            responsive: true,
            aspectRatio: 2,
    
            plugins: {

                title: {
                    display: true,
                    align: 'start',
                    text: `Task breakdown for ${projDetails.title}`
                },

                legend: {
                    display: false
                }
            }
        }
    });
}



//====================== WEEKLY CONTRIBUTION BREAKDOWN CHART ========================

async function PopulatePrevWeekChart() {
    
    // CHART DATA

    const data = await(FetchStatsData(
        `projectStatsPrevWeekQuery.php?ID=${projDetails.id}`));


    // FORMAT DATA FOR CHART

    // Arrays to store fetched data in correct format for chart
    const prevWeekIDs = new Array();
    const prevWeekNames = new Array();
    const prevWeekInitials = new Array();
    const prevWeekHours = new Array();

    // Iterate and split data into the correct arrays
    data[0].forEach((item) => {
        prevWeekIDs.push(item.User_ID);
        prevWeekNames.push(`${item.Forename} ${item.Surname}`);
        prevWeekInitials.push(`${item.Forename} ${item.Surname}`);
        prevWeekHours.push(item.Hours);
    });

    

    // DRAW CHART

    if (prevWeek) {
        prevWeek.destroy();
    }

    const prevWeekCtx = document.getElementById("prjStPrevWeekChart").getContext("2d");
    prevWeek = new Chart(prevWeekCtx, {
        type: 'bar',

        data: {
            labels: prevWeekInitials,
            datasets: [{
                label: 'Hours delivered',
                data: prevWeekHours,
                backgroundColor: cols.getPropertyValue('--green'),
                borderColor: cols.getPropertyValue('--green')
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            font: {
                family: 'Avenir Next'
            },

            scales: {
                x: {
                    grid: {
                        display: true,
                        drawOnChartArea: false
                    }
                },
                y: {
                    suggestedMax: 10
                }
            },

            plugins: {

                tooltip: {
                    callbacks: {
                        title: (TooltipItem) => {
                            let pos = TooltipItem[0].dataIndex;
                            return prevWeekNames[pos];
                        }
                    }
                },

                title: {
                    display: true,
                    align: 'start',
                    text: 'Hours delivered by members - past week'
                },

                legend: {
                    display: false
                }
            }
        }
    });
}


//====================== BURNUP CHART ========================

async function PopulateBurnUpChart() {

    // SET PROJECT END DATE

    // End date of interval to fetch tasks in, in priority order:
    // - If completed, end is completion/due date, whichever is later
    // - If incomplete, end is current/due date, whichever is later
    // Sets flag to show completion line if completed
    const dueDateObj = new Date(projDetails.due);
    var projEndDate;
    var completionLineDate;

    if (projDetails.completed) {

        completionLineDate = new Date(projDetails.completed);
        if (dueDateObj < new Date(projDetails.completed)) {
            projEndDate = projDetails.completed;
        }
        else {
            projEndDate = projDetails.due;
        }
    }

    else {

        completionLineDate = new Date();
        if (dueDateObj < Date.now()) {
            projEndDate = new Date().toISOString().substring(0, 10);
        }
        else {
            projEndDate = projDetails.due;
        }
    } 

    console.log("end date " + projEndDate);



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
    var endWeek = -1;

    // Arrays to store fetched data in correct format for chart
    const burnupLabels = new Array();
    const burnupDates = new Array();
    const burnupCompleted = new Array();
    const burnupScope = new Array();
    
    data.forEach(item => {
        burnupLabels.push(weekCounter);
        burnupDates.push(item[0].week);
        burnupCompleted.push(item[0].comp);
        burnupScope.push(item[0].scope);

        // Set correct week number for due date
        // and completion date if showing completion
        if (dueDateObj - new Date(item[0].week) < WEEK_MILLIS
            && dueDateWeek == -1) {
            dueDateWeek = weekCounter;
        }

        if (completionLineDate - new Date(item[0].week) < WEEK_MILLIS
        && endWeek == -1) {
            endWeek = weekCounter;
        }

        weekCounter++;
    });

    if (projDetails.completed == null) {
        var endLineLabel = "Today";
        var endLineCol = cols.getPropertyValue("--dark-purple");
    }
    else {
        var endLineLabel = "Completed";
        var endLineCol = cols.getPropertyValue("--dark-green");
    }

    console.log("due week: " + dueDateWeek + " " + burnupDates[dueDateWeek]);
    console.log("end week: " + endWeek + " " + burnupDates[endWeek]);
    
    
    // DRAW CHART

    // Extend x axis to prevent cutoff
    var xMaxCalc = Math.ceil(burnupScope.length * 1.1);

    // Extend "virtual" y axis to prevent cutoff
    // True y axis is further extended based on this value
    var yMaxCalc = Math.ceil(burnupScope[burnupCompleted.length-1] * 0.12) * 10;
    if (yMaxCalc == 0) yMaxCalc = 10;

    if (projBurnup) {
        projBurnup.destroy();
    }

    const burnupCtx = document.getElementById("prjStBurnupChart").getContext("2d");
    projBurnup = new Chart(burnupCtx, {
        type: "line",
        data: {
            labels: burnupLabels,
            datasets: [
                {
                    label: "Scope",
                    data: burnupScope,
                    borderColor: "#6d8ce5",
                    backgroundColor: "#6d8ce5",
                    fill: false
                },
                {
                    label: "Delivered",
                    data: burnupCompleted,
                    borderColor: cols.getPropertyValue('--green'),
                    backgroundColor: cols.getPropertyValue('--green'),
                    fill: false
                },
                {
                    label: "Ideal Delivery",
                    data: [{x: 0, y: 0}, {x: dueDateWeek, y: burnupScope[dueDateWeek]}],
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
                    text: `Total hours of work for ${projDetails.title}`
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
                            display: true,
                            xMin: endWeek,
                            xMax: endWeek,
                            yMin: 0,
                            yMax: yMaxCalc,
                            borderColor: endLineCol,
                            borderWidth: 2,
                            z: 1
                        },

                        completionLabel: {
                            type: 'label',
                            display: true,
                            content: endLineLabel,
                            position: 'center',
                            xValue: endWeek,
                            yValue: yMaxCalc,
                            yAdjust: -30,
                            padding: 0,
                            backgroundColor: cols.getPropertyValue('--light-gray-bg'),
                            z: 1,
                            callout: {
                                display: true,
                                position: 'bottom',
                                margin: 0,
                                borderColor: endLineCol
                            }
                        }
                    }
                }
            }
        }
    });
}