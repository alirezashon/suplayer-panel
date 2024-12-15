'use client'
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
          datasets: [
            {
              label: "سبز",
              data: [150, 300, 200, 300, 150, 180],
              backgroundColor: "#00B050", // Green color
              barPercentage: 0.6,
              borderRadius: 4,
            },
            {
              label: "قرمز",
              data: [100, 250, 150, 250, 100, 130],
              backgroundColor: "#E74C3C", // Red color
              barPercentage: 0.6,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }, // Hide legends
            tooltip: { enabled: true },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#666", font: { family: "IRANSans", size: 12 } },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 100,
                color: "#666",
                font: { family: "IRANSans", size: 12 },
              },
              grid: { color: "#EAEAEA" },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 flex justify-center items-center p-6 min-h-screen">
      <div className="w-11/12 md:w-4/5 lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
        <h4 className="text-right text-gray-700 text-lg font-bold mb-4">
          گزارش کیف پول 📊
        </h4>
        <div className="h-80">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
