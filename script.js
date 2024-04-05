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
const currencyFieldResultNumber = document.querySelector(".currency-field-result-number");

currencyFieldInput.addEventListener("change", () => {
  calcular(currencyFieldInput.value, currencyFieldResultNumber);
});

function calcular(valor, resultado) {
  const conversion = parseFloat(valor) * blueVenta;
  const formattedNumber = conversion.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  document.getElementById("currency-field-result-number").innerHTML = "Resultado: "+ formattedNumber +" pesos Arg";
}
