import { ref } from 'vue';

const isResultPopupOpen = ref(false);
const currentResult = ref({ label: '', value: '' });

export const useResultPopup = () => {
    const showResult = (label, value) => {
        currentResult.value = { label, value };
        isResultPopupOpen.value = true;
    };

    const closeResultPopup = () => {
        isResultPopupOpen.value = false;
    };

    return {
        isResultPopupOpen,
        currentResult,
        showResult,
        closeResultPopup
    };
};
