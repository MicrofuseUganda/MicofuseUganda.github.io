let data1 = [];
let data2 = [];
let currentChartType = 'line';
let currentChart;

function parseCSV(csv) {
    const lines = csv.split('\n');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line) {
            const values = line.split(',');
            const label = values[0].trim();
            const value = parseFloat(values[1].trim());

            data.push({ label, value });
        }
    }

    return data;
}

function loadData() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];

    if (file1 && file2) {
        Promise.all([readFile(file1), readFile(file2)])
            .then(results => {
                const contents1 = results[0];
                const contents2 = results[1];

                data1 = parseCSV(contents1);
                data2 = parseCSV(contents2);

                drawChart();
            })
            .catch(error => {
                console.error('Error loading files:', error);
            });
    }
}

function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            resolve(e.target.result);
        };

        reader.onerror = (e) => {
            reject(new Error('Error reading file'));
        };

        reader.readAsText(file);
    });
}

function switchToLineChart() {
    currentChartType = 'line';
    drawChart();
}

function switchToBarChart() {
    currentChartType = 'bar';
    drawChart();
}

function drawChart() {
    const labels = data1.map(item => item.label);
    const values1 = data1.map(item => item.value);
    const values2 = data2.map(item => item.value);

    const ctx = document.getElementById('chartCanvas').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    if (currentChartType === 'line') {
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'File 1',
                        data: values1,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false
                    },
                    {
                        label: 'File 2',
                        data: values2,
                        borderColor: 'rgba(192, 75, 75, 1)',
                        fill: false
                    }
                ]
            }
        });
    } else if (currentChartType === 'bar') {
        currentChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'File 1',
                        data: values1,
                        backgroundColor: 'rgba(75, 192, 192, 0.8)'
                    },
                    {
                        label: 'File 2',
                        data: values2,
                        backgroundColor: 'rgba(192, 75, 75, 0.8)'
                    }
                ]
            }
        });
    }
}