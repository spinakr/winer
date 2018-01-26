export const SEARCH_WINE_REQUEST = "addWine/SEARCH_WINE_REQUEST";
export const SEARCH_WINE_SUCCEEDED = "addWine/SEARCH_WINE_SUCCEEDED";
export const SEARCH_WINE_FAILED = "addWine/SEARCH_WINE_FAILED";
export const CLEAR_SEARCH_LIST = "addWine/CLEAR_SEARCH_LIST";

const initialState = {
  searchingWines: false,
  searchError: "",
  searchedWines: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WINE_REQUEST:
      return {
        ...state,
        searchingWines: true
      };
    case SEARCH_WINE_SUCCEEDED:
      return {
        ...state,
        searchingWines: false,
        searchedWines: [...state.searchedWines, action.payload.wine]
      };
    case SEARCH_WINE_FAILED:
      return {
        ...state,
        searchingWines: false,
        searchError: action.payload.errorMessage
      };
    case CLEAR_SEARCH_LIST:
      return initialState;
    default:
      return initialState;
  }
};
