const url = "https://www.dolarsi.com/api/api.php?type=dolar";
let blueCompra;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const dolarBlue = data.filter(
      (casa) => casa.casa.nombre === "Blue"
    )[0];
    blueCompra = parseFloat(dolarBlue.casa.compra.replace(",", "."));
    blueVentaa = parseFloat(dolarBlue.casa.venta.replace(",", "."));
    const blueHtmlCompra = `Dólar blue compra: $${blueCompra}`;
    const blueHtmlVenta = `Dólar blue venta: $${blueVentaa}`;
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
  const conversion = parseFloat(valor) * blueVentaa;
  const formattedNumber = conversion.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  document.getElementById("currency-field-result-number").innerHTML = "Resultado: "+ formattedNumber +" pesos Arg";
  
}
