document.getElementById("generate-btn").addEventListener("click", function() {
    var selectedKPIs = [];
    var checkboxes = document.getElementsByName("kpi");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedKPIs.push(checkboxes[i].value);
        }
    }

    if (selectedKPIs.length === 0) {
        alert("Please select at least one KPI.");
        return;
    }

    var csvContent = "data:text/csv;charset=utf-8,";
    // Add header row
    csvContent += selectedKPIs.join(",") + "\n";

/*  // Generate random data for each KPI
    for (var j = 0; j < 5; j++) { // Generating 5 rows for demonstration
        var rowData = [];
        for (var k = 0; k < selectedKPIs.length; k++) {
            // Generating random values (replace with actual data)
            var randomValue = Math.floor(Math.random() * 100);
            rowData.push(randomValue);
        }
        csvContent += rowData.join(",") + "\n";
    }
*/
    // Create a link element to initiate the download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "net_profit.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();
});