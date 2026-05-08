/**
 * useMechanics.js
 * 
 * Composable para gerenciar a lógica de Mecânicas (Dados) e Jogadas.
 */

import { ref } from 'vue';
import { rollChallenge } from '../core/DiceEngine.js';
import { lottery } from '../core/LotteryEngine.js';
import { useHistory } from './useHistory.js';
import { useResultPopup } from './useResultPopup.js';
import oracleData from '../assets/data/oracle.json';

const { addToHistory } = useHistory();
const { showResult } = useResultPopup();

export const useMechanics = () => {
    const activeDie = ref(20);
    const passiveDie = ref(0);
    const isAddition = ref(false);
    const history = ref([]);
    const HISTORY_LIMIT = 6;

    const rollDice = () => {
        const result = rollChallenge(activeDie.value, passiveDie.value, isAddition.value);
        
        const entry = {
            id: Date.now(),
            expression: result.expression,
            total: result.result
        };

        history.value.unshift(entry);
        addToHistory(`Rolagem ${result.expression}`, `Resultado: <b>${result.result}</b>`);
        
        // REMOVIDO o showResult daqui conforme pedido: dados não abrem popup
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
            showResult(item.label, res); // Geradores continuam abrindo popup
        }
    };

    const clearJogadas = () => {
        jogadasList.value.forEach(i => i.valor = "");
    };

    return {
        activeDie, passiveDie, isAddition, history, rollDice, clearHistory,
        jogadasList, execJogada, clearJogadas
    };
};
