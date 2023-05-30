function handleGraph() {
    const fileInput = document.getElementById('customInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            const data = parseCSV(contents);

            // Delay chart creation to ensure the data is ready
            setTimeout(() => {
                createLineGraph(data);
            }, 100);
        };

        reader.readAsText(file);
    }
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line) {
            const values = line.split(',');
            const label = values[0].trim();
            const value = parseFloat(values[1]);

            data.push({ label, value });
        }
    }

    return data;
}

function createLineGraph(data) {
    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);

    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Line Graph',
                data: values,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function handleFile() {
    const fileInput = document.getElementById('customInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            const data = parseCSV(contents);

            // Update custom input text with the selected file name
            const fileName = file.name;
            const customInputText = document.getElementById('customInputText');
            customInputText.textContent = `Selected File: ${fileName}`;
        };

        reader.readAsText(file);
    }
}