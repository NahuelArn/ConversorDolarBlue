const url = "https://dolarapi.com/v1/dolares/blue";
let blueCompra;
let blueVenta;

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        blueCompra = parseFloat(data.compra);
        blueVenta = parseFloat(data.venta);
        const blueHtmlCompra = `Dólar blue compra: $${blueCompra}`;
        const blueHtmlVenta = `Dólar blue venta: $${blueVenta}`;
        document.getElementById("blueHtmlCompra").innerHTML = blueHtmlCompra;
        document.getElementById("blueHtmlVenta").innerHTML = blueHtmlVenta;
    })
    .catch((error) => console.error(error));

const currencyFieldInput = document.querySelector(".currency-field-input");
const currencyFieldResultNumber = document.querySelector("#currency-field-result-number");

currencyFieldInput.addEventListener("change", () => {
    calcular(currencyFieldInput.value, currencyFieldResultNumber);
});

function calcular(valor, resultado) {
    const conversion = parseFloat(valor) * blueVenta;
    const formattedNumber = conversion.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.getElementById("currency-field-result-number").innerHTML = "Resultado: " + formattedNumber + " pesos Arg";
}

document.addEventListener("DOMContentLoaded", function () {
    const urlUSDT = "https://criptoya.com/api/usdt/ars/0.5";

    async function getUSDTValue() {
        const response = await fetch(urlUSDT);
        const data = await response.json();
        const value = data.binancep2p.ask;
        return value;
    }

    function saveWeeklyValue(value) {
        const currentDate = new Date().toISOString().split('T')[0];
        let weeklyData = JSON.parse(localStorage.getItem('weeklyData')) || [];
        weeklyData.push({ date: currentDate, value: value });
        localStorage.setItem('weeklyData', JSON.stringify(weeklyData));
    }

    function getChartData() {
        const weeklyData = JSON.parse(localStorage.getItem('weeklyData')) || [];
        return weeklyData.map(item => ({ x: item.date, value: item.value }));
    }

    function updateChart() {
        const data = getChartData();

        anychart.onDocumentReady(function () {
            var chart = anychart.line();
            var series = chart.spline(data);
            chart.title("Valor semanal p2p de USDT");
            var xAxis = chart.xAxis();
            xAxis.title("Fecha");
            var yAxis = chart.yAxis();
            yAxis.title("Valor (ARS)");
            chart.container("graficazo");
            chart.draw();
        });
    }

    async function fetchAndSaveUSDTValue() {
        const value = await getUSDTValue();
        saveWeeklyValue(value);
        updateChart();
    }

    fetchAndSaveUSDTValue();

    setInterval(fetchAndSaveUSDTValue, 7 * 24 * 60 * 60 * 1000);
});
