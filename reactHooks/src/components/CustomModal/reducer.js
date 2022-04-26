// reducer
export const modalReducer = (state = {hiding: {}}, action) => {
  switch (action.type) {
    case "custom-modal/show":
      return {
        ...state,
        [action.payload.modalId]: action.payload.args || true,
        hiding: {
          ...state.hiding,
          [action.payload.modalId]: false
        }
      }
    case "custom-modal/hide":
      return action.payload.force
        ? {
          ...state,
          [action.payload.modalId]: false,
          hiding: {[action.payload.modalId]: false},
        }
        : {...state, hiding: {[action.payload.modalId]: true}};
    default:
      return state;
  }
}