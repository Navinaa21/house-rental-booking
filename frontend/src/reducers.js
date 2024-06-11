const initialState = {
    showModal: false,
    modalHouseId: null,
  };
  
  const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          showModal: true,
          modalHouseId: action.payload,
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          showModal: false,
          modalHouseId: null,
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;