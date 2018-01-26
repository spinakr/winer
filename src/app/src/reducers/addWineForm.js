const SOME_ACTION = "addWineForm/something";

const initialState = {
  something: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SOME_ACTION:
      return {
        ...state,
        something: action.something
      };
    default:
      return initialState;
  }
};
