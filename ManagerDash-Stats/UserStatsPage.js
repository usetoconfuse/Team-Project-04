//Created by Quinn Little 07/02/2025


//Get Parameters

const url = window.location.href;

//URL object
const urlObj = new URL(url);

//get params
const params = new URLSearchParams(urlObj.search);

const userID = params.get('ID');

//console.log(userID);



async function fetchUserTaskTable() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('userStatsPage-Queries/userStatsTaskTableQuery.php?ID=' + userID);
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log("2: ", data[0].Task_ID);

        // Find the container/table to display the data
        var container = document.getElementById('allTaskTable-userStats');
        container.innerHTML = ''; // Clear any existing content

        container.innerHTML  += "<table class='statsHome-table'>"
        container.innerHTML  += '<thead><tr><th>Task ID</th><th>Task Name</th><th>Description</th><th>Status</th><th>Due Date</th><th>Priority</th><th>Start Date</th><th>Project Name</th></tr></thead>'
        container.innerHTML  += '<tbody>'
        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
           container.innerHTML  += "<tr onclick=redirectToPage('#')><td>" + item.Task_ID + "</td><td>" + item.Name + "</td><td>" + item.Description + "</td><td>" + item.Status + "</td><td>" + item.Due_Date + "</td><td>" + item.Priority + "</td><td>" + item.Start_Date+ "</td><td>" + item.Project_Title+ "</td></tr>"
        });     
        container.innerHTML  += '</tbody>'
        container.innerHTML  += '</table>';

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
    };

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchUserTaskTable());














//TEST DATA CHART

const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];

weekhrs = document.getElementById('userStats-weekHrsContainerGraph');

const weekhrsansd = new Chart(weekhrs, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor:"rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options:{
  responsive: true,
  }
});




