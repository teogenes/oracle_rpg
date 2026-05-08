import { ref } from 'vue';

const globalHistory = ref([]);

export const useHistory = () => {
    const addToHistory = (label, value) => {
        if (!value) return;
        
        globalHistory.value.unshift({
            id: Date.now() + Math.random(),
            label,
            value,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // Limita o histórico para as últimas 50 entradas para performance
        if (globalHistory.value.length > 50) {
            globalHistory.value.pop();
        }
    };

    const clearGlobalHistory = () => {
        globalHistory.value = [];
    };

    return {
        globalHistory,
        addToHistory,
        clearGlobalHistory
    };
};
