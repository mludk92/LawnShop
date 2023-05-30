const routeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ROUTE':
        return action.payload;
      case 'UNSET_ROUTE':
        return [];
      default:
        return state;
    }
  };
  
  
  export default routeReducer;