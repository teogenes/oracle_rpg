/**
 * useMechanics.js
 * 
 * Composable para gerenciar a lógica de Mecânicas (Dados) e Jogadas.
 */

import { ref } from 'vue';
import { rollDispute, rollChallenge } from '../core/DiceEngine.js';
import { lottery } from '../core/LotteryEngine.js';
import { useHistory } from './useHistory.js';
import { useResultPopup } from './useResultPopup.js';
import oracleData from '../assets/data/oracle.json';

const { addToHistory } = useHistory();
const { showResult } = useResultPopup();

export const useMechanics = () => {
    const activeDie = ref(6);
    const challengeDie1 = ref(10);
    const challengeDie2 = ref(10);
    const supportDieType = ref('none'); // 'none', 'd2', 'fate'
    const isAddition = ref(false);
    const history = ref([]);
    const HISTORY_LIMIT = 6;

    const rollDice = () => {
        let result;
        if (isAddition.value) {
            // No modo soma, usamos apenas Ação + Desafio 1 para manter compatibilidade simples
            result = rollChallenge(activeDie.value, challengeDie1.value, true);
        } else {
            // Nova mecânica: 1 Ação (+ Apoio) vs 2 Desafios
            result = rollDispute(activeDie.value, challengeDie1.value, challengeDie2.value, supportDieType.value);
        }
        
        const entry = {
            id: Date.now(),
            expression: result.expression,
            total: result.status || result.result
        };

        history.value.unshift(entry);
        addToHistory(`Rolagem ${result.expression}`, `Resultado: <b>${entry.total}</b>`);
        
        if (history.value.length > HISTORY_LIMIT) {
            history.value.pop();
        }
    };

    const clearHistory = () => {
        history.value = [];
    };

    const jogadasList = ref([
        { label: "Suces./Falha", ora: "acao_teste", valor: "", msg: "Resultado da ação (Sim/Não)" },
        { label: "Ação Combate", ora: "acao_combate", valor: "", msg: "Sugestão tática de combate" },
        { label: "Situação", ora: "situacao_combate", valor: "", msg: "Estado atual do confronto" },
        { label: "Pagando preço", ora: "pag_preco", valor: "", msg: "Consequência de falhas" },
        { label: "Magias", ora: "magias", valor: "", msg: "Efeitos e tipos de magias" },
        { label: "Reviravolta", ora: "reviravolta", valor: "", msg: "Mudança inesperada na cena" }
    ]);

    const execJogada = (index) => {
        const item = jogadasList.value[index];
        if (!item) return;

        const data = oracleData[item.ora];
        if (data) {
            const res = lottery(data);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const clearJogadas = () => {
        jogadasList.value.forEach(i => i.valor = "");
    };

    return {
        activeDie, challengeDie1, challengeDie2, supportDieType, isAddition, history, rollDice, clearHistory,
        jogadasList, execJogada, clearJogadas
    };
};
