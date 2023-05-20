const addressReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADDRESS':
        return action.payload;
      case 'UNSET_ADDRESS':
        return [];
      default:
        return state;
    }
  };
  
  
  export default addressReducer;