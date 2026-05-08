/**
 * usePersona.js
 * 
 * Composable para gerenciar a lógica de Personagem (Life Path), NPCs e Criaturas (Monstros).
 */

import { ref } from 'vue';
import { lottery, generateName } from '../core/LotteryEngine.js';
import { randomInt } from '../core/DiceEngine.js';
import { useHistory } from './useHistory.js';
import { useResultPopup } from './useResultPopup.js';
import identityData from '../assets/data/identity.json';
import oracleData from '../assets/data/oracle.json';
import worldData from '../assets/data/world.json';

const { addToHistory } = useHistory();
const { showResult } = useResultPopup();

export const usePersona = () => {
    // 1. Unidade de Personagem (Life Path)
    const personList = ref([
        { label: "Origem", ora: "person_origem", valor: "", msg: "Histórico social e familiar" },
        { label: "Ocupação", ora: "person_ocupacao", valor: "", msg: "Treinamento e profissão" },
        { label: "Destaque", ora: "person_destaque", valor: "", msg: "Traços marcantes" },
        { label: "Família", ora: "person_familia", valor: "", msg: "Detalhes de parentesco" },
        { label: "Incidente", ora: "person_incidente", valor: "", msg: "Eventos traumáticos ou sorte" },
        { label: "Aliado/Inimigo", ora: "person_aliado_inimigo", valor: "", msg: "Relações de impacto" },
        { label: "Pertence", ora: "person_pertence", valor: "", msg: "Itens herdados ou achados" },
        { label: "Motivação", ora: "person_objetivo", valor: "", msg: "O que move o herói" }
    ]);

    // 2. Unidade de NPCs
    const npcList = ref([
        { label: "Nome Fantasia", ora: "npc_nome_gerado", valor: "", msg: "Gera nomes por partículas" },
        { label: "Nome Homem", ora: "vamp_nome_m", valor: "", msg: "Nomes masculinos fixos" },
        { label: "Nome Mulher", ora: "vamp_nome_f", valor: "", msg: "Nomes femininos fixos" },
        { label: "Personalidade", ora: "persolidade_npc", valor: "", msg: "Comportamento e humor" },
        { label: "Conflitos", ora: "conflitos_evento", valor: "", msg: "Dramas do NPC" },
        { label: "Posicionamento", ora: "posicionamento_npc", valor: "", msg: "Atividade e índole" },
        { label: "Conversa NPC", ora: "coversa_npc", valor: "", msg: "Tópicos de diálogo" },
        { label: "Vínculo NPC", ora: "vinculo_npc", valor: "", msg: "Relação entre personagens" }
    ]);

    // 3. Unidade de Criaturas (Monstros)
    const yokaiList = ref([
        { label: "Criaturas", ora: "mostros", valor: "", msg: "Espécie e habitat" },
        { label: "Estrangeiro", ora: "animais_estranho", valor: "", msg: "Criaturas de outras terras" },
        { label: "Aberração", ora: "criaturas_estranha", valor: "", msg: "Seres deformados e únicos" },
        { label: "Aparência", ora: "aparencia_mostro", valor: "", msg: "Traços visuais da criatura" },
        { label: "Fraqueza", ora: "vulnerabilidade", valor: "", msg: "Ponto fraco ou medo" }
    ]);

    const execPerson = (index) => {
        const item = personList.value[index];
        if (!item) return;

        let res = "";

        if (item.ora === "person_familia") {
            const data = identityData.person_familia;
            let result = [];
            const pais = data[0][randomInt(0, data[0].length)];
            result.push(pais);
            if (pais.includes("Algo aconteceu")) result.push(data[1][randomInt(0, data[1].length)]);
            const irmaosDesc = data[2][randomInt(0, data[2].length)];
            result.push(irmaosDesc);
            const match = irmaosDesc.match(/Possui (\d+)/);
            if (match) {
                const count = parseInt(match[1]);
                for (let i = 0; i < count; i++) result.push(`  - Irmão ${i+1}: ${data[3][randomInt(0, data[3].length)]}`);
            }
            res = result.join("<br />");
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
            return;
        }

        // Tenta encontrar a tabela nos diferentes arquivos de dados
        const table = identityData[item.ora] || worldData[item.ora] || oracleData[item.ora];
        if (table) {
            res = lottery(table);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        } else {
            console.warn(`[usePersona] Tabela "${item.ora}" não encontrada.`);
        }
    };

    const execNpc = (index) => {
        const item = npcList.value[index];
        if (!item) return;

        let res = "";

        if (item.ora === "npc_nome_gerado") {
            res = `${generateName(identityData.part_nome)} ${generateName(identityData.part_nome)}`;
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
            return;
        }

        if (item.ora === "vamp_nome_m" || item.ora === "vamp_nome_f") {
            const pool = identityData.nomes_fixos;
            const genderIdx = item.ora === "vamp_nome_m" ? 0 : 1;
            res = `${pool[genderIdx][randomInt(0, pool[genderIdx].length)]} ${pool[2][randomInt(0, pool[2].length)]}`;
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
            return;
        }

        const table = identityData[item.ora] || worldData[item.ora] || oracleData[item.ora];
        if (table) {
            res = lottery(table);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const execYokai = (index) => {
        const item = yokaiList.value[index];
        if (item) {
            const table = identityData[item.ora] || worldData[item.ora] || oracleData[item.ora];
            const res = lottery(table);
            item.valor = res;
            addToHistory(item.label, res);
            showResult(item.label, res);
        }
    };

    const clearPersona = () => personList.value.forEach(i => i.valor = "");
    const clearNpc = () => npcList.value.forEach(i => i.valor = "");
    const clearYokai = () => yokaiList.value.forEach(i => i.valor = "");

    return {
        personList, npcList, yokaiList,
        execPerson, execNpc, execYokai,
        clearPersona, clearNpc, clearYokai
    };
};
