// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 12/02/2025

// Path of project queries folder
const PRJST_QUERY_PATH = "ManagerDash-Stats/projectStatsPage-Queries/";

// Object that stores the project details used by the page
// Attributes: id, title start, due, created, completed, leader
const projDetails = {};

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
}

//Fetch user details for project object
async function FetchProjectData() {

    //Get project ID from URL
    const params = new URLSearchParams(window.location.search);
    const projID = params.get('project');

    //Fetch full project details from ID
    const data = await(FetchStatsData("projectStatsGetProjectInfoQuery.php?ID=" + projID));

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

// Populate project header
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