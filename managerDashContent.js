
// Populate project list and member list on load
document.addEventListener("DOMContentLoaded", function () {

    const projectList = document.getElementById("mdProjectList");
    for (let i=2; i<8; i++) {
        projectList.innerHTML += `
        <div class="mdListItem">
            <h3>Project #`+i+`</h3>
        </div>
        `;
    };

    const memberList = document.getElementById("mdMemberList");
    let memberArr = ["Harry Harrison","Greg McGregor","Ed Edwards","Jeff Jefferson","Tim Thompson"];
    let tasksArr = [4,6,3,2,5];
    let colourArr = ["#9F648F","#64649F","#9F6464","#869F64"];
    for (let i=0; i<5; i++) {

        // Assign each user portrait a colour based on the first letter of their name
        let nameNum = memberArr[i].charCodeAt(0);
        nameNum %= 4;
        let colour = colourArr[nameNum];

        memberList.innerHTML += `
            <div class="mdListItem">
                <div>
                    <div class="user" style="background-color:`+colour+`;">
                        <i class="fa fa-solid fa-user"></i>
                    </div>
                    <h3>`+memberArr[i]+`</h3>
                </div>
                <p>`+tasksArr[i]+` Tasks</p>
            </div>
        `
    };
});


// Project progress chart
const progressBar = document.getElementById("mdProgressBarChart");

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