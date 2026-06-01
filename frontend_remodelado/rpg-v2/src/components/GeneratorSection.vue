<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  items: Array, // [{ label, msg, ora }]
});

const emit = defineEmits(['exec', 'clear']);
</script>

<template>
  <section class="generator-group" :aria-labelledby="'title-' + title">
    <div class="header-actions">
      <h3 :id="'title-' + title">{{ title }}</h3>
    </div>

    <div class="generators-grid">
      <div v-for="(item, index) in items" :key="item.ora" class="generator-card">
        <div class="card-info">
          <span class="category-tag">{{ title }}</span>
          <h4 class="card-title">{{ item.label }}</h4>
        </div>
        
        <div class="card-action">
          <button 
            class="btn-generate" 
            @click="$emit('exec', index)"
            :title="'Gerar ' + item.label"
          >
            Gerar <span class="btn-icon">🎲</span>
          </button>
        </div>

        <div class="card-footer">
          <p class="card-desc">{{ item.msg }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.generator-group {
  margin-bottom: 3rem;
  animation: fadeIn 0.3s ease-out;
  text-align: center; /* Centraliza o título da seção */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.header-actions {
  display: flex;
  justify-content: center; /* Centraliza o cabeçalho */
  border-bottom: 2px solid var(--accent-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
}

.header-actions h3 {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.generators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  text-align: center; /* Centraliza conteúdo dos cards */
}

.generator-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--bg-color);
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 1.2rem;
  align-items: center; /* Garante centralização flex */
}

.generator-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(45, 58, 48, 0.08);
  border-color: var(--border-color);
}

.card-info {
  margin-bottom: 1rem;
  width: 100%;
}

.category-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  background: var(--bg-color);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
}

.card-title {
  margin: 0;
  color: var(--primary-color);
  font-size: 1.15rem;
  font-weight: 800;
}

.card-action {
  margin-bottom: 1rem;
  width: 100%;
}

.btn-generate {
  width: 80%; /* Botão um pouco menor e centralizado */
  margin: 0 auto;
  padding: 0.8rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s, transform 0.1s;
  box-shadow: 0 2px 4px rgba(74, 93, 74, 0.3);
}

.btn-generate:hover {
  background: var(--primary-color);
}

.btn-generate:active {
  transform: scale(0.98);
}

.btn-icon {
  font-size: 1.1rem;
}

.card-footer {
  border-top: 1px solid var(--bg-color);
  padding-top: 0.8rem;
  margin-top: auto;
  width: 100%;
}

.card-desc {
  margin: 0;
  color: var(--text-color);
  opacity: 0.8;
  font-size: 0.8rem;
  line-height: 1.4;
  font-style: italic;
}

/* Responsividade */
@media (max-width: 1200px) {
  .generators-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .generators-grid {
    grid-template-columns: 1fr;
  }
}
</style>
