const progressBar = document.getElementById("progressBarChart");

new Chart(progressBar, {
    type: 'doughnut',
    data: {
        labels: ['Done',
            'In Progress',
            'Overdue',
            'Not Started'],
        datasets: [{
            data: [5,7,3,4],
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
        },  
        responsive: true
    }
});