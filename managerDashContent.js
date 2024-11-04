
//--------------------------FUNCTIONS-----------------------

// Function to make contribution graph vertical/horizontal based on viewport size
function updateContributionGraphAxes() {
    let clientWidth = document.documentElement.clientWidth;
    let containerWidth = document.getElementById("mdContributionGraphContainer").clientWidth;
    let containerHeight = document.getElementById("mdContributionGraphContainer").clientHeight;
    let span = memberArr.length * 50;
    if (clientWidth <= 992) {
        contributionGraph.resize(containerWidth, span*0.8);
        if (contributionGraph.options.indexAxis == 'x') {
            contributionGraph.options.indexAxis = 'y';
            contributionGraph.options.scales = {
                x: {
                    stacked: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                }
            }
        }
    }

    else if (clientWidth > 992) {
        contributionGraph.resize(span, containerHeight*0.95);
        if (contributionGraph.options.indexAxis == 'y') {
            contributionGraph.options.indexAxis = 'x';
            contributionGraph.options.scales = {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    }
    contributionGraph.update();
};

// Function to get an array of employee initials for the contribution graph
function getEmployeeInitials(arr) {
    let initalArr = [];
    for (let i=0; i<arr.length; i++) {
        let firstInitial = arr[i][0];
        let surnamePos = arr[i].indexOf(" ") + 1;
        let secondInitial = arr[i][surnamePos];
        initalArr.push(firstInitial+secondInitial);
    }
    return initalArr;
}


//----------------------------------DATA-----------------------------

// Dummy project data
let creator = "Sunita Markey";
let projectDates = ["25/09/2024", "04/11/2024"];
let memberArr = ["Nediljko Saldis", "Reza Sigrid","Indra Vogel","Kristin Bellandini",
    "Patricija Esser","Pryderi Holland", "Xoán Noel", "Mariann Bazzoli", "Moira Wirth",
    "Dunstan Thorn", "Priscilla Sancho", "Eléonore Franke", "Aslanbek Ó Marcaigh",
    "Billie Veres", "Alexandra Lozano", "Florinus Chilikov"];
let tasksArr = [[1,0,2,1,0,1,2,3,1,0,4,1,0,2,0,0],[0,1,2,0,3,1,2,3,1,0,3,1,2,1,0,1],
[2,0,0,1,0,1,2,1,0,4,2,1,3,2,1,0],[1,0,1,2,0,0,1,2,0,1,0,1,3,2,1,4]];
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


//----------------------------CHARTS-----------------------------

// Project progress chart
const progressBar = document.getElementById("mdProgressChart");

const progressBarChart = new Chart(progressBar, {
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
            },
        },
        rotation: -90,
        circumference: 180, 
        cutout: '80%',
        responsive: true,
        aspectRatio: 2
    }
});


// Member contribution graph

const contribution = document.getElementById("mdContributionGraph");

const contributionGraph = new Chart(contribution, {
    type: "bar",
    data: {
        labels: getEmployeeInitials(memberArr),
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
        indexAxis: 'x',
        maintainAspectRatio: false,
        responsiveAnimationDuration: 0,

        plugins: {
            legend: {
                display: true
            },
            ticks: {
                font: {
                    family: 'Avenir Next'
                }
            },
            tooltip: {
                callbacks: {
                    title: (TooltipItem) => {
                        let pos = TooltipItem[0].dataIndex;
                        return memberArr[pos];
                    }
                }
            }
        },

        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false
                },
                ticks: {
                    minRotation: 0,
                    maxRotation: 0,
                    font: {
                        family: 'Avenir Next'
                    }
                }
            },
            y: {
                stacked: true,
                ticks: {
                    stepSize: 1,
                    font: {
                        family: 'Avenir Next'
                    }
                }
            }
        }
    }
});


//----------------------EVENT LISTENERS-------------------------

// On load
document.addEventListener("DOMContentLoaded", () => {

    // Populate project list
    const projectList = document.getElementById("mdProjectList");
    for (let i=1; i<10; i++) {

        let active = "";
        let icon = "";
        let stuck = "";
        if (i == 1) {
            active = `mdActive`;
            icon = `<i class="mdArrowIcon fa fa-solid fa-arrow-right"></i>`;
            document.getElementById("mdSelectedProjectName").innerText = "Project #" + i;
        }
        else {
            icon = `<i class="mdArrowIcon mdHidden fa fa-solid fa-arrow-right"></i>`
        }

        projectList.innerHTML += `
        <div class="mdListItem mdProjectItem `+active+`">
            <h3>Project #`+i+`</h3>
            `+icon+`
        </div>
        `;
    };

    // Make projects clickable
    const projects = document.querySelectorAll(".mdProjectItem");
    const arrows = document.querySelectorAll(".mdArrowIcon");
    projects.forEach(project => {
        project.addEventListener("click", () => {

            projects.forEach(project => {
                project.classList.remove("mdActive");
            })

            arrows.forEach(icon => {
                icon.classList.add("mdHidden");
            })

            project.classList.add("mdActive");
            project.querySelector(".mdArrowIcon").classList.remove("mdHidden");

            const projectNameText = document.getElementById("mdSelectedProjectName");
            const projectSelected = project.firstElementChild;
            projectNameText.innerText = projectSelected.innerText;
        });
    });

    // Populate project info
    document.getElementById("mdProjectCreationDateText").innerText = "Created: "+projectDates[0];
    document.getElementById("mdProjectDeadlineDateText").innerText = "Deadline: "+projectDates[1];
    document.getElementById("mdProjectCreatorText").innerText = "Created by: "+creator;
    document.getElementById("mdTeamLeaderText").innerText = "Team Leader: "+memberArr[0];
    document.getElementById("mdProjectMemberCountText").innerText = memberArr.length+" Members";

    // Make team members box header show number of members
    document.getElementById("mdProjectMembersBoxText").innerText = "Team Members ("+memberArr.length+")";

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
            leaderIcon = `<i class="fa fa-solid fa-crown fa-sm"></i>`;
        }

        // Add some stuck indicators
        let stuckIcon = "";
        if ([0,3,5,8,14].includes(i)) {
            stuckIcon = `<i class="mdStuck fa fa-solid fa-circle-exclamation"></i>`;
        }

        memberList.innerHTML += `
            <div class="mdListItem">
                <div>
                    <div class="user" style="background-color:`+colour+`;">
                        <i class="fa fa-solid fa-user"></i>
                    </div>
                    <h4>`+memberArr[i]+`</h4>
                    `+leaderIcon+stuckIcon+`
                </div>
                <p>`+taskNum+` Tasks</p>
            </div>
        `;
    };

    // Add modal for viewing task to each stuck indicator
    const stuckIcons = document.querySelectorAll(".mdStuck");
    stuckIcons.forEach(btn => {

        const viewStuckModal = document.createElement('div');
        viewStuckModal.classList.add('modal', 'view-task-modal')
        viewStuckModal.innerHTML = `
            <div class="modal-box view-task-modal-box">
                    <!--Header-->
                    <div class="modal-header">
                        <p class="modal-task-title">Stuck Task</p>
                        <div class="close-modal-btn">
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <!--Body-->
                    <div class="modal-body">
                        <p class="modal-task-description">This is the task description.
                        It describes the task. This is the task description.
                        It describes the task. This is the task description.
                        It describes the task. This is the task description.
                        It describes the task. This is the task description.
                        It describes the task.</p>

                        <div class="modal-task-info">
                            <div class="modal-task-info-section-top">
                                <p class="task-modal-title">Status</p>
                                <div class="status-box">
                                    <div class="task-indicator-circle"></div>
                                    <p>To Do</p>
                                </div>
                            </div>

                            <div class="modal-task-info-section-top">
                                <p class="task-modal-title">Priority</p>
                                <div class="priority-box">
                                    <div class="task-indicator-circle"></div>
                                    <p>High Priority</p>
                                </div>
                            </div>

                            <div class="modal-task-info-section-top">
                                <p class="task-modal-title">Assigned to</p>
                                <p>A Project Member</p>
                            </div>
                        </div>


                        <div class="modal-task-info">
                            <div class="modal-task-info-section">
                                <div class="modal-task-info-section-header">
                                    <i class="fa fa-solid fa-user"></i>
                                    <p>Created by</p>
                                </div>
                                <div class="modal-task-info-section-body">
                                    <p>John Little</p>
                                </div>
                            </div>

                            <div class="modal-task-info-section">
                                <div class="modal-task-info-section-header">
                                    <i class="fa fa-regular fa-calendar"></i>
                                    <p>Due date</p>
                                </div>
                                <div class="modal-task-info-section-body modal-task-due-date">
                                    <div class="task-indicator-circle"></div>
                                    <p>03/11/2024</p>
                                </div>
                            </div>

                            <div class="modal-task-info-section">
                                <div class="modal-task-info-section-header">
                                    <i class="fa fa-solid fa-user"></i>
                                    <p>Reassign</p>
                                </div>
                                <div class="modal-task-info-section-body">
                                    <p>Choose</p>
                                </div>
                            </div>
                        </div>

                        <div class="modal-task-attachments">
                            <p class="task-modal-title">Attachments</p>
                            <div class="modal-task-attachments-box"></div>
                        </div>

                        <div class="modal-task-btns">
                            <div class="left-arrow">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                            <div class="delete-task">
                                <p>Delete</p>
                            </div>
                            <div class="save-task">
                                <p>Save Changes</p>
                            </div>
                            <div class="right-arrow">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div> 
                    </div>
                </div>
            `;

        document.body.appendChild(viewStuckModal);

        const closeviewStuckModal = viewStuckModal.querySelector('.close-modal-btn')

        btn.addEventListener('click', () => {
        viewStuckModal.style.display = 'flex';
        })
        closeviewStuckModal.addEventListener('click', () => {
        viewStuckModal.style.display = 'none';
        })
        window.addEventListener('click', (e) => {
        if (e.target == viewStuckModal) {
            viewStuckModal.style.display = 'none';
        }
        })
    });
});
    
window.addEventListener("load", () => {
    // Make contribution bar chart start vertical/horizontal based on viewport
    updateContributionGraphAxes();
});

// Make contribution bar chart stack vertically on small viewports
// The resize event doesn't fire when a browser is maximised/minimised/restored
// so the chart can be too big/too small when this happens
// however the container overflows so this works
window.addEventListener("resize", () => {
    updateContributionGraphAxes();
});