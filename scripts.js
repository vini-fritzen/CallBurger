function calcularQuantidadePorUnidade(ingrediente) {
    const quantidadesPorUnidade = {
        // Legumes
        'alface': 75, // 75g de alface por hambúrguer
        'tomate': 50, // 50g de tomate por hambúrguer
        'picles': 50, // 50g de picles por hambúrguer
        'cebola': 30, // 30g de cebola por hambúrguer
        'pepino': 30, // 30g de pepino por hambúrguer
        'pimentao': 40, // 40g de pimentão por hambúrguer
        'rucula': 30, // 30g de rúcula por hambúrguer
        'tomate_seco': 20, // 20g de tomate seco por hambúrguer

        // Queijos
        'cheddar': 2, // 2 Fatias de cheddar por hambúrguer
        'suico': 2, // 2 Fatias de queijo suíço por hambúrguer
        'americano': 2, // 2 Fatias de queijo americano por hambúrguer
        'gorgonzola': 2, // 2 Fatias de gorgonzola por hambúrguer
        'pepper_jack': 2, // 2 Fatias de pepper jack por hambúrguer
        'provolone': 2, // 2 Fatias de provolone por hambúrguer
        'brie': 2, // 2 Fatias de brie por hambúrguer
        'gouda': 2, // 2 Fatias de gouda por hambúrguer

        // Extra
        'bacon': 2, // 2 Fatias de bacon por hambúrguer
        'ovo': 1, // 1 ovo por hambúrguer
        // Adicione mais ingredientes conforme necessário
    };

    return quantidadesPorUnidade[ingrediente] || 0;
}

function calcularIngredientes(quantity, burgerWeight, fatPercentage) {
    const totalCarneEGordura = quantity * burgerWeight;
    const quantidadeCarne = totalCarneEGordura * ((100 - fatPercentage) / 100);
    const quantidadeGordura = totalCarneEGordura * (fatPercentage / 100);
    const quantidadePao = 1 * quantity; // 1 unidade de pão por hambúrguer

    const ingredientesSelecionados = calcularIngredientesSelecionados();

    // Calcular a quantidade total para cada ingrediente
    const ingredientes = {};
    ingredientesSelecionados.forEach((ingrediente) => {
        const quantidadePorUnidade = calcularQuantidadePorUnidade(ingrediente.nome);
        const quantidadeTotal = quantidadePorUnidade * quantity;

        // Verificar se a quantidade é um número válido
        if (!isNaN(quantidadeTotal) && isFinite(quantidadeTotal)) {
            ingredientes[ingrediente.nome] = {
                quantidade: quantidadeTotal,
                unidade: ingrediente.unidade
            };
        }
    });

    return {
        'Carne': quantidadeCarne,
        'Gordura': quantidadeGordura,
        'Total': totalCarneEGordura,
        'Pao': quantidadePao,
        'ingredientesSelecionados': ingredientesSelecionados,
        'ingredientes': ingredientes,
        'quantity': quantity  // Adicione a propriedade quantity
    };
}

function calcularIngredientesSelecionados() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="ingredient"]:checked');
    const ingredientesSelecionados = [];

    checkboxes.forEach((checkbox) => {
        const nome = checkbox.value;
        const quantidade = calcularQuantidadePorUnidade(nome);
        ingredientesSelecionados.push({
            nome: nome,
            quantidade: quantidade,
            unidade: obterUnidade(nome)
        });
    });

    return ingredientesSelecionados;
}

function obterUnidade(ingrediente) {
    const unidadesPorIngrediente = {
        'alface': 'g',
        'tomate': 'g',
        'picles': 'g',
        'cebola': 'g',
        'pepino': 'g',
        'pimentao': 'g',
        'rucula': 'g',
        'tomate_seco': 'g',
        'cheddar': 'fatias',
        'suico': 'fatias',
        'americano': 'fatias',
        'gorgonzola': 'fatias',
        'pepper_jack': 'fatias',
        'provolone': 'fatias',
        'brie': 'fatias',
        'gouda': 'fatias',
        'bacon': 'g',
        'ovo': 'unidade',
        // Adicione mais ingredientes conforme necessário
    };

    return unidadesPorIngrediente[ingrediente] || '';
}

function displayQuantities(quantities) {
    const quantitiesList = document.getElementById('quantities-list');

    // Limpar a lista antes de adicionar as novas quantidades
    quantitiesList.innerHTML = "";

    // Adiciona a quantidade de pessoas à lista
    const listItemquantidadePao = document.createElement('li');
    listItemquantidadePao.textContent = `Pão: ${quantities.Pao.toFixed(0)}`;
    quantitiesList.appendChild(listItemquantidadePao);

    // Adiciona as quantidades de carne e gordura à lista
    const listtotalCarneEGordura = document.createElement('li');
    listtotalCarneEGordura.textContent = `Total de Carne: ${quantities.Total.toFixed(2)}g`;
    quantitiesList.appendChild(listtotalCarneEGordura);
    
    const listItemCarne = document.createElement('li');
    listItemCarne.textContent = `Quantidade de Carne: ${quantities.Carne.toFixed(2)}g`;
    quantitiesList.appendChild(listItemCarne);

    const listItemGordura = document.createElement('li');
    listItemGordura.textContent = `Quantidade de Gordura: ${quantities.Gordura.toFixed(2)}g`;
    quantitiesList.appendChild(listItemGordura);

    // Adiciona os ingredientes à lista, se houver
    const ingredientesSelecionados = quantities.ingredientesSelecionados;

    if (ingredientesSelecionados && ingredientesSelecionados.length > 0) {
        const listItemIngredientes = document.createElement('li');
        listItemIngredientes.textContent = "Ingredientes Selecionados:";

        const ingredientesUl = document.createElement('ul');

        ingredientesSelecionados.forEach((ingrediente) => {
            // Verificar se a quantidade é um número válido
            if (!isNaN(ingrediente.quantidade) && isFinite(ingrediente.quantidade)) {
                const quantidadeTotal = ingrediente.quantidade * quantities.quantity;

                const listItem = document.createElement('li');
                listItem.textContent = `${ingrediente.nome}: ${quantidadeTotal.toFixed(2)}${ingrediente.unidade}`;
                ingredientesUl.appendChild(listItem);
            }
        });

        listItemIngredientes.appendChild(ingredientesUl);
        quantitiesList.appendChild(listItemIngredientes);
    }
}

// Função chamada quando o botão "Calcular" é clicado
function calculateTotal() {
    const quantity = document.getElementById('quantity').value;
    const burgerWeight = document.getElementById('burgerWeight').value;
    const fatPercentage = document.getElementById('fatPercentage').value;

    // Chamar a função calcularIngredientes e obter os resultados
    const resultados = calcularIngredientes(quantity, burgerWeight, fatPercentage);

    // Chamar a função displayQuantities passando os resultados
    displayQuantities(resultados);
}
