export const SEARCH_WINE_REQUEST = "addWine/SEARCH_WINE_REQUEST";
export const SEARCH_WINE_SUCCEEDED = "addWine/SEARCH_WINE_SUCCEEDED";
export const SEARCH_WINE_FAILED = "addWine/SEARCH_WINE_FAILED";
export const ADD_WINE_REQUEST = "addWine/ADD_WINE_REQUEST";
export const ADD_WINE_SUCCEEDED = "addWine/ADD_WINE_SUCCEEDED";
export const ADD_WINE_FAILED = "addWine/ADD_WINE_FAILED";

const initialState = {
  searchingWine: false,
  searchError: "",
  searchedWine: {},
  addingWine: false,
  addWineError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WINE_REQUEST:
      return {
        ...state,
        searchingWine: true
      };
    case SEARCH_WINE_SUCCEEDED:
      return {
        ...state,
        searchingWine: false,
        searchedWine: action.payload.wine
      };
    case SEARCH_WINE_FAILED:
      return {
        ...state,
        searchingWine: false,
        searchError: action.payload.errorMessage
      };

    case ADD_WINE_REQUEST:
      return {
        ...state,
        addingWine: true
      };
    case ADD_WINE_SUCCEEDED:
      return {
        ...state,
        addingWine: false,
        searchedWine: {}
      };
    case ADD_WINE_FAILED:
      return {
        ...state,
        addingWine: false,
        addWineError: action.payload.errorMessage
      };
    default:
      return initialState;
  }
};
