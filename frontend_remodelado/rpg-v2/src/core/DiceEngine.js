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
 * Executa uma rolagem de disputa (1 Ação + Apoio vs 2 Desafios)
 * 
 * @param {number} dieAcao - Tamanho do dado de ação
 * @param {number} dieDesafio1 - Tamanho do primeiro dado de desafio
 * @param {number} dieDesafio2 - Tamanho do segundo dado de desafio
 * @param {string} supportType - Tipo de dado de apoio ('none', 'd2', 'fate')
 * @returns {Object} { acao, apoio, desafio1, desafio2, status, expression }
 */
export const rollDispute = (dieAcao, dieDesafio1, dieDesafio2, supportType = 'none') => {
    const resAcaoBase = randomInt(1, dieAcao + 1);
    let resApoio = 0;
    let apoioLabel = "";

    switch (supportType) {
        case 'd2-1':
            resApoio = randomInt(1, 3) - 1; // (1 ou 2) - 1 = 0 ou 1
            apoioLabel = ` (+1D2-1:${resApoio})`;
            break;
        case 'd2':
            resApoio = randomInt(1, 3); // 1 ou 2
            apoioLabel = ` (+1D2:${resApoio})`;
            break;
        case 'p1':
            resApoio = 1;
            apoioLabel = ` (+1)`;
            break;
        case 'd2p1':
            resApoio = randomInt(1, 3) + 1; // (1 ou 2) + 1 = 2 ou 3
            apoioLabel = ` (+1D2+1:${resApoio})`;
            break;
        case 'p2':
            resApoio = 2;
            apoioLabel = ` (+2)`;
            break;
        case 'd2p2':
            resApoio = randomInt(1, 3) + 2; // (1 ou 2) + 2 = 3 ou 4
            apoioLabel = ` (+1D2+2:${resApoio})`;
            break;
        case 'p3':
            resApoio = 3;
            apoioLabel = ` (+3)`;
            break;
        case 'fate':
            resApoio = randomInt(-1, 2); // -1, 0 ou 1
            apoioLabel = ` (Fate:${resApoio >= 0 ? '+' : ''}${resApoio})`;
            break;
        default:
            resApoio = 0;
            apoioLabel = "";
    }

    const resAcaoTotal = resAcaoBase + resApoio;
    const resDesafio1 = randomInt(1, dieDesafio1 + 1);
    const resDesafio2 = randomInt(1, dieDesafio2 + 1);

    let hits = 0;
    if (resAcaoTotal >= resDesafio1) hits++;
    if (resAcaoTotal >= resDesafio2) hits++;

    let status = "Falha";
    if (hits === 2) status = "Sucesso";
    else if (hits === 1) status = "Parcial";

    return {
        acaoBase: resAcaoBase,
        apoio: resApoio,
        acaoTotal: resAcaoTotal,
        desafio1: resDesafio1,
        desafio2: resDesafio2,
        hits,
        status,
        expression: `Aç:${resAcaoBase}${apoioLabel} vs D1:${resDesafio1}, D2:${resDesafio2}`
    };
};

/**
 * Executa uma rolagem de desafio simples (Compatibilidade legada ou soma)
 */
export const rollChallenge = (dieActive, diePassive, isAddition = false) => {
    const resActive = randomInt(1, dieActive + 1);
    const resPassive = randomInt(1, diePassive + 1);
    
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
