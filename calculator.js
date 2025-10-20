document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    
    var calculateBtn = document.getElementById("calculate-btn");
    calculateBtn.addEventListener("click", calculate);
});

function calculate() {
    var quantityField = document.getElementById("quantity");
    var productSelect = document.getElementById("product");
    var resultDiv = document.getElementById("result");
    var resultText = document.getElementById("result-text");
    var errorMsg = document.getElementById("error-msg");
    
    var quantityStr = quantityField.value;
    var productPrice = parseInt(productSelect.value, 10);
    var productName = productSelect.options[productSelect.selectedIndex].text.split(' - ')[0];
    
    var m = quantityStr.match(/^\d+$/);
    if (m === null || parseInt(quantityStr, 10) <= 0) {
        errorMsg.style.display = "block";
        resultDiv.style.display = "none";
        return false;
    }
    
    errorMsg.style.display = "none";
    var quantity = parseInt(quantityStr, 10);
    var total = quantity * productPrice;
    
    resultText.innerHTML = "Товар: " + productName + "<br>Общая стоимость: <span class='product-price'>" + total + " руб.</span>";
    resultDiv.style.display = "block";
    return false;
}