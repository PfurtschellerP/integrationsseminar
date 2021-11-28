const myChartObject = document.getElementById('stockPriceToCompanyTweets');

const chartData = {
  labels: data.time,
  datasets: [
    {
      label: 'Stock Prices',
      data: data.stockPrice,
      yAxisID: 'y',
    },
    {
      label: 'Tweets about the company',
      data: data.companyNameMentions,
      borderColor: '#2563eb',
      yAxisID: 'y1',
    },
  ],
};

const myChart = new Chart(myChartObject, {
  type: 'line',
  data: chartData,
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
      },
    },
  },
});
