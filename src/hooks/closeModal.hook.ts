const dismiss = () => {
    const elem = document.querySelector<HTMLDivElement>('[data-state="open"]');
    if(elem !== null) {
        elem.click();
    }
}

export const useCloseModal = () => {
    return {
        dismiss
    }
}
