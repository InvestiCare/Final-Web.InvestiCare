document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculate-btn").addEventListener("click", function () {
        let monthlyIncome = parseFloat(document.getElementById("monthly-income").value);
        let calculationPeriod = parseFloat(document.getElementById("calculation-period").value);

        if (isNaN(monthlyIncome) || isNaN(calculationPeriod)) {
            alert("Please enter valid numbers!");
            return;
        }

        let months = calculationPeriod * 12;
        let totalIncome = monthlyIncome * months;
        let needs = totalIncome * 0.50;
        let wants = totalIncome * 0.30;
        let savings = totalIncome * 0.20;

        document.getElementById("total-income").textContent = `Total Income: ₹${totalIncome.toFixed(2)}`;
        document.getElementById("needs").textContent = `Needs (50%): ₹${needs.toFixed(2)}`;
        document.getElementById("wants").textContent = `Wants (30%): ₹${wants.toFixed(2)}`;
        document.getElementById("savings").textContent = `Savings & Investments (20%): ₹${savings.toFixed(2)}`;

        updateChart(needs, wants, savings);
    });

    function updateChart(needs, wants, savings) {
        let ctx = document.getElementById("savingsChart").getContext("2d");

        if (window.savingsChartInstance) {
            window.savingsChartInstance.destroy();
        }

        window.savingsChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Needs (50%)", "Wants (30%)", "Savings & Investments (20%)"],
                datasets: [{
                    data: [needs, wants, savings],
                    backgroundColor: ["#FF6347", "#FFD700", "#32CD32"]
                }]
            },
            options: {
                responsive: true
            }
        });
    }
});