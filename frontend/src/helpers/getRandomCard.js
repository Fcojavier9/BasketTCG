export const getRandomCard = () => {
    const totalCards = 49; // del 0 al 48 por las monedas

    // Paso 1: Asignar pesos de probabilidad a cada carta
    const weights = [];
    for (let i = 0; i < totalCards; i++) {
        weights.push(1 / (i + 1));
    }

    // Paso 2: Calcular la suma de los pesos
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);

    // Paso 3: Crear un array de probabilidades acumulativas
    const cumulativeWeights = [];
    let cumulativeSum = 0;
    for (let i = 0; i < weights.length; i++) {
        cumulativeSum += weights[i];
        cumulativeWeights.push(cumulativeSum / totalWeight);
    }

    // Paso 4: Seleccionar una carta aleatoriamente
    const random = Math.random();
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i]) {
            return i;
        }
    }
    return cumulativeWeights.length - 1; // Devolver la última carta en caso de errores de redondeo
};