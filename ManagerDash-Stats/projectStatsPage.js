// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 12/02/2025

// Path of project queries folder
const PRJST_QUERY_PATH = "ManagerDash-Stats/projectStatsPage-Queries/";

// Object that stores the project details used by the page
// Attributes: id, title start, due, created, completed, leader
const projDetails = {};

// CHARTS
// Task burnup chart
const ctx = document.getElementById("prjStBurnupChart").getContext("2d");
var projBurnup = new Chart(ctx);

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

    PopulateBurnUpChart();
}

//Fetch user details for project object
async function FetchProjectData() {

    //Get project ID from URL
    const params = new URLSearchParams(window.location.search);
    const projID = params.get('project');

    //Fetch full project details from ID
    const data = await(FetchStatsData(`projectStatsDetailsQuery.php?ID=${projID}`));

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
        <p id="prjStDueDate">Due: `+projDetails.due+`</p>
        <p id="prjStStartDate">Started: `+projDetails.start+`</p>
        <p id="prjStCreationDate">Created: `+projDetails.created+`</p>
        <p id="prjStCompletionDate">Completed: `+projDetails.completed+`</p>
        <p id="prjStLeader">Leader: `+projDetails.leader+`</p>
    `;

    document.getElementById("prjStHeader").innerHTML = header;
}

// Burnup chart
async function PopulateBurnUpChart() {

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

        if (new Date(projDetails.due) > new Date(item[0].week)
            && !dueDateWeek) {
            dueDateWeek = weekCounter;
        }

        weekCounter++;
    });

    // Show deadline for overdue projects
    const isOverdue = new Date(projDetails.due) < new Date(projDetails.completed) ?
        true : false;

    projBurnup.destroy();

    projBurnup = new Chart(ctx, {
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

            title: {
                display: true,
                text: "Progression Burnup Chart",
            },

            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Week"
                    },
                    gridLines: {
                        display: false
                    }
                }],

                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Tasks"
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
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
                annotation: {
                    annotations: {
                        deadlineLine: {
                            type: 'line',
                            xMin: dueDateWeek,
                            xMax: dueDateWeek,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                            label: {
                                content: 'Deadline',
                                enabled: isOverdue,
                                position: 'top',
                                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                color: '#fff'
                      }
                    }
                  }
                }
            }
        }
    });
}