// featuredReducer.js

const featuredReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FEATURED':
      return action.payload;
    case 'UNSET_FEATURED':
      return [];
    default:
      return state;
  }
};

export default featuredReducer;
