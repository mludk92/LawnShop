const saleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SALE':
      return action.payload;
    case 'UNSET_Sale':
      return [];
    default:
      return state;
  }
};


export default saleReducer;
