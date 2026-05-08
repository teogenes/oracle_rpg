/**
 * useOracle.js
 * 
 * Composable para gerenciar a lógica do Oráculo reativo.
 * Implementa RF-01, RF-02 e RF-03.
 */

import { ref } from 'vue';
import { lottery } from '../core/LotteryEngine.js';
import { useHistory } from './useHistory.js';
import { useResultPopup } from './useResultPopup.js';
import oracleData from '../assets/data/oracle.json';

const { addToHistory } = useHistory();
const { showResult } = useResultPopup();

export const useOracle = () => {
    // Estado inicial baseado em abas.js:oracleResult
    const oracleList = ref([
        { 
            label: "Oráculo Geral", 
            ora: "pergunta_oracle", 
            valor: "", 
            msg: "O oráculo das perguntas (Sim/Não + Fatores)" 
        },
        { 
            label: "Abstração", 
            ora: "abstracao_oracle", 
            valor: "", 
            msg: "Para ideias abstratas: Situação, Sujeito e Verbo" 
        },
        { 
            label: "Criar Artefato", 
            ora: "criar_aterfato", 
            valor: "", 
            msg: "Gerar detalhes de um artefato místico" 
        },
        { 
            label: "Maldição", 
            ora: "maldicao_aterfato", 
            valor: "", 
            msg: "Revela a natureza de uma maldição" 
        }
    ]);

    /**
     * Executa o sorteio para um item específico da lista
     * @param {number} index - Índice do item na oracleList
     */
    const execOracle = (index) => {
        const item = oracleList.value[index];
        if (!item) return;

        const data = oracleData[item.ora];
        if (data) {
            // Implementa RF-01 e RF-02 usando o motor de paridade
            const res = lottery(data);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        } else {
            console.warn(`[useOracle] Chave "${item.ora}" não encontrada nos dados.`);
            item.valor = "Erro: Dados não encontrados.";
        }
    };

    /**
     * Reseta todos os valores da aba Oráculo (RF-03)
     */
    const clearOracle = () => {
        oracleList.value.forEach(item => {
            item.valor = "";
        });
    };

    return {
        oracleList,
        execOracle,
        clearOracle
    };
};
