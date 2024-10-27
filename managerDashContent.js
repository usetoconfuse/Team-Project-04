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