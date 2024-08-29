"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";
function Linechart({ chartId, title, labels, graphData}) {
    useEffect(() => {
        if (document.getElementById(chartId)) {
            var ctx = document.getElementById(chartId).getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: graphData,
                    fill: false,
                    tension: 0.1
                },
            });
        }
    }, []);

    return (
        <>
            {/* Line chart */}
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">{title}</h1>
            <div className="flex mx-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit shadow-xl'>
                    <canvas id={chartId}></canvas>
                </div>
            </div>
        </>
    )
}

export default Linechart;