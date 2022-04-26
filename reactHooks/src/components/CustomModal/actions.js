// action
export function showModal(modalId, args) {
  return {
    type: "custom-modal/show",
    payload: {
      modalId,
      args,
    },
  }
}

export function hideModal(modalId, force) {
  return {
    type: "custom-modal/hide",
    payload: {
      modalId,
      force,
    },
  };
}