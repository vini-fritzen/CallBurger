function calculateTotal() {
    const quantity = document.getElementById('quantity').value;
    const burgerWeight = document.getElementById('burgerWeight').value;
    const fatPercentage = document.getElementById('fatPercentage').value;

    // Chamar a função calcularIngredientes e obter os resultados
    const resultados = calcularIngredientes(quantity, burgerWeight, fatPercentage);

    // Chamar a função displayQuantities passando os resultados
    displayQuantities(resultados);
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

function calcularIngredientes(quantity, burgerWeight, fatPercentage) {
    // Calcula o total de carne e gordura
    const totalCarneEGordura = quantity * burgerWeight;
    
    // Calcula a quantidade de carne necessária
    const quantidadeCarne = totalCarneEGordura * ((100 - fatPercentage) / 100);

    // Calcula a quantidade de gordura necessária
    const quantidadeGordura = totalCarneEGordura * (fatPercentage/ 100);

    // Retorna os resultados
    return {
        quantidadeCarne,
        quantidadeGordura,
        totalCarneEGordura
    };
}

function listarIngredientes() {
    const checkboxes = document.querySelectorAll('input[name="ingredient"]:checked');
    const ingredientList = document.getElementById('ingredient-list');

    ingredientList.innerHTML = ""; // Limpar a lista antes de adicionar os novos ingredientes

    checkboxes.forEach(checkbox => {
        const listItem = document.createElement('li');
        listItem.textContent = checkbox.value;
        ingredientList.appendChild(listItem);
    });
}