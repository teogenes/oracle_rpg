/**
 * DiceEngine.js
 * 
 * Implementação do motor de dados com fidelidade matemática ao sistema original.
 * Baseado na função original de app.js:232
 */

/**
 * Gera um número inteiro aleatório entre min e max.
 * ATENÇÃO: Segue a fórmula original: min + Math.floor((max - min) * Math.random())
 * Esta fórmula exclui o valor max e possui o viés desejado pelo usuário (R-01).
 * 
 * @param {number} min - O valor mínimo (inclusivo)
 * @param {number} max - O valor máximo (exclusivo conforme a fórmula original)
 * @returns {number} O resultado do sorteio
 */
export const randomInt = (min, max) => {
    const rando = Math.random();
    const rest = min + Math.floor((max - min) * rando);
    return rest;
};

/**
 * Executa uma rolagem de desafio (Ativo vs Passivo)
 * 
 * @param {number} dieActive - Tamanho do dado ativo
 * @param {number} diePassive - Tamanho do dado passivo
 * @param {boolean} isAddition - Se deve somar os resultados (caso contrário, subtrai)
 * @returns {Object} { active, passive, result, expression }
 */
export const rollChallenge = (dieActive, diePassive, isAddition = false) => {
    const resActive = randomInt(1, dieActive);
    const resPassive = randomInt(1, diePassive);
    
    let total = resActive - resPassive;
    let operator = "-";
    
    if (isAddition) {
        total = resActive + resPassive;
        operator = "+";
    }

    return {
        active: resActive,
        passive: resPassive,
        result: total,
        expression: `${resActive} ${operator} ${resPassive} = ${total}`
    };
};
