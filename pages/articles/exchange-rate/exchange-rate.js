(function () {
  const apiKey = "6e4ec98ced2d6a52b6ec2ba4";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.result == "error") {
        throw new Error("Failed to load exchange rate data");
      }
      document.getElementById("loadingMessage").style.display = "none";

      const lkrRate = data.conversion_rates.LKR;
      document.getElementById(
        "exchangeRate"
      ).textContent = `1 USD = ${lkrRate.toFixed(2)} LKR`;
    })
    .catch((error) => {
      document.getElementById("loadingMessage").textContent = error.message;
      document.getElementById("exchangeRate").style.display = "none";
    });
})();
