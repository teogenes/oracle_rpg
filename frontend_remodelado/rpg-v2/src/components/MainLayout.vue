<script setup>
import { ref, onMounted } from 'vue';
import { handleTabNavigation, announce } from '../core/A11yManager.js';

const tabs = [
  { id: 'oracle', label: 'Oracle' },
  { id: 'enredo', label: 'Enredo' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'missao', label: 'Missão' },
  { id: 'ermos', label: 'Ermos' },
  { id: 'masmorra', label: 'Masmorra' },
  { id: 'cena', label: 'Cena' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'npc', label: 'NPCs' },
  { id: 'persona', label: 'Persona' },
  { id: 'yokai', label: 'Criaturas' },
  { id: 'jogadas', label: 'Jogadas' }
];

const activeTab = ref('oracle');
const tabElements = ref([]);

const setActiveTab = (id) => {
  activeTab.value = id;
  const label = tabs.find(t => t.id === id).label;
  announce(`Aba ${label} selecionada`);
};

const onKeydown = (event) => {
  const currentIndex = tabs.findIndex(t => t.id === activeTab.value);
  const newIndex = handleTabNavigation(event, tabElements.value, currentIndex);
  
  if (newIndex !== null) {
    setActiveTab(tabs[newIndex].id);
  }
};
</script>

<template>
  <div class="app-container">
    <header class="main-nav">
      <nav role="navigation" aria-label="Menu principal de abas">
        <ul class="tab-list" role="tablist" @keydown="onKeydown">
          <li v-for="(tab, index) in tabs" :key="tab.id" role="none">
            <button
              :id="'tab-' + tab.id"
              ref="tabElements"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
              role="tab"
              :aria-selected="activeTab === tab.id"
              :aria-controls="'panel-' + tab.id"
              :tabindex="activeTab === tab.id ? 0 : -1"
              @click="setActiveTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <main class="content-area">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        :id="'panel-' + tab.id"
        role="tabpanel"
        :aria-labelledby="'tab-' + tab.id"
        v-show="activeTab === tab.id"
      >
        <slot :name="tab.id">
          <h2>{{ tab.label }}</h2>
          <p>Conteúdo da aba {{ tab.label }} em desenvolvimento.</p>
        </slot>
      </div>
    </main>

    <aside class="sidebar" aria-label="Painel lateral de dados e histórico">
      <slot name="sidebar">
        <h3>Motor de Dados</h3>
        <p>Histórico de rolagens aparecerá aqui.</p>
      </slot>
    </aside>

    <!-- Slot padrão para elementos globais (modais, botões fixos) -->
    <slot />
  </div>
</template>
