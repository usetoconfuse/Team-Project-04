

// Dummy employee task data
let memberArr = ["John Little", "Harry Harrison","Greg McGregor","Ed Edwards","Jeff Jefferson","Tim Thompson"];
let tasksArr = [[1,0,2,1,0,1],[0,1,2,0,3,1],[2,0,0,1,0,1],[1,0,1,2,0,0]];
let doneTotal = 0;
let inProgressTotal = 0;
let overdueTotal = 0;
let notStartedTotal = 0;

for (let i=0; i<memberArr.length; i++) {
    doneTotal += tasksArr[0][i];
    inProgressTotal += tasksArr[1][i];
    overdueTotal += tasksArr[2][i];
    notStartedTotal += tasksArr[3][i];
}

// User colours
let colourArr = ["#9F648F","#64649F","#9F6464","#869F64"];

// On load
document.addEventListener("DOMContentLoaded", function () {

    // Populate project list
    const projectList = document.getElementById("mdProjectList");
    for (let i=1; i<10; i++) {

        let active = "";
        let arrow = "";
        if (i == 1) {
            active = `mdActive`;
            arrow = `<i id="mdArrow" class="fa fa-solid fa-arrow-right"></i>`;
        }

        projectList.innerHTML += `
        <div class="mdListItem mdProjectItem `+active+`">
            <h3>Project #`+i+`</h3>
            `+arrow+`
        </div>
        `;
    };

    // Make projects clickable
    const projects = document.querySelectorAll(".mdProjectItem");
    projects.forEach(project => {
        project.addEventListener("click", () => {

            projects.forEach(project => {
                project.classList.remove('mdActive');
            })
            document.getElementById("mdArrow").remove();

            project.classList.add('mdActive');
            project.innerHTML += `<i id="mdArrow" class="fa fa-solid fa-arrow-right"></i>`;

            const projectNameText = document.getElementById("mdSelectedProjectName");
            const projectSelected = project.firstElementChild;
            projectNameText.innerText = projectSelected.innerText;
        });
    });

    // Calculate progress completion percentage
    const progressText = document.getElementById("mdProgressPercentageText");

    let totalTasks = doneTotal + inProgressTotal + overdueTotal + notStartedTotal;
    let percentage = Math.round((doneTotal*100) / totalTasks);
    
    progressText.innerText = percentage + "%";

    // Populate progress bar legend
    document.getElementById("mdLegendDoneText").innerText = doneTotal;
    document.getElementById("mdLegendInProgressText").innerText = inProgressTotal;
    document.getElementById("mdLegendOverdueText").innerText = overdueTotal;
    document.getElementById("mdLegendNotStartedText").innerText = notStartedTotal;

    // Populate member list
    const memberList = document.getElementById("mdMemberList");
    for (let i=0; i<memberArr.length; i++) {

        // Assign each user portrait a colour based on the first letter of their name
        let nameNum = memberArr[i].charCodeAt(0);
        nameNum %= 4;
        let colour = colourArr[nameNum];
        
        // Add up total tasks
        let taskNum = 0;
        for (let j=0; j<4; j++) {
            taskNum += tasksArr[j][i];
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
        `;
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
            data: [doneTotal,inProgressTotal,overdueTotal,notStartedTotal],
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
            /* tooltip: {
                enabled: false
            }*/
        },
        /* hover: {
            mode: null
        }, */
        rotation: -90,
        circumference: 180, 
        cutout: '80%',
        responsive: true,
        aspectRatio: 2
    }
});


// Member contribution graph

const contributionGraph = document.getElementById("mdContributionGraph");

new Chart(contributionGraph, {
    type: "bar",
    data: {
        labels: memberArr,
        datasets: [
            {
                label: 'Done',
                data: tasksArr[0],
                backgroundColor: '#adda9d'
            },
            {
                label: 'In Progress',
                data: tasksArr[1],
                backgroundColor: '#e9b385'
            },
            {
                label: 'Overdue',
                data: tasksArr[2],
                backgroundColor: '#e38c88'
            },
            {
                label: 'Not Started',
                data: tasksArr[3],
                backgroundColor: '#c1c1c1'
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            ticks: {
                font: {
                    family: 'Avenir Next'
                }
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true
            }
        },
        responsive: true,
        indexAxis: 'y'
    }
});