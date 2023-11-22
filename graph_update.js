export function addData(chart, label, newData) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(newData);
    });
    chart.update();
}

export function removeData(chart) {
    chart.data.labels.splice(0, 1);
    //chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        // dataset.data.pop();
        dataset.data.splice(0, 1);
    })
    chart.update()
}