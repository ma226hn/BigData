
const mySelect = document.getElementById('mySelect')
const country = document.getElementById('country')
// select the name of the country and change the URL
mySelect?.addEventListener('change', function() {
  
  const selectedValue = mySelect.value;
  
  country.href = `./search?name=${selectedValue}`;
  console.log(country.href)
});

// function to add listner to showchart button
 document.getElementById('showChart')?.addEventListener('click',function() {

    // get the data from dataView by adding data to div 
    const data = document.getElementById('dataDiv')?.innerText
    const dataObj= JSON.parse(data)
    const query = document.getElementById('query').innerText
    const queryObj= JSON.parse(query)
    
    let chartData = {}
      
    if (queryObj.name ) {
      chartData = {
      labels: dataObj.map(element => element._source.year),
       datasets: [{
        label: 'value',
         data: dataObj.map(element => element._source.value_$),
    
      
        backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    };
 }
 else { 
      chartData = {
       labels: dataObj.map(element => element._source.name),
       datasets: [{
        label: 'value',
         data: dataObj.map(element => element._source.value_$),
    
        backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    };
        }
    const chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
   

    // chart show
  const canvas = document.getElementById('myChart')
  const chart = Chart.getChart(canvas);
  if (chart) {
    chart.destroy();
  }
  const myChart = new Chart(canvas, {
       type: 'bar',
       data: chartData,
       options: chartOptions
     })
    console.log(data)
  });
