function calculateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value);
    const burgerWeight = parseFloat(document.getElementById('burgerWeight').value);
    const fatPercentage = parseFloat(document.getElementById('fatPercentage').value);
    const ingredients = document.getElementsByName('ingredient');

    let totalBread = 0;
    let totalMeat = 0;

    ingredients.forEach(ingredient => {
        if (ingredient.checked) {
            const isMeat = (ingredient.value === 'carne');
            const totalWeight = isMeat ? quantity * burgerWeight * 0.001 : quantity;
            
            if (isMeat) {
                totalMeat += totalWeight;
            } else {
                totalBread += totalWeight;
            }
        }
    });

    displayQuantities({
        'totalBread': totalBread,
        'totalMeat': totalMeat
    });
}

function displayQuantities(quantities) {
    const quantitiesList = document.getElementById('quantities-list');
    
    // Limpar a lista antes de adicionar as novas quantidades
    quantitiesList.innerHTML = "";

    for (const item in quantities) {
        const listItem = document.createElement('li');
        listItem.textContent = `${quantities[item].toFixed(2)}g de ${item}`;
        quantitiesList.appendChild(listItem);
    }
}
