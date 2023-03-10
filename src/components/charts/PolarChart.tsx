import * as chartjs from "chart.js";
import { ChartData, Polar } from "react-chartjs-2";

interface Props {
  labels: string[];
  data: number[];
  color: string[];
  title: string;
}

export function PolarChart({ labels, color, data, title }: Props): JSX.Element {
  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: color,
        borderWidth: 4,
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
    scale: {
      display: false,
    },
  };

  return <Polar data={chartData} options={chartOptions} />;
}
