<script setup>
import { ref } from 'vue';
import './styles/main.css';
import MainLayout from './components/MainLayout.vue';
import GeneratorSection from './components/GeneratorSection.vue';
import { useMechanics } from './composables/useMechanics.js';
import { useOracle } from './composables/useOracle.js';
import { usePersona } from './composables/usePersona.js';
import { useWorld } from './composables/useWorld.js';
import { useHistory } from './composables/useHistory.js';
import { useResultPopup } from './composables/useResultPopup.js';

const { activeDie, passiveDie, rollDice, history: diceHistory, isAddition, clearHistory, jogadasList, execJogada, clearJogadas } = useMechanics();
const { oracleList, execOracle, clearOracle } = useOracle();
const { personList, npcList, yokaiList, execPerson, execNpc, execYokai, clearPersona, clearNpc, clearYokai } = usePersona();
const { 
  enredoList, aventuraList, missaoList, ermosList, masmorraList, cenaList, eventoList,
  execEnredo, execAventura, execMissao, execErmos, execMasmorra, execCena, execEvento,
  clearEnredo, clearAventura, clearMissao, clearErmos, clearMasmorra, clearCena, clearEvento 
} = useWorld();

const { globalHistory, clearGlobalHistory } = useHistory();
const { isResultPopupOpen, currentResult, closeResultPopup } = useResultPopup();

const isDiceModalOpen = ref(false);

const toggleDiceModal = () => {
  isDiceModalOpen.value = !isDiceModalOpen.value;
};

const formatValue = (val) => {
  if (!val) return '';
  // Primeiro, resolve as quebras de linha
  const withBreaks = val.replace(/\n/g, '<br />');
  // Transforma "Label: Valor" em "<b>Label:</b> Valor"
  // O regex procura por início de string ou após um <br />, 
  // pega o texto até o primeiro sinal de : (evitando pegar tags HTML se já existirem)
  return withBreaks.replace(/(^|<br\s*\/?>)([^:<>]+):/g, '$1<b>$2:</b>');
};
</script>

<template>
  <MainLayout>
    <!-- Botão Flutuante para Abrir Dados -->
    <button class="fab-dice" @click="toggleDiceModal" aria-label="Abrir Motor de Dados">
      🎲
    </button>

    <!-- Modal do Motor de Dados -->
    <div v-if="isDiceModalOpen" class="modal-overlay" @click.self="toggleDiceModal">
      <div class="modal-content dice-modal" role="dialog" aria-labelledby="modal-title">
        <button class="modal-close" @click="toggleDiceModal">×</button>
        <h3 id="modal-title" class="sidebar-title">🎲 Motor de Dados</h3>
        
        <div class="dice-controls">
          <div class="control-row">
            <label>Ativo:
              <select v-model="activeDie" aria-label="Dado Ativo">
                <option v-for="d in [4,6,8,10,12,20]" :key="d" :value="d">D{{d}}</option>
              </select>
            </label>
            <label>Passivo:
              <select v-model="passiveDie" aria-label="Dado Passivo">
                <option :value="0">N/A</option>
                <option v-for="d in [4,6,8,10,12,20]" :key="d" :value="d">D{{d}}</option>
              </select>
            </label>
          </div>
          <label class="check-label">
            <input type="checkbox" v-model="isAddition"> Modo Soma
          </label>
          <button class="btn-roll" @click="rollDice">Rolar Dados</button>
        </div>

        <div class="history-section dice-history">
          <div class="header-actions">
            <h4>Últimas Rolagens</h4>
            <button class="btn-clear-sm" @click="clearHistory">Limpar</button>
          </div>
          <ul class="history-list" aria-live="polite">
            <li v-for="item in diceHistory" :key="item.id" class="history-item">
              <span class="expr">{{ item.expression }}</span>
              <span class="total-badge">= {{ item.total }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Popup de Resultado Narrativo (Botões) -->
    <div v-if="isResultPopupOpen" class="modal-overlay" @click.self="closeResultPopup">
      <div class="modal-content result-modal" role="dialog" aria-labelledby="result-title">
        <button class="modal-close" @click="closeResultPopup">×</button>
        <div class="result-header">
           <span class="category-tag">Descoberta</span>
           <h3 id="result-title">{{ currentResult.label }}</h3>
        </div>
        <div class="result-body">
           <div class="value-content" v-html="formatValue(currentResult.value)"></div>
        </div>
        <div class="result-footer">
          <button class="btn-confirm" @click="closeResultPopup">Entendido</button>
        </div>
      </div>
    </div>

    <!-- Sidebar: Histórico Global -->
    <template #sidebar>
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h3 class="sidebar-title">📜 Registro de Sessão</h3>
          <button class="btn-clear-main" @click="clearGlobalHistory">Zerar Registro</button>
        </div>
        
        <div class="global-history-container">
          <div v-if="globalHistory.length === 0" class="empty-history">
            A história ainda não começou...
          </div>
          <ul class="global-history-list" aria-live="polite">
            <li v-for="entry in globalHistory" :key="entry.id" class="global-history-item">
              <div class="history-meta">
                <span class="history-label">{{ entry.label }}</span>
                <span class="history-time">{{ entry.timestamp }}</span>
              </div>
              <div class="history-value" v-html="formatValue(entry.value)"></div>
            </li>
          </ul>
        </div>
      </div>
    </template>

    <!-- Slots de Conteúdo -->
    <template #oracle><GeneratorSection title="Oráculo" :items="oracleList" @exec="execOracle" @clear="clearOracle" /></template>
    <template #enredo><GeneratorSection title="Enredo" :items="enredoList" @exec="execEnredo" @clear="clearEnredo" /></template>
    <template #aventura><GeneratorSection title="Aventura" :items="aventuraList" @exec="execAventura" @clear="clearAventura" /></template>
    <template #missao><GeneratorSection title="Missão" :items="missaoList" @exec="execMissao" @clear="clearMissao" /></template>
    <template #ermos><GeneratorSection title="Ermos" :items="ermosList" @exec="execErmos" @clear="clearErmos" /></template>
    <template #masmorra><GeneratorSection title="Masmorra" :items="masmorraList" @exec="execMasmorra" @clear="clearMasmorra" /></template>
    <template #cena><GeneratorSection title="Cena" :items="cenaList" @exec="execCena" @clear="clearCena" /></template>
    <template #eventos><GeneratorSection title="Eventos" :items="eventoList" @exec="execEvento" @clear="clearEvento" /></template>
    <template #npc><GeneratorSection title="NPCs" :items="npcList" @exec="execNpc" @clear="clearNpc" /></template>
    <template #persona><GeneratorSection title="Persona" :items="personList" @exec="execPerson" @clear="clearPersona" /></template>
    <template #yokai><GeneratorSection title="Criaturas" :items="yokaiList" @exec="execYokai" @clear="clearYokai" /></template>
    <template #jogadas><GeneratorSection title="Jogadas" :items="jogadasList" @exec="execJogada" @clear="clearJogadas" /></template>
  </MainLayout>
</template>

<style scoped>
/* Sidebar e Histórico */
.sidebar-content { display: flex; flex-direction: column; height: 100%; }
.sidebar-header { padding: 1.5rem; border-bottom: 2px solid #e8f5e9; background: white; text-align: center; }
.sidebar-title { margin: 0; color: #1b5e20; font-size: 1.1rem; font-weight: 800; text-transform: uppercase; }
.btn-clear-main { margin-top: 0.5rem; font-size: 0.7rem; color: #c62828; border: 1px solid #c62828; background: none; cursor: pointer; padding: 2px 6px; border-radius: 4px; }
.global-history-container { flex-grow: 1; overflow-y: auto; padding: 1rem; }
.global-history-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem; }
.global-history-item { background: white; padding: 1rem; border-radius: 8px; border-left: 4px solid #43a047; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: left; }
.history-meta { display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.7rem; }
.history-label { font-weight: 800; color: #2e7d32; text-transform: uppercase; }
.history-time { color: #999; }
.history-value { font-size: 0.95rem; line-height: 1.5; color: #333; text-align: left; }

/* Modais */
.result-modal { max-width: 500px; border-top: 8px solid #43a047; text-align: center; }
.result-header { margin-bottom: 1.2rem; }
.category-tag { font-size: 0.65rem; font-weight: 800; color: #4caf50; text-transform: uppercase; background: #f1f8e9; padding: 2px 8px; border-radius: 10px; }
.result-header h3 { margin: 0.5rem 0 0 0; color: #1b5e20; font-size: 1.4rem; }
.result-body { background: #fdfdfd; padding: 1.5rem; border-radius: 10px; border: 1px dashed #c8e6c9; margin-bottom: 1.2rem; text-align: left; }
.value-content { color: #1b2e1b; line-height: 1.6; font-size: 1.15rem; text-align: left; }
.result-footer { display: flex; justify-content: center; }
.btn-confirm { padding: 0.7rem 2rem; background: #43a047; color: white; border: none; border-radius: 6px; font-weight: 800; cursor: pointer; }

/* Dados */
.dice-controls { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; text-align: center; }
.control-row { display: flex; gap: 1rem; justify-content: center; }
.control-row label { flex: 1; font-size: 0.8rem; font-weight: bold; }
.control-row select { width: 100%; padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd; }
.btn-roll { padding: 0.8rem; background: #43a047; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
.dice-history { margin-top: 1.5rem; border-top: 1px solid #eee; padding-top: 1rem; }
.history-list { list-style: none; padding: 0; margin-top: 0.5rem; }
.history-item { padding: 0.4rem; border-bottom: 1px solid #f9f9f9; font-family: monospace; font-size: 0.9rem; display: flex; justify-content: space-between; }
.total-badge { font-weight: bold; color: #1b5e20; }
.btn-clear-sm { font-size: 0.65rem; background: #eee; border: none; padding: 2px 5px; cursor: pointer; }

/* Global overrides para o v-html */
:deep(b), :deep(strong) { font-weight: 700 !important; color: #2e7d32 !important; }
:deep(i), :deep(em) { font-style: italic !important; color: #4caf50 !important; }
</style>
