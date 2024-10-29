

// Dummy employee task data ADD DATA FOR JOHN LITTLE
let memberArr = ["John Little", "Harry Harrison","Greg McGregor","Ed Edwards","Jeff Jefferson","Tim Thompson"];
let tasksArr = [[1,0,3,1],[1,1,1,1],[2,2,1,1],[1,0,1,1],[1,0,0,1],[1,1,1,2]];

// Populate project list and member list on load
document.addEventListener("DOMContentLoaded", function () {

    const projectList = document.getElementById("mdProjectList");
    for (let i=1; i<memberArr.length; i++) {

        let active = "";
        let arrow = "";
        if (i == 1) {
            active = `mdActive`;
            arrow = `<i class="fa fa-solid fa-arrow-right"></i>`;
        }

        projectList.innerHTML += `
        <div class="mdListItem `+active+`">
            <h3>Project #`+i+`</h3>
            `+arrow+`
        </div>
        `;
    };



    const memberList = document.getElementById("mdMemberList");
    // User colours
    let colourArr = ["#9F648F","#64649F","#9F6464","#869F64"];
    for (let i=0; i<memberArr.length; i++) {

        // Assign each user portrait a colour based on the first letter of their name
        let nameNum = memberArr[i].charCodeAt(0);
        nameNum %= 4;
        let colour = colourArr[nameNum];
        let taskNum = 0;
        
        // Add up total tasks
        for (let j=0; j<4; j++) {
            taskNum += tasksArr[i][j];
        }

        // Display crown for team leader
        let leaderIcon = "";
        if (i == 0) {
            leaderIcon = ` <i class="fa fa-solid fa-crown fa-sm"></i>`;
        }

        memberList.innerHTML += `
            <div class="mdListItem">
                <div>
                    <div class="user" style="background-color:`+colour+`;">
                        <i class="fa fa-solid fa-user"></i>
                    </div>
                    <h4>`+memberArr[i]+`</h4>
                    `+leaderIcon+`
                </div>
                <p>`+taskNum+` Tasks</p>
            </div>
        `
    };
});


// Project progress chart
const progressBar = document.getElementById("mdProgressChart");

new Chart(progressBar, {
    type: 'doughnut',
    data: {
        labels: ['Done',
            'In Progress',
            'Overdue',
            'Not Started'],
        datasets: [{
            data: [5,7,4,4],
            backgroundColor: [
                '#adda9d',
                '#e9b385',
                '#e38c88',
                '#c1c1c1'
            ]
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        hover: {
            mode: null
        },
        rotation: -90,
        circumference: 180, 
        cutout: '80%',
        responsive: true,
        aspectRatio: 2
    }
});


// Get dataset of each task type across all employees
let doneTasks = [];
let inProgressTasks = [];
let overdueTasks = [];
let notStartedTasks = [];
for (let i=0; i<tasksArr.length; i++) {
    doneTasks.push(tasksArr[i][0]);
    inProgressTasks.push(tasksArr[i][1]);
    overdueTasks.push(tasksArr[i][2]);
    notStartedTasks.push(tasksArr[i][3]);
}

// Member contribution graph

const contributionGraph = document.getElementById("mdContributionGraph");

new Chart(contributionGraph, {
    type: "bar",
    data: {
        labels: memberArr,
        datasets: [
            {
                label: 'Done',
                data: doneTasks,
                backgroundColor: '#adda9d'
            },
            {
                label: 'In Progress',
                data: inProgressTasks,
                backgroundColor: '#e9b385'
            },
            {
                label: 'Overdue',
                data: overdueTasks,
                backgroundColor: '#e38c88'
            },
            {
                label: 'Not Started',
                data: notStartedTasks,
                backgroundColor: '#c1c1c1'
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        }
    }
});