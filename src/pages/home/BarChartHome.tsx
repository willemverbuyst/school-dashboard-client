import * as chartjs from "chart.js";
import { Bar, ChartData } from "react-chartjs-2";

export function BarChartHome(): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: ["Welcome", "to", "your", "dashboard"],
    datasets: [
      {
        data: [80, 56, 67, 45],
        backgroundColor: ["#FF2694", "#FF2694", "#FF2694", "#FF2694"],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions: chartjs.ChartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: false,
    },
    responsive: true,
    title: { display: true },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
            beginAtZero: true,
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontSize: 18,
            padding: 0,
            fontColor: "#000",
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
