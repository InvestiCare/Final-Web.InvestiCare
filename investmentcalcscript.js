
document.addEventListener("DOMContentLoaded", function() {
    const calculateBtn = document.getElementById("calculate-btn");
    const resultDisplay = document.getElementById("return-amount");
    const investedDisplay = document.getElementById("total-invested");
    const returnDisplay = document.getElementById("total-return");
    const ctx = document.getElementById("sipChart").getContext("2d");
    let sipChart;

    calculateBtn.addEventListener("click", function() {
        let monthlyInvestment = parseFloat(document.getElementById("monthly-investment").value) || 0;
        let annualReturn = parseFloat(document.getElementById("annual-return").value) / 100 || 0;
        let investmentPeriod = parseFloat(document.getElementById("investment-time").value) || 0;
        
        let months = investmentPeriod * 12;
        let monthlyRate = annualReturn / 12;
        
        let totalInvested = monthlyInvestment * months;
        let futureValue = 0;
        let investmentData = [];
        let monthsLabels = [];

        // Correct SIP Future Value Calculation
        if (monthlyRate > 0) {
            futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        } else {
            futureValue = totalInvested;
        }
        let totalReturn = futureValue - totalInvested;

        // Generate data for graph
        for (let i = 1; i <= months; i++) {
            let tempFV = monthlyInvestment * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) * (1 + monthlyRate);
            investmentData.push(tempFV);
            monthsLabels.push(i);
        }
        
        // Display the calculated values
        resultDisplay.textContent = `Future Value: ₹${futureValue.toFixed(2)}`;
        investedDisplay.textContent = `Total Invested: ₹${totalInvested.toFixed(2)}`;
        returnDisplay.textContent = `Return Amount: ₹${totalReturn.toFixed(2)}`;

        // Update Graph
        if (sipChart) {
            sipChart.destroy();
        }
        
        sipChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: monthsLabels,
                datasets: [{
                    label: "Investment Growth",
                    data: investmentData,
                    borderColor: "#007bff",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Months" } },
                    y: { title: { display: true, text: "Investment Value (₹)" } }
                }
            }
        });
    });
});