//Created by Quinn Little 07/02/2025

//TEST DATA CHART

const xValues = [50,60,70,80,90,100,110,120,130,140,150];
const yValues = [7,8,8,9,9,9,10,11,14,14,15];

weekhrs = document.getElementById('userStats-weekHrsContainerGraph');

const weekhrsansd = new Chart(weekhrs, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor:"rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options:{
  responsive: true,
  }
});




