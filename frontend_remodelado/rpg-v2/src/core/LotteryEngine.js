/**
 * LotteryEngine.js
 * 
 * Implementação do motor de sorteio multinível com fidelidade ao sistema original.
 * Baseado na função original combinacao_opcao de app.js:200
 */

import { randomInt } from './DiceEngine.js';

/**
 * Resolve um sorteio em uma tabela, suportando estruturas aninhadas (multinível).
 * 
 * @param {Array} table - O array de dados (proveniente do oracle.json)
 * @param {string} separator - Separador entre níveis (padrão <br /> no legado)
 * @returns {string} O resultado formatado do sorteio
 */
export const lottery = (table, separator = "<br />") => {
    if (!table) return "";

    // Se o primeiro elemento for um array, temos uma tabela multinível
    if (Array.isArray(table[0])) {
        let results = [];
        const quantity = table.length;

        for (let i = 0; i < quantity; i++) {
            // Caso de aninhamento triplo (ex: aventura_inicio)
            if (Array.isArray(table[i][0])) {
                let subResults = [];
                const subQuantity = table[i].length;

                for (let j = 0; j < subQuantity; j++) {
                    const subTable = table[i][j];
                    subResults.push(subTable[randomInt(0, subTable.length)]);
                }

                results.push(subResults.join(" - "));
                continue;
            }

            // Caso de aninhamento duplo padrão
            const subTable = table[i];
            results.push(subTable[randomInt(0, subTable.length)]);
        }

        return results.join(separator);
    } else {
        // Sorteio linear simples
        return table[Math.floor(Math.random() * table.length)];
    }
};

/**
 * Especialização para o gerador de nomes (baseado em gera_nome de app.js:237)
 * 
 * @param {Array} particles - Matriz de partículas fonéticas
 * @returns {string} Nome gerado
 */
export const generateName = (particles) => {
    const listSizes = [1, 2, 1, 2, 3, 2, 3, 3];
    const nameSize = listSizes[randomInt(0, listSizes.length)];
    let name = "";

    for (let i = 0; i < nameSize; i++) {
        // O original usa fixed 100 como max, mas nossas partículas podem variar.
        // Contudo, para manter fidelidade, se a spec diz 100, usamos 100.
        // Se a spec diz para se adaptar ao tamanho real, usamos particles[i].length.
        // Como o objetivo é paridade, vamos usar o tamanho real da lista de partículas provida.
        const pool = particles[i];
        if (pool) {
            name += pool[randomInt(0, pool.length)];
        }
    }
    
    return name;
};
