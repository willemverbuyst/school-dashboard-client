import * as chartjs from "chart.js";
import { ChartData, Pie } from "react-chartjs-2";

interface Props {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
}

export function PieChart({
  labels,
  data,
  color,
  title = "",
}: Props): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 0,
      },
    ],
  };
  const chartOptions: chartjs.ChartOptions = {
    tooltips: { enabled: false },
    legend: {
      display: true,
      position: "bottom",
      labels: { fontSize: 12 },
    },
    responsive: true,
    title: { text: title, display: true, padding: 15, fontSize: 14 },
  };

  return <Pie data={chartData} options={chartOptions} />;
}
