"use client";
import { useEffect } from "react"
import { Chart } from "chart.js";
function Barchart({ title, labels, barData}) {
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: barData,
                borderWidth: 2
            },
        });
    }, []);

    return (
        <>
            {/* Bar chart */}
            <h1 className="mx-auto mt-10 text-xl font-semibold capitalize ">{title}</h1>
            <div className="flex mx-auto">
                <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit shadow-xl'>
                    <canvas id='myChart'></canvas>
                </div>
            </div>
        </>
    )
}

export default Barchart;