// Created by Quinn Little 07/02/2025
// Updated by Toby Tischler 13/02/2025




// Object that stores the user details used by the page
// Attributes: id, forename, surname, email, role, status
const userDetails = {};

// Task breakdown chart
// var weekhrsansd = new Chart(document.getElementById('userStats-weekHrsContainerGraph'));

// Populate page when a user is selected
async function PopulateUserStatsPage() {
  const pageTitle = document.querySelector('#stats-title');
  await(fetchUserDetails());
  pageTitle.innerHTML = `Statistics for ${userDetails.forename}` + ` ${userDetails.surname}` +` (${userDetails.id})`;

    //Fetch full user details from ID


    //Fetch all tasks of a user
    await(getUserStatsTaskData());

    //Fetch overall project hours of a user
    // await(fetchUserProjHrsTable()); // Table currently not in use.

    //Fetch weekly man-hours graph across all projects
    // fetchWeeklyHrsGraph();

    //Fetch task status graph
    // fetchTaskStatusGraph();

    fetchProjTimeGraph(userDetails.id);

    PopulateTaskDialChartUserStats();

    fillProjDropDown(userDetails.id);
};



//Fetch user details for user object
async function fetchUserDetails() {
    try {
        //Get user ID from URL
        const params = new URLSearchParams(window.location.search);
        const userID = params.get('user');
        
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsGetUserInfoQuery.php?ID=' + userID);
        // console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        
        // Populate userDetails object
        userDetails.id = userID;
        userDetails.forename = data[0].Forename;
        userDetails.surname = data[0].Surname;
        userDetails.email = data[0].Email;
        userDetails.role = data[0].User_Type;
        userDetails.status = data[0].Employee_Status;
        // console.log(userDetails);

    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
};


//console.log(userID);


    //Function to fetch all man-hours over the past week of a user
    // async function fetchWeeklyHrsGraph() {
    //     try {
    //         // Make an HTTP request to the PHP file
    //         const response = await fetch('userStatsPage-Queries/userStatsWeeklyHrsGraphQuery.php?ID=' + userDetails.id);
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
// async function fetchTaskStatusGraph() {
//     try {
//         // Make an HTTP request to the PHP file
//         const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsTaskStatusGraphQuery.php?ID=' + userDetails.id);
//         // console.log("1: ", response);
        
//         // Ensure the response is OK and return the JSON data 
//         if (!response.ok) { 
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         // Convert the response to JSON format
//         const data = await response.json();
//         // console.log(data);

//         if (data.length > 0) {
//             // console.log("Test 0: ", data);
//             statusTaskArr = [];
//             i = 0;
//             // console.log("Test 1: ", data[0][0]);
//             // console.log("Test 2: ", (data[0][0]).tasks);

//             if (data[0][0] != null) {
//                 statusTaskArr.push(parseInt(data[0][0].Tasks)); // To Do
//                 // console.log("test",data[0]);
//             }
//             if (data[1][0] != null) {
//                 statusTaskArr.push(parseInt(data[1][0].Tasks)); // In Progress

//             }
//             if (data[2][0] != null) {
//                 statusTaskArr.push(parseInt(data[2][0].Tasks)); // Completed

//             }
//             if (data[3][0] != null) {
//                 statusTaskArr.push(parseInt(data[3][0].Tasks)); // Stuck

//             }





//             // data.forEach(function(item) {
//             //     statusTaskArr.push(item[i]);
//             //     i++;
//             // });                        
//             // console.log("status: ", statusTaskArr)
//             createTaskStatusGraph(statusTaskArr);

//         } else {
//             createTaskStatusGraph([0,0,0,0]); // I.e. no tasks for that employee
//         }
// } catch (error) {
//     console.error('Error:', error); // Log any errors that occur
// }
// };

//Function to fetch overall manhours per project of a user


// =====================================================Currently a table which isn't used ===================================================
// async function fetchUserProjHrsTable() {
//     try {
//         // Make an HTTP request to the PHP file
//         const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsProjHrsTableQuery.php?ID=' + userDetails.id);
//         // console.log("1: ", response);
        
//         // Ensure the response is OK and return the JSON data 
//         if (!response.ok) { 
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         // Convert the response to JSON format
//         const data = await response.json();

//         if (data.length > 0) {
//             // console.log("2: ", data[0].Project_ID);

//             // Build the new table to display
//             let hoursTable  = "<table class='statsHome-table'>"
//             //Approx man-hrs as tasks could be shorter/longer than expected
//             hoursTable  += `<thead>
//                                         <tr>
//                                             <th>Project ID</th>
//                                             <th>Project Name</th>
//                                             <th>Approx Man Hours Spent by ` + userDetails.forename + ` ` + userDetails.surname + ` (ID=` + userDetails.id + `)` + `</th>
//                                         </tr>
//                                     </thead>`
//             hoursTable  += '<tbody>'

//             // Loop through the data and create a new element for each item
//             data.forEach(function(item) {
//             hoursTable  += `<tr>
//                                         <td>` + item.Project_ID + `</td>
//                                         <td>` + item.Project_Title + `</td>
//                                         <td>` + item.TotalHrs + `</td>
//                                     </tr>`
//             });     
//             hoursTable  += '</tbody>'
//             hoursTable  += '</table>';

//             // Find the container/table to display the data
//             var container = document.getElementById('userStats-projHrsTable');
//             container.innerHTML = hoursTable;

//             } else {
//                 var container = document.getElementById('userStats-projHrsTable');
//                 container.innerHTML = '<h2>Selected User isn\'t assigned to any projects, or they haven\'t completed any tasks.</h2>'; // No results, show user.
//             }

//         } catch (error) {
//             console.error('Error:', error); // Log any errors that occur
//         }
        // };







// =======================FILTER FUNC ============================


async function getUserStatsTaskData(filters={}) {
    try {
  
      let url = `ManagerDash-Stats/userStatsPage-Queries/userStatsTaskTableQuery.php?userID=${encodeURIComponent(userDetails.id)}`; 
  
      const filterQuery = new URLSearchParams(filters).toString();
      url += filterQuery ? `&${filterQuery}` : '';
  
      const params = { 
        method: "GET",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
  
      const response = await fetch(url, params);
  
      if (!response.ok) {
        throw new Error('Failed to fetch projects data');
      }
      const data = await response.json();

            var container = document.getElementById('allTaskTable-userStats');
            container.innerHTML = ''; // No results, show user.
            

            if (data.length > 0) {
                console.log(data);
                // console.log("2: ", data[0].Task_ID);

                // Build the new table to display
                let tasksTable  = "<table class='statsHome-table'>"
                tasksTable  += `<thead>
                                            <tr>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Status</th>
                                                <th>Stuck?</th>
                                                <th>Due Date</th>
                                                <th>Priority</th>
                                                <th>Start Date</th>
                                                <th>Project Name</th>
                                            </tr>
                                        </thead>`
                tasksTable  += '<tbody>'
                // Loop through the data and create a new element for each item
                data.forEach(function(item) {
                    if (item.Stuck === "1") { // Make the "stuck" field readable for user.
                        var stuck = "Yes";
                        var stuckStyles = "color:red;font-weight:bold"; // RED background for when stuck
                    } else {
                        var stuck = "No";
                        var stuckStyles = "color:black";
                    }
                    tasksTable  += `<tr>
                                            <td>` + item.Task_ID + `</td>
                                            <td>` + item.Name + `</td>
                                            <td>` + item.Status + `</td>
                                            <td style="` + stuckStyles + `";>` + stuck + `</td>
                                            <td>` + item.Due_Date + `</td>
                                            <td>` + item.Priority + `</td>
                                            <td>` + item.Start_Date+ `</td>
                                            <td>` + item.Project_Title+ `</td>
                                        </tr>`
                    });     
                    tasksTable  += '</tbody>'
                    tasksTable  += '</table>';

                    // Find the container/table to display the data
                    container.innerHTML = tasksTable;
            } else {
                container.innerHTML = '<h2>Sorry, no tasks for this user - please check your filters</h2>'; // No results, show user.

            }
  
    } catch (error) {
      console.log("Fetch Issue",error);
    }
  }


  async function fillProjDropDown(userID) {
    try {
      // Make an HTTP request to the PHP file
      const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsProjDropdownQuery.php?ID=' + userID );
      // console.log("1: ", response);
      
      // Ensure the response is OK and return the JSON data 
      if (!response.ok) { 
          throw new Error('Network response was not ok ' + response.statusText);
      }
      // Convert the response to JSON format
      const data = await response.json();

      var container = document.querySelector('.task-dropdown-proj #user-proj');
      

      if (data.length > 0) {
          console.log(data);
          container.innerHTML = "<option value='All' selected>Show All</option>";

          data.forEach(function(item) {
            container.innerHTML += `<option value='${item.Project_ID}'>${item.Project_Title}</option>`;
          })
      } else {
        container.innerHTML = "<option value='All' selected>Show All</option>";
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur
    }
  }










    // //Function to fetch all tasks of a user
    // async function fetchUserTaskTable(stuck, high, earliest) {
    //     console.log(stuck);

    //     console.log(high);
    //     console.log(earliest);
    //     //stuckValue, priorityValue, dateValue, orderByValue

    //     try {
    //         // Make an HTTP request to the PHP file
    //         const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsTaskTableQuery.php?ID=' + userDetails.id + '&stuck=' + stuck + '&high=' + high + '&earliest=' + earliest); // '&orderByValue=' + orderByValue + '&dateValue' +dateValue
    //         // console.log("1: ", response);
            
    //         // Ensure the response is OK and return the JSON data 
    //         if (!response.ok) { 
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         // Convert the response to JSON format
    //         const data = await response.json();

    //         var container = document.getElementById('allTaskTable-userStats');
    //         container.innerHTML = ''; // No results, show user.
            

    //         if (data.length > 0) {
    //             console.log(data);
    //             // console.log("2: ", data[0].Task_ID);

    //             // Build the new table to display
    //             let tasksTable  = "<table class='statsHome-table'>"
    //             tasksTable  += `<thead>
    //                                         <tr>
    //                                             <th>Task ID</th>
    //                                             <th>Task Name</th>
    //                                             <th>Status</th>
    //                                             <th>Stuck?</th>
    //                                             <th>Due Date</th>
    //                                             <th>Priority</th>
    //                                             <th>Start Date</th>
    //                                             <th>Project Name</th>
    //                                         </tr>
    //                                     </thead>`
    //             tasksTable  += '<tbody>'
    //             // Loop through the data and create a new element for each item
    //             data.forEach(function(item) {
    //                 if (item.Stuck === "1") { // Make the "stuck" field readable for user.
    //                     var stuck = "Yes";
    //                     var stuckStyles = "color:red;font-weight:bold"; // RED background for when stuck
    //                 } else {
    //                     var stuck = "No";
    //                     var stuckStyles = "color:black";
    //                 }
    //                 tasksTable  += `<tr>
    //                                         <td>` + item.Task_ID + `</td>
    //                                         <td>` + item.Name + `</td>
    //                                         <td>` + item.Task_Status + `</td>
    //                                         <td style="` + stuckStyles + `";>` + stuck + `</td>
    //                                         <td>` + item.Due_Date + `</td>
    //                                         <td>` + item.Priority + `</td>
    //                                         <td>` + item.Start_Date+ `</td>
    //                                         <td>` + item.Project_Title+ `</td>
    //                                     </tr>`
    //                 });     
    //                 tasksTable  += '</tbody>'
    //                 tasksTable  += '</table>';

    //                 // Find the container/table to display the data
    //                 container.innerHTML = tasksTable;
    //         } else {
    //             if(stuck != '' || earliest != '' || high != '') {
    //                 container.innerHTML = '<h2>Sorry, no results for your selected filters</h2>'; // No results, show user.
    //             } else {
    //                 container.innerHTML = '<h2>Selected User isn\'t assigned to any projects or hasn\'t been assigned any tasks.</h2>'; // No results, show user.
    //             }
    //         }
    // } catch (error) {
    //     console.error('Error:', error); // Log any errors that occur
    // }
    // };



function createTaskStatusGraph(currentTaskStatus) {

        weekhrsansd.destroy();
    
        const daysOfWeek = ['To Do', 'In Progress', 'Completed', 'Stuck'];
    
        weekhrsansd = new Chart(document.getElementById('userStats-weekHrsContainerGraph'), {
        type: "bar",
        data: {
            labels: daysOfWeek,
            datasets: [{
            backgroundColor:["rgba(255, 85, 0, 0.5)", "rgba(255, 225, 0, 0.5)", "rgba(111, 255, 0, 0.5)", "rgba(255, 0, 0, 0.5)"],
            borderColor: ["rgba(255, 85, 0, 0.5)","rgba(255, 225, 0, 0.5)","rgba(111, 255, 0, 0.5)","rgba(255, 0, 0, 0.5)"],
            data: currentTaskStatus
            }]
        },
        options: {
            plugins: {
                legend: {           // The legend seems to have broken when I moved all the ChartJS imports into one place. Sorry - Toby
                    display: true, // One way to have each bar as a separate legend item is to make each task category its own dataset.
                    labels: {
                        color: [
                            "rgba(255, 85, 0, 0.5)",
                            "rgba(255, 225, 0, 0.5)",
                            "rgba(111, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)"
                        ]
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true // Make y-axis start at zero.
                    }
                }
            },
            title: {
                display: true,
                text: `Task Status Graph for user ${userDetails.id} - ${userDetails.forename} ${userDetails.surname}`
            }
        }
        
        });
    }
    




//     function calculateProjectDurations(projects) {
//         // Helper function to calculate duration in days
//         const calculateDuration = (start, end) => {
//             const startDate = new Date(start);
//             const endDate = new Date(end);
//             const diffInMs = endDate - startDate;
//             return diffInMs / (1000 * 60 * 60 * 24); // Convert milliseconds to days
//         };
    
//         // Array to store the results
//         const result = [];
//         let xValArr = [];
//             let yValArr = [];
    
//         for (let i = 0; i < projects.length; i++) {
//             const startDate = (projects[i].Start_Date).substring(0,10);
//             const endDate = (projects[i].Due_Date).substring(0,10);
    
//             // Calculate duration of the current project
//             const duration = calculateDuration(startDate, endDate);
    
//             // Determine when the next project starts relative to the previous one
//             if (i === 0) {
//                 result.push({
//                     project: projects[i].Project_Title,
//                     startDate: startDate,
//                     endDate: endDate,
//                     duration: duration,
//                     sequentialStart: 0 // First project starts at 0
//                 });
//             } else {
//                 const previousEndDate = new Date(projects[i - 1].Due_Date);
//                 const currentStartDate = new Date(startDate);
//                 const overlap = (currentStartDate - previousEndDate) / (1000 * 60 * 60 * 24); // Difference in days
//                 console.log("NANANANA ",overlap );
//                 result.push({
//                     project: projects[i].Project_Title,
//                     startDate: startDate,
//                     endDate: endDate,
//                     duration: duration,
//                     sequentialStart: result[i - 1].sequentialStart + duration + overlap
//                 });

//             }
//             console.log("resy:", result);

            


//         }
        
//         result.forEach(function(item) {
//             let miniTempArr = []
//             miniTempArr.push(item.sequentialStart);
//             miniTempArr.push((item.sequentialStart + item.duration));
//             xValArr.push(item.project);
//             yValArr.push(miniTempArr);
//         });
//         createProjTimeGraph(xValArr,yValArr);
    
//     }    

// fetch data for projTime chart
async function fetchProjTimeGraph(userID) {

    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsProjTimeGraphQuery.php?ID=' + userID);
        // console.log("4:", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log(data);

        if (data.length > 0) {
            // console.log(data);
             // Create a dictionary (object) from the data
            //  const dataDict = {};
            //     data.forEach(item => {
            //         dataDict[item.Project_Title] = { x: [(item.Start_Date).substring(0,10), (item.Due_Date).substring(0,10)], y: item.Project_Title };
            //     });
            const dataset = data.map(item => ({
                    x:  [(item.Start_Date).substring(0,10), (item.Due_Date).substring(0,10)],
                    y: (item.Project_Title)
                }));
                // Log the dictionary to the console
                // console.log(dataset);

                createGantt(dataset);
  
        } else {
           // createTaskStatusGraph([0,0,0,0]); // I.e. no tasks for that employee
           if(typeof emptyGantt !== 'undefined' && emptyGantt !== null){
            emptyGantt.destroy();
           } else {
              var emptyGantt = new Chart(document.getElementById('userStats-overlapContainerGraph'));
           }


        }
      } catch (error) {
          console.error('Error:', error); // Log any errors that occur
      }
      
        

      }
//function to create chart

function createProjTimeGraph(yAxProj, durArr) {

     weekhrs = document.getElementById('userStats-overlapContainerGraph').getContext('2d');

    weekhrsansd = new Chart(weekhrs, {
    type: "bar",
    data: {
        labels: yAxProj,
        datasets: [{
        backgroundColor:"rgba(255, 242, 0, 1)",
        borderColor: "rgba(255, 242, 0, 1)",
        data: durArr
        }]
    },
options: {
    indexAxis: "y",
    // responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Duration Graph'
        }
    },
    scales: {
        x: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Duration' // The x-axis represents the duration
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Project' // The y-axis represents the projects
            }
        }
    }}
    });
}



// function generateProjTimeGraph(data) {
//     ctx = document.getElementById('userStats-overlapContainerGraph');
    
//     const weekhrsansd = new Chart(ctx, {
//     type: "scatter",
//     data: {
//         labels: data.map(entry => `${(entry.Start_Date).substring(0,10)} - ${(entry.Due_Date).substring(0,10)}`), //yAxProj, // y-AXIS, PROJECTS
//         datasets: [{
//             label: "projects",
//             data: data.map(entry => ({
//                 x:(entry.Start_Date).substring(0,10),
//                 y: entry.Project_Title
//             })),
//             backgroundColor:"rgba(0,0,255,1.0)",
//             borderColor: "rgba(0,0,255,0.1)",
//             borderWidth: 1
//              // *ARRAY OF DATES FROM EARLIEST START TO LATEST END*========
//         }]
//     },
//     options: {
//         // indexAxis: 'y',
//         responsive: true,
//         scales: {
//             x: {
//                 type: 'time',
//                 time: {
//                     unit: 'day',
//                     tooltipFormat: 'yyyy-MM-dd',
//                     parser: 'yyyy-MM-dd' // Capitalise Month so it isn't seen as minutes.
//                 },
//                 title: {
//                     display: true,
//                     text: 'Date Range'
//                 }
//             },
//             y: {
//                 type: 'category',
//                 labels: [... new Set(data.map(entry => entry.Project_Title))],
//                 title: {
//                     display: true,
//                     text: 'Projects'
//                 }
//             }
//         },
//         plugins: {
//             tooltip: {
//                 callbacks: {
//                     title: function(tooltipItem) {
//                         return `${tooltipItem[0].raw.x} - ${tooltipItem[0].raw.y}`;
//                     }
//                 }
//             }
//         }
//     }
//     });
// }
//createWeeklyHrsGraph();
//graph dropdown
const userGraphDropdown = document.querySelector('#userStats-chooseGraph');
const weekHrsCont = document.querySelector('#userStats-weekHrsContainer');
const overlapCont = document.querySelector('#userStats-overlapContainer');
const weekHrsGraphCanvas = document.querySelector('#userStats-weekHrsContainerGraph');
const overlayGraphCanvas = document.querySelector('#userStats-overlapContainerGraph');


//userStats-overlapContainerGraph
// userGraphDropdown.addEventListener('change', () => {
//     if (userGraphDropdown.value === 'userStats-chooseGraph-weekHrs') {
//         weekHrsCont.style.display = 'block';
//         weekHrsGraphCanvas.style.display = 'block';
//         overlapCont.style.display = 'none';
//         overlayGraphCanvas.style.display = 'none';

//     } else if (userGraphDropdown.value === 'userStats-chooseGraph-overlap') {
//         overlapCont.style.display = 'block';
//         overlayGraphCanvas.style.display = 'block';
//         weekHrsCont.style.display = 'none';
//         weekHrsGraphCanvas.style.display = 'none';
//     }
//     updateGraphAxes();
// });

var myGanttChart = new Chart(document.getElementById('userStats-overlapContainerGraph'));

// Gantt Chart
function createGantt(dataset) {

  if(typeof emptyGantt !== 'undefined' && emptyGantt !== null){
    emptyGantt.destroy();
  } else if (typeof myGanttChart !== 'undefined' && myGanttChart !== null) {
    myGanttChart.destroy();
  }
    // setup 
    const data = {
      datasets: [{
        label: 'Project',
        data: dataset,
        // data: [
        //   {x: ['2025-02-02', '2025-02-08'], y: 'Task 1'},
        //   {x: ['2025-01-03', '2025-02-09'], y: 'Task 2'},
        //   {x: ['2025-01-04', '2025-02-11'], y: 'Task 3'},
        //   {x: ['2025-01-07', '2025-02-13'], y: 'Task 4'},
        //   {x: ['2025-01-08', '2025-02-12'], y: 'Task 5'},
        //   {x: ['2025-01-11', '2025-01-31'], y: 'Task 6'}

        // ],
        //     {x: '2021-06-26', y: 22},
        //     {x: '2021-06-27', y: 23},
        //     {x: '2021-06-28', y: 24},
        //     {x: '2021-06-29', y: 25},
        //     {x: '2021-06-30', y: 26},
        //     {x: '2021-07-1', y: 29}
        // ],
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1,
        borderSkipped: false,
        borderRadius: 10,
        barPercentage: 0.5
      }]
    };

    // todayLine - for plugin
    const todayLine ={
      id:'todayLine',
      afterDatasetsDraw(chart, args, pluginOptions) {
        const {ctx, data, chartArea: {top,bottom, left, right}, scales: {x,y
        }} = chart;

        ctx.save();

        ctx.beginPath(); // Gets drawn independent of the main datasets (dates and project name)
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 26, 104, 1)';
        ctx.setLineDash([6, 6]); // 6 pixels solid, 6 white
        ctx.moveTo(x.getPixelForValue(new Date()), top);
        ctx.lineTo(x.getPixelForValue(new Date()), bottom);
        ctx.stroke();

        ctx.setLineDash([ ,]); // empty to avoid crossing axes.

      }

    }

    // config 
    const config = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            position: 'top',
            type: 'time',
            time: {
              unit: 'day'
            },
            min: '2023-01-01',
            max: '2026-03-01'
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      },
      plugins: [todayLine]
    };

    // render init block
    myGanttChart = new Chart(
      document.getElementById('userStats-overlapContainerGraph'),
      config
    );


  }

  




//   Dial chart task Status...
// Task dial chart
const dialCtxUserStats = document.getElementById("userStTaskDialChart").getContext("2d");
var taskDialUserStats = new Chart(dialCtxUserStats)


//====================== TASK DIAL ========================

async function PopulateTaskDialChartUserStats() {

    // CHART DATA

    // Make an HTTP request to the PHP file
    const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsTaskStatusGraphQuery.php?ID=' + userDetails.id);
    // console.log("1: ", response);
    
    // Ensure the response is OK and return the JSON data 
    if (!response.ok) { 
        throw new Error('Network response was not ok ' + response.statusText);
    }
    // Convert the response to JSON format
    const data = await response.json();
    // console.log(data);

    if (data.length > 0) {
        // console.log("Test 0: ", data);
        statusTaskArr = [];
        i = 0;
        // console.log("Test 1: ", data[0][0]);
        // console.log("Test 2: ", (data[0][0]).tasks);

        if (data[0][0] != null) {
            statusTaskArr.push(parseInt(data[0][0].Tasks)); // To Do
            // console.log("test",data[0]);
        }
        if (data[1][0] != null) {
            statusTaskArr.push(parseInt(data[1][0].Tasks)); // In Progress

        }
        if (data[2][0] != null) {
            statusTaskArr.push(parseInt(data[2][0].Tasks)); // Completed

        }
 
        // console.log("Original Status Data: ", data);
        // console.log("Refined Status Array",statusTaskArr);

   
    


    // const dialData = [data[0][0]["Done"], data[0][0]["Inprog"], data[0][0]["Todo"]];

    // console.log("DIAL DATA:", data);
    // console.log("DIAL DATA 22:", dialData);
 

    // DRAW CHART

    // Calculate progress completion percentage
    let totalTasksUserStats = statusTaskArr[0] + statusTaskArr[1] + statusTaskArr[2];
    let percentageUserStats = Math.round((statusTaskArr[2]*100) / totalTasksUserStats);
    document.getElementById("userStTaskDialPercentageText").innerText = percentageUserStats + "%";

    // console.log("RESULTS",statusTaskArr);

    if(statusTaskArr[0] === 0 && statusTaskArr[1] ==0 && statusTaskArr[2] === 0) { // Improve readbility for when there are no tasks for a user. (Error handling)
        let userStatsPercentText = document.getElementById('userStatsPercentText');
        userStatsPercentText.innerHTML = "";
        document.getElementById("userStTaskDialPercentageText").innerText = "No tasks have been set for userID: " + userDetails.id;
    }

    // Populate chart legend text
    document.getElementById("userStLegendDone").innerText = statusTaskArr[0];
    document.getElementById("userStLegendInprog").innerText = statusTaskArr[1];
    document.getElementById("userStLegendTodo").innerText = statusTaskArr[2];

    taskDialUserStats.destroy();


    taskDialUserStats = new Chart(dialCtxUserStats, {
        type: 'doughnut',

        data: {
            labels: ['To Do',
                'In Progress',
                'Completed'],
            datasets: [{
                data: statusTaskArr,
                backgroundColor: [
                    '#8e8e91',
                    '#eab385',
                    '#adda9d'
                ]
            }],
        },
        
        options: {
            rotation: -90,
            circumference: 180, 
            cutout: '80%',
            aspectRatio: 2,
    
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
}


// Filters for the All Tasks Table

// //on showall btn click will load all posts from db
// document.getElementById("userStats-type-showall-btn").addEventListener('click', (event) => {
//     document.querySelectorAll('.userStats-type-btns button').forEach(topic => topic.classList.remove('active'));
//     event.target.classList.add('active');
//     fetchUserTaskTable('', '', '');
// });

// //on techincal button clicked show all post with type of techincal
// document.getElementById('userStats-type-earliest-btn').addEventListener('click', (event) => {
//     document.querySelectorAll('.userStats-type-btns button').forEach(topic => topic.classList.remove('active'));
//     event.target.classList.add('active');
//     selectedType = 'earliest';
//     fetchUserTaskTable('', '', selectedType);
// });

// //on techincal button clicked show all post with type of non-techincal
// document.getElementById('userStats-type-high-btn').addEventListener('click', (event) => {
//     document.querySelectorAll('.userStats-type-btns button').forEach(topic => topic.classList.remove('active'));
//     event.target.classList.add('active');
//     selectedType = 'high';
//     fetchUserTaskTable('',selectedType,'');
// });

// //on techincal button clicked show all post with type of non-techincal
// document.getElementById('userStats-type-stuck-btn').addEventListener('click', (event) => {
//     document.querySelectorAll('.userStats-type-btns button').forEach(topic => topic.classList.remove('active'));
//     event.target.classList.add('active');
//     selectedType = 1;
//     fetchUserTaskTable(selectedType, '', '');
// });



//Delete User ===================================================================
const deleteUserModal = document.querySelector("#delete-user-modal");
const deleteUserBtn = document.querySelector('#deleteUserBtn');
const closeDeleteUserModal = deleteUserModal.querySelector('#delete-user-modal .close-modal-btn');


deleteUserBtn.addEventListener('click', () => {
  deleteUserModal.style.display = 'flex';
    })
    closeDeleteUserModal.addEventListener('click', () => {
      deleteUserModal.style.display = 'none';
    })


const deleteUserConfirmBtn = document.querySelector("#confirmDeleteUser");
deleteUserConfirmBtn.addEventListener('click', deleteUser); // Passes function to the event listener, but resetPassword() passess the result of function to event listener
// console.log(deleteUserConfirmBtn);

async function deleteUser() {
  // console.log("resetting");
  const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsDeleteUserQuery.php?ID=' + userDetails.id);
  // console.log("1: ", response);
  
  // Ensure the response is OK and return the JSON data 
  if (!response.ok) { 
      throw new Error('Network response was not ok ' + response.statusText);
  }
  // Convert the response to JSON format
  const data = await response.json();
  // console.log(data);

  sendToast(data.message);
  
  
}

// Reset password ===================================================================
const passwordResetModal = document.querySelector("#password-modal");
const passwordResetBtn = document.querySelector('#resetPassword');
const closePasswordResetModal = passwordResetModal.querySelector('#password-modal .close-modal-btn');


passwordResetBtn.addEventListener('click', () => {
  passwordResetModal.style.display = 'flex';
    })
    closePasswordResetModal.addEventListener('click', () => {
      passwordResetModal.style.display = 'none';
    })


const passwordResetConfirmBtn = document.querySelector("#confirmPWDreset");
passwordResetConfirmBtn.addEventListener('click', resetPassword); // Passes function to the event listener, but resetPassword() passess the result of function to event listener
// console.log(passwordResetConfirmBtn);

async function resetPassword() {
  // console.log("resetting");
  const response = await fetch('ManagerDash-Stats/userStatsPage-Queries/userStatsResetPwdQuery.php?ID=' + userDetails.id);
  // console.log("1: ", response);
  
  // Ensure the response is OK and return the JSON data 
  if (!response.ok) { 
      throw new Error('Network response was not ok ' + response.statusText);
  }
  // Convert the response to JSON format
  const data = await response.json();
  // console.log(data);

  sendToast(data.message);
  
  
}



// ========================================= FILTERS ========================================================================









// Listen for sessionStorage updates
let userId;
let projectID;
window.addEventListener("DOMContentLoaded", function () {

    const filterUserStatsTaskModal = document.querySelector('#mgrStatsUser-grid-container #filter-modal')
    document.querySelector('#mgrStatsUser-grid-container .projects-intro-buttons .order-by-dropdown select').value = 'None';
    filterUserStatsTaskModal.querySelector('.task-dropdown-priority #priority').value = 'All';
    filterUserStatsTaskModal.querySelector('.task-dropdown-date #date-task').value = 'All';
    filterUserStatsTaskModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";
      
  
    
    //Filters
    const filterAppliedMsg = document.querySelector('#mgrStatsUser-grid-container .filter-applied-msg');
    const filterRemoveBtn = document.querySelector('#mgrStatsUser-grid-container .remove-filters-btn');

    const applyFilterBtn = filterUserStatsTaskModal.querySelector('#add-filter-btn');
    // console.log(applyFilterBtn);
    applyFilterBtn.addEventListener('click', () => {
      const priorityValue = filterUserStatsTaskModal.querySelector('.task-dropdown-priority #priority').value;
      const dateValue = filterUserStatsTaskModal.querySelector('.task-dropdown-date #date-task').value;
      const stuckValue = filterUserStatsTaskModal.querySelector('.task-dropdown-stuck #stuck-task').value;
      const projValue = filterUserStatsTaskModal.querySelector('.task-dropdown-proj #user-proj').value;
      const dropdown = filterUserStatsTaskModal.querySelector('.task-dropdown-proj #user-proj')
      const projectName = dropdown.options[dropdown.selectedIndex].text;

      const filters = {priorityValue, dateValue, stuckValue, projValue};

      if (priorityValue === "All") {
        delete filters.priorityValue;
      }
      if (dateValue === "All") {
        delete filters.dateValue;
      }
      if (stuckValue === "All") {
        delete filters.stuckValue;
      }
      if (projValue === "All") {
        delete filters.projValue;
      }
      const orderByValue = document.querySelector('.projects-intro-buttons .order-by-dropdown select').value;
      if (orderByValue !== "None") {
        filters.orderByValue = orderByValue;
      } 

      filterAppliedMsg.style.display = 'block';
      if (projValue ==="ALL") {
        filterAppliedMsg.innerHTML = createFiltersMsgUser(filters);
        console.log("FILTERS",createFiltersMsgUser(filters))
        console.log("NOT MSG", filters)
      } else {
        filterAppliedMsg.innerHTML = createFiltersMsgUser(filters, projectName);
        console.log("FILTERS",createFiltersMsgUser(filters))
        console.log("NOT MSG", filters)
      }
      

      let filtersLength = Object.keys(filters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

      filterTaskModal.style.display = 'none';
    //   searchBarProject.value = "";

      getUserStatsTaskData(filters);
    })



    function getCurrentFilters() {
        const filterUserStatsTaskModal = document.querySelector('#mgrStatsUser-grid-container #filter-modal');
        const priorityValue = filterUserStatsTaskModal.querySelector('.task-dropdown-priority #priority').value;
        const dateValue = filterUserStatsTaskModal.querySelector('.task-dropdown-date #date-task').value;
        const stuckValue = filterUserStatsTaskModal.querySelector('.task-dropdown-stuck #stuck-task').value;
        const projValue = filterUserStatsTaskModal.querySelector('.task-dropdown-proj #user-proj').value;

        
        const filters = {priorityValue, dateValue, stuckValue, projValue};
      
        if (priorityValue === "All") {
          delete filters.priorityValue;
        }
        if (dateValue === "All") {
          delete filters.dateValue;
        }
        if (stuckValue === "All") {
          delete filters.stuckValue;
        }
        if (projValue === "All") {
          delete filters.projValue;
        }
      
        return filters;
      }

      
    //Order By Filters
    const orderByBtn = document.querySelector('#mgrStatsUser-grid-container .projects-intro-buttons .order-by-confirm');
    orderByBtn.addEventListener('click', () => {
      const orderByDropdownValue = document.querySelector('#mgrStatsUser-grid-container .projects-intro-buttons .order-by-dropdown select').value;
      const orderByParam = orderByDropdownValue !== "None" ? { orderByValue: orderByDropdownValue} : {};


      const currentFilters = getCurrentFilters();
      const allFilters = { ...currentFilters, ...orderByParam};


      filterAppliedMsg.style.display = 'block';
      filterAppliedMsg.innerHTML = createFiltersMsgUser(allFilters);

      let filtersLength = Object.keys(allFilters).length;
      if (filtersLength > 0) {
        filterRemoveBtn.style.display = 'flex';
      } else {
        filterRemoveBtn.style.display = 'none';
      }

    //   searchBarProject.value = "";

      getUserStatsTaskData(allFilters);
    })

    filterRemoveBtn.addEventListener('click', () => {
      console.log("clicked");
      filterAppliedMsg.innerHTML = "";
      filterAppliedMsg.style.display = 'none';
      filterRemoveBtn.style.display = 'none';
      // searchBarProject.value = "";
      document.querySelector('#mgrStatsUser-grid-container .projects-intro-buttons .order-by-dropdown select').value = "None";
      filterUserStatsTaskModal.querySelector('.task-dropdown-priority #priority').value = "All";
      filterUserStatsTaskModal.querySelector('.task-dropdown-date #date-task').value = "All";
      filterUserStatsTaskModal.querySelector('.task-dropdown-stuck #stuck-task').value = "All";

      getUserStatsTaskData({})
    })


  }
// }
);





function createFiltersMsgUser(filters, projectName = "") {
  let applied = [];
    if (filters.priorityValue && filters.priorityValue !== "All") {
      applied.push(filters.priorityValue + " Priority");
    }
    if (filters.dateValue && filters.dateValue !== "All") {
      applied.push("Due Date: " + filters.dateValue);
    }
    if (filters.projValue && filters.projValue !== "All") {
      applied.push("Selected Project: " + projectName);
    }
    if (filters.stuckValue && filters.stuckValue !== "All") {
      console.log("stck");
      if (filters.stuckValue === "Yes") {
        console.log("instck");

        applied.push("Show Stuck Tasks");
      } else {
        applied.push("Show Non-Stuck Tasks");
      }
    }
    if (filters.orderByValue && filters.orderByValue !== "None") {
      applied.push("Order By " + filters.orderByValue);
    }
    if (applied.length === 0) {
      return '';
    } else {
      return 'Filters Applied: ' + applied.join(', ');
    }
  }








// filter button
const filterTaskModal = document.querySelector("#mgrStatsUser-grid-container #filter-modal");
const filterTaskBtn = document.querySelector('#mgrStatsUser-grid-container  .filter-task-btn');
const closeFilterTaskModal = filterTaskModal.querySelector('#filter-modal .close-modal-btn');


filterTaskBtn.addEventListener('click', () => {
    filterTaskModal.style.display = 'flex';
    })
    closeFilterTaskModal.addEventListener('click', () => {
      filterTaskModal.style.display = 'none';
    })
  
  
  //Keyword Search
//   const searchBarProject = document.querySelector('#mgrStatsUser-grid-container .task-search #searched-task');
  
//   searchBarProject.addEventListener('input', ()=>{
//     const searchValue = searchBarProject.value.toLowerCase();
//     const allTasks = document.querySelectorAll('.kanban-content-project .kanban-card');
//     console.log(allTasks);
//     let foundTasks = 0;
  
//     allTasks.forEach(task => {
//       const taskTitle = task.getAttribute('data-task-title').toLowerCase();
  
  
//       if (taskTitle.includes(searchValue)) {
//         foundTasks++;
//         task.style.display = 'block';
//       } else {
//         task.style.display = 'none';
//       }
//     })
  
//     const cardCounts = {
//       "To Do": countBlockTasks("#mgrStatsUser-grid-container #kanban-to-do"),
//       "In Progress": countBlockTasks("#mgrStatsUser-grid-container #kanban-in-progress"),
//       "Completed": countBlockTasks("#mgrStatsUser-grid-container #kanban-completed")
//     };
//     changeProjectsCount(cardCounts);
  
  
//     if (foundTasks === 0) {
//       document.querySelector('#mgrStatsUser-grid-container .search-task-error-msg').style.display = 'block';
//     } else {
//       document.querySelector('#mgrStatsUser-grid-container .search-task-error-msg').style.display = 'none';
//     }
//   })