<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test graph</title>
   
</head>
<body>


<div>
  <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>



<script>
  const ctx = document.getElementById('myChart');

  const data = {
    datasets:{
        label: 'Sales',
        data:[
            {x: '2021-06-25', y: 20},
            {x: '2021-06-26', y: 22},
            {x: '2021-06-27', y: 23},
            {x: '2021-06-28', y: 24},
            {x: '2021-06-29', y: 25},
            {x: '2021-06-30', y: 26},
            {x: '2021-07-1', y: 29}
        ]
    }
  };

  const config = {
    type:'bar',
    data,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
  };

  const myChart = new Chart(
    ctx,
    config
  );

  
</script>

</body>
</html>


