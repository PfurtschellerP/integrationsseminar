const myChartObjectScatter = document.getElementById(
  'stockPriceToCompanyTweetsScatter'
);

const chartDataScatter = {
  labels: data.companyNameMentions,
  datasets: [
    {
      label: 'Stock Price (y) in combination with the twitter mentions (x)',
      data: data.stockPrice,
      yAxisID: 'y',
    },
  ],
};

const scatterPlot = new Chart(myChartObjectScatter, {
  type: 'scatter',
  data: chartDataScatter,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  },
});
