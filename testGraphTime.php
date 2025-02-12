
<!-- 
  const data = {
    datasets:{
        label: 'Sales',
        data:[
            
        ]
    }
  }; -->




<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Getting Started with Chart JS with www.chartjs3.com</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
      .chartMenu {
        width: 100vw;
        height: 40px;
        background: #1A1A1A;
        color: rgba(54, 162, 235, 1);
      }
      .chartMenu p {
        padding: 10px;
        font-size: 20px;
      }
      .chartCard {
        width: 100vw;
        height: calc(100vh - 40px);
        background: rgba(54, 162, 235, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .chartBox {
        width: 80%;
        padding: 20px;
        border-radius: 20px;
        border: solid 3px rgba(54, 162, 235, 1);
        background: white;
      }
    </style>
  </head>
  <body>
    <div class="chartMenu">
      <p>WWW.CHARTJS3.COM (Chart JS <span id="chartVersion"></span>)</p>
    </div>
    <div class="chartCard">
      <div class="chartBox">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script> <!-- Gets Dates -->

    <script>
      


  function createGantt(dataset) {
    // setup 
    const data = {
      // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    // Instantly assign Chart.js version
    const chartVersion = document.getElementById('chartVersion');
    chartVersion.innerText = Chart.version;
  }

  
  async function fetchProjTimeGraph() {

    const userID = '41';
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
        // console.log(data);

        if (data.length > 0) {
            console.log(data);
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
                console.log(dataset);
                createGantt(dataset);
  
        } else {
           // createTaskStatusGraph([0,0,0,0]); // I.e. no tasks for that employee
        }
      } catch (error) {
          console.error('Error:', error); // Log any errors that occur
      }
      
        

      }
      fetchProjTimeGraph();

    </script>

  </body>
</html>