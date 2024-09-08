import "./TaskChart.css";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";

// CHART MODIFICATIONS
const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
                color: "#000",
            },
        },
        x: {
            grid: {
                color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
                color: "#000",
            },
        },
    },
    plugins: {
        legend: {
            display: true,
            position: "top",
            labels: {
                color: "#000",
                font: {
                    size: 14,
                },
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            titleColor: "#000",
            bodyColor: "#000",
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
        }
    },
};

const TaskChart = ({ scoreObj }) => {
    const scoreData = scoreObj && scoreObj.slice(-10);
        
    
    const label = scoreObj && scoreData.map((item) => {
            const dates = new Date(item.date);
            const formattedDate = dates.toISOString().split("T")[0];
            return formattedDate;
        });

    const score = scoreObj && scoreData.map((item) => item.score);

    const data = {
        labels: label,
        datasets: [
            {
                label: "Productivity Score",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(0, 0, 0, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(0, 0, 0, 1)",
                data: score,
            },
        ],
    };
    return (
        <div className="chart-container">
            <Line data={data} options={options} />
        </div>
    );
};

export default TaskChart;
