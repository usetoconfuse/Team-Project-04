// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 08/02/2025

//Get Parameters

//get params
const params = new URLSearchParams(window.location.search);

const userID = params.get('user');
const forename = params.get('forename'); 
const surname = params.get('surname');

//console.log(userID);


    //Function to fetch all man-hours over the past week of a user
    // async function fetchWeeklyHrsGraph() {
    //     try {
    //         // Make an HTTP request to the PHP file
    //         const response = await fetch('userStatsPage-Queries/userStatsWeeklyHrsGraphQuery.php?ID=' + userID);
    //         console.log("1: ", response);
            
    //         // Ensure the response is OK and return the JSON data 
    //         if (!response.ok) { 
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         // Convert the response to JSON format
    //         const data = await response.json();
    //         if (data.length > 0) {

    //             console.log("2: ", data[0].Task_ID);

    //             let weeklyHrsArr = [];                
    //             data.forEach(function(item) {
    //                 weeklyHrsArr.push(item.);
    //             });
    //             // create graph function
    //             createWeeklyHrsGraph(weeklyHrsArr);

    //         } else {
    //             createWeeklyHrsGraph([0,0,0,0,0,0,0]); // I.e. no contributions that week by employee
    //         }
    // } catch (error) {
    //     console.error('Error:', error); // Log any errors that occur
    // }
    // };


    
//Function to fetch all man-hours over the past week of a user
    async function fetchTaskStatusGraph() {
        try {
            // Make an HTTP request to the PHP file
            const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsTaskStatusGraphQuery.php?ID=' + userID);
            console.log("1: ", response);
            
            // Ensure the response is OK and return the JSON data 
            if (!response.ok) { 
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Convert the response to JSON format
            const data = await response.json();
            console.log(data);

            if (data.length > 0) {
                console.log(data);
                statusTaskArr = [];
                i = 0;
                console.log(data[0][0].tasks);
                if (data[0][0] != null) {
                    statusTaskArr.push(parseInt(data[0][0].tasks)); // To Do
                }
                if (data[1][0] != null) {
                    statusTaskArr.push(parseInt(data[1][0].tasks)); // In Progress

                }
                if (data[2][0] != null) {
                    statusTaskArr.push(parseInt(data[2][0].tasks)); // Completed

                }
                if (data[3][0] != null) {
                    statusTaskArr.push(parseInt(data[3][0].tasks)); // Stuck

                }





                // data.forEach(function(item) {
                //     statusTaskArr.push(item[i]);
                //     i++;
                // });                        
                console.log(statusTaskArr)
                createTaskStatusGraph(statusTaskArr);

            } else {
                createTaskStatusGraph([0,0,0,0]); // I.e. no tasks for that employee
            }
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
    };

//Function to fetch overall manhours per project of a user
async function fetchUserProjHrsTable() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsProjHrsTableQuery.php?ID=' + userID);
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();

        if (data.length > 0) {
            console.log("2: ", data[0].Project_ID);


            // Find the container/table to display the data
            var container = document.getElementById('userStats-projHrsTable');
            container.innerHTML = ''; // Clear any existing content

            container.innerHTML  += "<table class='statsHome-table'>"
            //Approx man-hrs as tasks could be shorter/longer than expected
            container.innerHTML  += `<thead>
                                        <tr>
                                            <th>Project ID</th>
                                            <th>Project Name</th>
                                            <th>Approx Man Hours Spent by ` + forename + ` ` + surname + ` (ID=` + userID + `)` + `</th>
                                        </tr>
                                    </thead>`
            container.innerHTML  += '<tbody>'

            // Loop through the data and create a new element for each item
            data.forEach(function(item) {
            container.innerHTML  += `<tr>
                                        <td>` + item.Project_ID + `</td>
                                        <td>` + item.Project_Title + `</td>
                                        <td>` + item.TotalHrs + `</td>
                                    </tr>`
            });     
            container.innerHTML  += '</tbody>'
            container.innerHTML  += '</table>';

            } else {
                var container = document.getElementById('userStats-projHrsTable');
                container.innerHTML = '<h2>Selected User isn\'t assigned to any projects, or they haven\'t completed any tasks.</h2>'; // No results, show user.
            }

        } catch (error) {
            console.error('Error:', error); // Log any errors that occur
        }
        };



    //Function to fetch all tasks of a user
    async function fetchUserTaskTable() {
        try {
            // Make an HTTP request to the PHP file
            const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsTaskTableQuery.php?ID=' + userID);
            console.log("1: ", response);
            
            // Ensure the response is OK and return the JSON data 
            if (!response.ok) { 
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Convert the response to JSON format
            const data = await response.json();
            if (data.length > 0) {

                console.log("2: ", data[0].Task_ID);

                // Find the container/table to display the data
                var container = document.getElementById('allTaskTable-userStats');
                container.innerHTML = ''; // Clear any existing content

                container.innerHTML  += "<table class='statsHome-table'>"
                container.innerHTML  += `<thead>
                                            <tr>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Stuck?</th>
                                                <th>Due Date</th>
                                                <th>Priority</th>
                                                <th>Start Date</th>
                                                <th>Project Name</th>
                                            </tr>
                                        </thead>`
                container.innerHTML  += '<tbody>'
                // Loop through the data and create a new element for each item
                data.forEach(function(item) {
                    if (item.Stuck === "1") { // Make the "stuck" field readable for user.
                        var stuck = "Yes";
                        var stuckStyles = "color:red;font-weight:bold"; // RED background for when stuck
                    } else {
                        var stuck = "No";
                        var stuckStyles = "color:black";
                    }
                    container.innerHTML  += `<tr>
                                            <td>` + item.Task_ID + `</td>
                                            <td>` + item.Name + `</td>
                                            <td>` + item.Description + `</td>
                                            <td>` + item.Status + `</td>
                                            <td style="` + stuckStyles + `";>` + stuck + `</td>
                                            <td>` + item.Due_Date + `</td>
                                            <td>` + item.Priority + `</td>
                                            <td>` + item.Start_Date+ `</td>
                                            <td>` + item.Project_Title+ `</td>
                                        </tr>`
                    });     
                    container.innerHTML  += '</tbody>'
                    container.innerHTML  += '</table>';
            } else {
                var container = document.getElementById('allTaskTable-userStats');
                container.innerHTML = '<h2>Selected User isn\'t assigned to any projects or hasn\'t been assigned any tasks.</h2>'; // No results, show user.
            }
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
    };


// Event Listeners
// We cannot use DOMContentLoaded as this is not its own page
// Therefore we use the "selected" custom event to know when a user has been selected

document.getElementById("userViewStats").addEventListener('selected', () => {

    //Fetch all tasks of a user
    fetchUserTaskTable();

    //Fetch overall project hours of a user
    fetchUserProjHrsTable();

    //Fetch weekly man-hours graph across all projects
    // fetchWeeklyHrsGraph();

    // Fetch task status graph
    fetchTaskStatusGraph();
});



function createTaskStatusGraph(currentTaskStatus) {
        const daysOfWeek = ['To Do', 'In Progress', 'Completed', 'Stuck'];
    
        weekhrs = document.getElementById('userStats-weekHrsContainerGraph');
    
        const weekhrsansd = new Chart(weekhrs, {
        type: "bar",
        data: {
            labels: daysOfWeek,
            datasets: [{
                label:['To Do', 'In Progress', 'Completed', 'Stuck'],
            backgroundColor:["rgba(255, 85, 0, 0.5)", "rgba(255, 225, 0, 0.5)", "rgba(111, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
            borderColor: ["rgba(255, 85, 0, 0.5)","rgba(255, 225, 0, 0.5)","rgba(111, 255, 0, 0.5)","rgba(255, 0, 0, 0.5)"],
            data: currentTaskStatus
            }]
        },
        options:{
            responsive: true,
          
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color:  ["rgba(255, 85, 0, 0.5)","rgba(255, 225, 0, 0.5)","rgba(111, 255, 0, 0.5)","rgba(255, 0, 0, 0.5)"],
                    }
                }
            },    
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true // Make y-axis start at zero.
                    }}]
            },
            title: {
                display: true,
                text: `Task Status Graph for user ${userID} - ${forename} ${surname}`
                }
        }
        });
    }
    






//function to create chart

// function createWeeklyHrsGraph(dailyManHrs) {
//     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     weekhrs = document.getElementById('userStats-weekHrsContainerGraph');

//     const weekhrsansd = new Chart(weekhrs, {
//     type: "bar",
//     data: {
//         labels: daysOfWeek,
//         datasets: [{
//         backgroundColor:"rgba(0,0,255,1.0)",
//         borderColor: "rgba(0,0,255,0.1)",
//         data: yValues
//         }]
//     },
//     options:{
//     responsive: true,
//     }
//     });
// }





