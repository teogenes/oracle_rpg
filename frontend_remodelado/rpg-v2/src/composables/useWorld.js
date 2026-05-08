/**
 * useWorld.js
 * 
 * Composable para gerenciar a lógica de Mundo (Ermos, Masmorra, Enredo, Aventura, Missão, Cena e Eventos).
 * Unifica as unidades de exploração geográfica e narrativa.
 */

import { ref } from 'vue';
import { lottery } from '../core/LotteryEngine.js';
import { useHistory } from './useHistory.js';
import { useResultPopup } from './useResultPopup.js';
import worldData from '../assets/data/world.json';
import oracleData from '../assets/data/oracle.json';

const { addToHistory } = useHistory();
const { showResult } = useResultPopup();

export const useWorld = () => {
    // 1. Unidade de Enredo
    const enredoList = ref([
        { label: "Origem", ora: "enredo_origem", valor: "", msg: "O gancho inicial da trama" },
        { label: "Conexão", ora: "enredo_conexao", valor: "", msg: "Seu vínculo com o evento" },
        { label: "Vilão", ora: "vilao_enredo", valor: "", msg: "A face do seu antagonista" }
    ]);

    // 2. Unidade de Aventura
    const aventuraList = ref([
        { label: "Aventura", ora: "aventura_inicio", valor: "", msg: "Premissa da jornada atual" },
        { label: "Missões", ora: "missao_completa", valor: "", msg: "Gera todos os eixos da missão" },
        { label: "Desafio", ora: "vilao_npc", valor: "", msg: "Desafio final da missão" }
    ]);

    // 3. Unidade de Missão
    const missaoList = ref([
        { label: "Missão", ora: "tipo_missao", valor: "", msg: "Tipo de missão" },
        { label: "Busca", ora: "missao_busca", valor: "", msg: "O que deve ser encontrado" },
        { label: "Combate", ora: "missao_combate", valor: "", msg: "Natureza do conflito armado" },
        { label: "Infiltração", ora: "missao_infiltracao", valor: "", msg: "Como entrar furtivamente" },
        { label: "Diplomacia", ora: "missao_diplomacia", valor: "", msg: "Negociações e contatos" },
        { label: "Proteção", ora: "missao_protecao", valor: "", msg: "Quem ou o que proteger" },
        { label: "Investigação", ora: "missao_investigacao", valor: "", msg: "Pistas e segredos" },
        { label: "Exploração", ora: "missao_exploracao", valor: "", msg: "Descobrindo novos locais" },
        { label: "Transporte", ora: "missao_transporte", valor: "", msg: "Levando algo ou alguém" },
        { label: "Habilidades", ora: "missao_habilidades", valor: "", msg: "Testes de perícia específicos" }
    ]);

    // 4. Unidade de Ermos
    const ermosList = ref([
        { label: "Tipo Ermo", ora: "tipo_ermo", valor: "", msg: "Bioma e detalhes do local" },
        { label: "P. Referência", ora: "refer_ermo", valor: "", msg: "Marcos geográficos visíveis" },
        { label: "Assentamentos", ora: "local_historia_cidade", valor: "", msg: "Histórico geral de vilas/cidades" },
        { label: "Aldeia", ora: "aldeia_ermo", valor: "", msg: "Detalhes de pequenas aldeias" },
        { label: "Vila", ora: "vila_ermo", valor: "", msg: "Características de vilas médias" },
        { label: "Cidade", ora: "cidade_ermo", valor: "", msg: "Infraestrutura de cidades grandes" },
        { label: "Castelo", ora: "castelo_ermo", valor: "", msg: "Ocupação e defesa de castelos" },
        { label: "Torre", ora: "torre_ermo", valor: "", msg: "Mistérios e funções de torres" },
        { label: "Mosteiro", ora: "mosteiro_ermo", valor: "", msg: "Vida religiosa e clausura" },
        { label: "Templos", ora: "templos_ermo", valor: "", msg: "Divindades e rituais" }
    ]);

    // 5. Unidade de Masmorra
    const masmorraList = ref([
        { label: "Masmorra", ora: "local_masmorra", valor: "", msg: "Identidade holística do complexo" },
        { label: "Estrutura", ora: "masmorra_compartimento", valor: "", msg: "Tipo de compartimento (Sala/Corredor)" },
        { label: "Corredor", ora: "masmorra_corredor", valor: "", msg: "Dimensões e forma do corredor" },
        { label: "Sala", ora: "masmorra_sala", valor: "", msg: "Tamanho e utilidade da sala" },
        { label: "Conteúdo", ora: "conteudo_estrutura", valor: "", msg: "O que há no local (Tesouro/Armadilha)" },
        { label: "Encontro", ora: "masmorra_encontro", valor: "", msg: "Potenciais inimigos ou eventos" }
    ]);

    // 6. Unidade de Cena
    const cenaList = ref([
        { label: "Cena", ora: "caracte_cena", valor: "", msg: "Tom, Gatilho e Objetivo da cena" },
        { label: "Ambientação", ora: "cena_ambiente", valor: "", msg: "Clima, NPCs e Complicações" },
        { label: "NPCs", ora: "cena_npc", valor: "", msg: "NPC presente na cena" },
        { label: "Rumores", ora: "cena_rumores", valor: "", msg: "O que se fala no local" },
        { label: "Complicações", ora: "cena_tipo_complicacao", valor: "", msg: "Tipo de complicações" },
        { label: "C. Amigável", ora: "cena_compl_amigavel", valor: "", msg: "Complicação Amigável" },
        { label: "C. Neutro", ora: "cena_compl_neutro", valor: "", msg: "Complicação Neutro" },
        { label: "C. Hostil", ora: "cena_compl_hostil", valor: "", msg: "Complicação Hostil" }
    ]);

    // 7. Unidade de Eventos
    const eventoList = ref([
        { label: "Eve. Genérico", ora: "evento_eGenerico", valor: "", msg: "Acontecimentos aleatórios" },
        { label: "Eve. Ambiental", ora: "cena_eve_amb", valor: "", msg: "Eventos na natureza" },
        { label: "Eve. Urbano", ora: "cena_eve_urbano", valor: "", msg: "Eventos em cidades" },
        { label: "Reviravolta", ora: "reviravolta", valor: "", msg: "Mudança súbita na narrativa" }
    ]);

    const execEnredo = (index) => {
        const item = enredoList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execAventura = (index) => {
        const item = aventuraList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execMissao = (index) => {
        const item = missaoList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execErmos = (index) => {
        const item = ermosList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execMasmorra = (index) => {
        const item = masmorraList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execCena = (index) => {
        const item = cenaList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execEvento = (index) => {
        const item = eventoList.value[index];
        if (item) {
            const res = lottery(worldData[item.ora] || oracleData[item.ora]);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const clearEnredo = () => enredoList.value.forEach(i => i.valor = "");
    const clearAventura = () => aventuraList.value.forEach(i => i.valor = "");
    const clearMissao = () => missaoList.value.forEach(i => i.valor = "");
    const clearErmos = () => ermosList.value.forEach(i => i.valor = "");
    const clearMasmorra = () => masmorraList.value.forEach(i => i.valor = "");
    const clearCena = () => cenaList.value.forEach(i => i.valor = "");
    const clearEvento = () => eventoList.value.forEach(i => i.valor = "");

    return {
        enredoList, aventuraList, missaoList, ermosList, masmorraList, cenaList, eventoList,
        execEnredo, execAventura, execMissao, execErmos, execMasmorra, execCena, execEvento,
        clearEnredo, clearAventura, clearMissao, clearErmos, clearMasmorra, clearCena, clearEvento
    };
};
