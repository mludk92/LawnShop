const saleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SALE':
      return action.payload;
    case 'SET_NEWSALE': // Update the action type for adding a new sale
      return [...state, action.payload]; // Add the new sale to the state array
    case 'UNSET_SALE':
      return [];
    default:
      return state;
  }
};

export default saleReducer;
