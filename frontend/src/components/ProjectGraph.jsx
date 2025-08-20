import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function ProjectGraph({ stats }) {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Drywall Jobs",
                data: [
                    stats ? stats.januaryProjects : 0, // January Projects
                    stats ? stats.februaryProjects : 0, // February Projects
                    stats ? stats.marchProjects : 0,
                    stats ? stats.aprilProjects : 0,
                    stats ? stats.mayProjects : 0,
                    stats ? stats.juneProjects : 0,
                    stats ? stats.julyProjects : 0,
                    stats ? stats.augustProjects : 0,
                    stats ? stats.septemberProjects : 0,
                    stats ? stats.octoberProjects : 0,
                    stats ? stats.novemberProjects : 0,
                    stats ? stats.decemberProjects : 0
                ],
                borderColor: "#920B15",
                backgroundColor: "rgba(146,11,21,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#920B15"
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide legend for cleaner look
            },
            title: {
                display: true,
                text: "Drywall Jobs by Month",
                align: "start",
                padding: {
                    bottom: 20
                },
                font: {
                    size: 16,
                    weight: "600",
                },
                color: "black"
            },
            tooltip: {
                mode: 'index',
                intersect: false
            },
        },
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    color: "#e5e7eb", // light gray grid lines
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: "#e5e7eb",
                },
                ticks: {
                    epSize: 10, // Adjust as needed
                },
            },
        },
    };

    return (
        <div className="h-78 bg-white mt-6 ml-6 mr-10 rounded-xl p-4">
            <Line data={data} options={options} />
        </div>
    );
}
