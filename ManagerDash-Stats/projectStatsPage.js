// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 08/02/2025

document.getElementById('fetchDataTest').addEventListener('click', async function() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/projectStatsPage-Queries/projectStatsTestQuery.php');
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log("2: ", data[0].projectCount);

        // Find the container to display the data
        const container = document.getElementById('dataContainer');
        container.innerHTML = ''; // Clear any existing content

        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
            const div = document.createElement('div');
            div.textContent = 'Number of projects which have tasks (starting from Project_ID 1): ' + item.projectCount;
            container.appendChild(div); // Add the new element to the container
        });     
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
});