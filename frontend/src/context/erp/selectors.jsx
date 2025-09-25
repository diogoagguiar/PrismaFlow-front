const contextSelectors = (state) => {
  return {
    isModalOpen: () => {
      return state.deleteModal?.isOpen || false; // ← Corrigido
    },
    isPanelOpen: () => {
      return state.isPanelOpen;
    },
    isBoxOpen: () => {
      return state.isBoxOpen;
    },
  };
};

export default contextSelectors;