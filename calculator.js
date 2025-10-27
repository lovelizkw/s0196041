document.addEventListener('DOMContentLoaded', function() {

    const quantityInput = document.getElementById('quantity');
    const quantityError = document.getElementById('quantity-error');
    const sweetTypeRadios = document.querySelectorAll('input[name="sweetType"]');
    const optionsGroup = document.getElementById('options-group');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('property-group');
    const propertyCheckbox = document.getElementById('property');
    const resultText = document.getElementById('result-text');
    
    const basePrices = {
        1: 100, 
        2: 200,
        3: 50  
    };
    
    const sweetNames = {
        1: "Шоколадные конфеты",
        2: "Пирожные", 
        3: "Печенье"
    };
    
    function validateQuantity(inputValue) {
        const regex = /^[1-9]\d*$/;
        return regex.test(inputValue);
    }
    
    function updateInterface() {
        const selectedSweetType = document.querySelector('input[name="sweetType"]:checked').value;
        
        optionsSelect.selectedIndex = 0;
        propertyCheckbox.checked = false;
        
        switch(selectedSweetType) {
            case '1':
                optionsGroup.style.display = 'none';
                propertyGroup.style.display = 'none';
                break;
            case '2':
                optionsGroup.style.display = 'block';
                propertyGroup.style.display = 'none';
                break;
            case '3':
                optionsGroup.style.display = 'none';
                propertyGroup.style.display = 'block';
                break;
        }
        
        calculatePrice();
    }
    
    function calculatePrice() {
        const inputValue = quantityInput.value;
        
        if (!validateQuantity(inputValue)) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('input-error');
            resultText.innerHTML = `<span class="price-highlight">Введите корректное количество</span>`;
            return;
        } else {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('input-error');
        }
        
        const quantity = parseInt(inputValue);
        const selectedSweetType = document.querySelector('input[name="sweetType"]:checked').value;
        
        let price = basePrices[selectedSweetType];
        let sweetName = sweetNames[selectedSweetType];
        
        let details = [`Товар: ${sweetName}`];
        let additionalCost = 0;
        
        switch(selectedSweetType) {
            case '2':
                const optionCost = parseInt(optionsSelect.value);
                additionalCost += optionCost;
                if (optionCost > 0) {
                    const selectedOption = optionsSelect.options[optionsSelect.selectedIndex].text;
                    details.push(selectedOption);
                }
                break;
                
            case '3':
                if (propertyCheckbox.checked) {
                    additionalCost += 200;
                    details.push("Доставка в тот же день: +200 руб.");
                }
                break;
        }
        
        const totalPrice = (price + additionalCost) * quantity;
        details.push(`Количество: ${quantity} шт.`);
        details.push(`Цена за шт.: ${price + additionalCost} руб.`);
        
        resultText.innerHTML = `
            ${details.join('<br>')}
            <br><span class="price-highlight">Итого: ${totalPrice} руб.</span>
        `;
    }
    
    quantityInput.addEventListener('input', function() {
        const inputValue = this.value;
        
        if (inputValue === '') {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('input-error');
            return;
        }
        
        if (!validateQuantity(inputValue)) {
            quantityError.style.display = 'block';
            quantityInput.classList.add('input-error');
        } else {
            quantityError.style.display = 'none';
            quantityInput.classList.remove('input-error');
            calculatePrice();
        }
    });
    
    sweetTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateInterface);
    });
    
    optionsSelect.addEventListener('change', calculatePrice);
    propertyCheckbox.addEventListener('change', calculatePrice);
    
    updateInterface();
});