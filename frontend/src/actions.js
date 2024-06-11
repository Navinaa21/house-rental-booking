export const openModal = (houseId) => ({
    type: 'OPEN_MODAL',
    payload: houseId,
  });
  
  export const closeModal = () => ({
    type: 'CLOSE_MODAL',
  });