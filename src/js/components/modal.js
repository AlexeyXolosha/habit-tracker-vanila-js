// TODO работа с фокусом. 

let activeModal = null;
let isInitialized = false;
const OPEN_CLASS = 'expanded'

export function openModal(name) {
    const modal = document.querySelector(`[data-modal="${name}"]`)
    if (!modal) return;
    if (modal === activeModal) return
    closeModal()

    activeModal = modal;
    modal.classList.add(OPEN_CLASS)
}

export function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove(OPEN_CLASS)
    activeModal = null;
}

function onDocumentClick(event) {
    const openButtonModal = event.target.closest('[data-open-modal]')

    if (openButtonModal) {
        const modalName = openButtonModal.dataset.openModal
        openModal(modalName);
        return;
    }

    const closeBtn = event.target.closest('[data-close-modal]');

    if (closeBtn) {
        closeModal();
    }
}

function onDocumentKeydown(event) {
    if (event.key !== 'Escape') return;
    if (event.defaultPrevented) return;

    if (!activeModal) return;

    event.preventDefault();
    closeModal();
}

export function initModal() {
    if (isInitialized) {
        console.warn('initModal: уже инициализирован, повторный вызов проигнорирован');
        return;
    }
    isInitialized = true;

    document.addEventListener("click", onDocumentClick)
    document.addEventListener("keydown", onDocumentKeydown)
}

export function destroyModal() {
    if (!isInitialized) return;
    closeModal()
    document.removeEventListener("click", onDocumentClick)
    document.removeEventListener("keydown", onDocumentKeydown)
    isInitialized = false
}