/**
 * A11yManager.js
 * 
 * Gerenciador de acessibilidade para o novo sistema.
 * Fornece utilitários para anúncios em leitores de tela e gerenciamento de foco.
 */

/**
 * Anuncia uma mensagem para leitores de tela usando uma região ARIA live.
 * 
 * @param {string} message - A mensagem a ser anunciada.
 * @param {string} priority - 'polite' (padrão) ou 'assertive'.
 */
export const announce = (message, priority = 'polite') => {
    let announcer = document.getElementById('a11y-announcer');
    
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'a11y-announcer';
        announcer.setAttribute('aria-live', priority);
        announcer.setAttribute('aria-atomic', 'true');
        announcer.classList.add('sr-only'); // Classe para esconder visualmente
        document.body.appendChild(announcer);
    } else {
        announcer.setAttribute('aria-live', priority);
    }

    // Limpa e define o texto para forçar o anúncio
    announcer.textContent = '';
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
};

/**
 * Move o foco para um elemento específico e garante que ele seja acessível.
 * 
 * @param {string|HTMLElement} element - Seletor CSS ou elemento DOM.
 */
export const focusElement = (element) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
        el.setAttribute('tabindex', '-1');
        el.focus();
    }
};

/**
 * Gerencia a navegação por teclado em menus de abas (Tabs pattern).
 * 
 * @param {KeyboardEvent} event - O evento de teclado.
 * @param {Array<HTMLElement>} tabs - Lista de elementos de aba.
 * @param {number} currentIndex - Índice da aba atual.
 * @returns {number|null} O novo índice ou null se não houver mudança.
 */
export const handleTabNavigation = (event, tabs, currentIndex) => {
    const { key } = event;
    let newIndex = null;

    if (key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabs.length;
    } else if (key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (key === 'Home') {
        newIndex = 0;
    } else if (key === 'End') {
        newIndex = tabs.length - 1;
    }

    if (newIndex !== null) {
        event.preventDefault();
        tabs[newIndex].focus();
        return newIndex;
    }

    return null;
};
