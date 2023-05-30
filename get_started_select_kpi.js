document.getElementById("select-btn").addEventListener("click", function() {
    var selectedKPI = "";
    var radioButtons = document.getElementsByName("kpi");
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedKPI = radioButtons[i].value;
            break;
        }
    }

    if (selectedKPI === "") {
        alert("Please select a KPI.");
        return;
    }

    // Redirect to the selected KPI page
    window.location.href = selectedKPI;
});