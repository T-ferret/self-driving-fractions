// chart.js

// import Chart from 'chart.js/auto';  // Chart.js의 최신 버전을 사용하려면 이와 같이 import

function createChart(ctx, type, data, yMin, yMax, title) {
    return new Chart(ctx, {
        type: type,
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    suggestedMin: yMin,
                    suggestedMax: yMax
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

const turb_ctx = document.getElementById('myWaterTurbChart');
const chart_type = 'line';
const turb_data = {
    labels: ['1', '2', '3', '4'],
    datasets: [
        {
            label: '물의 탁도',
            data: [5.9, 5.3, 4.5, 3.3],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ]
};

const temp_ctx = document.getElementById('myWaterTempChart');
const temp_data = {
    labels: ['1', '2', '3', '4'],
    datasets: [
        {
            label: '수온',
            data: [22.4, 23.2, 22.6, 22.5],
            borderColor: 'rgba(80, 100, 255, 1)',
            backgroundColor: 'rgba(80, 100, 255, 0.5)',
        }
    ]
};

export var turbChart = createChart(turb_ctx, chart_type, turb_data, 3.0, 6.0, '물의 탁도');
export var tempChart = createChart(temp_ctx, chart_type, temp_data, 21.0, 24.0, '수온');