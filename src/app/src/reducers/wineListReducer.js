export const FETCH_MORE_WINES_REQUEST = "wineList/FETCH_MORE_WINES_REQUEST";
export const FETCH_MORE_WINES_SUCCEEDED = "wineList/FETCH_MORE_WINES_SUCCEEDED";
export const FETCH_MORE_WINES_FAILED = "wineList/FETCH_MORE_WINES_FAILED";
export const CLEAR_WINES_LIST = "wineList/CLEAR_WINES_LIST";

const initialState = {
  fetchingWines: false,
  fetchError: "",
  wines: [],
  currentPage: 1,
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MORE_WINES_REQUEST:
      return {
        ...state,
        fetchingWines: true
      };
    case FETCH_MORE_WINES_SUCCEEDED:
      return {
        ...state,
        fetchingWines: false,
        wines: state.wines.concat(action.payload.wines),
        count: action.payload.count,
        currentPage: state.currentPage + 1
      };
    case FETCH_MORE_WINES_FAILED:
      return {
        ...state,
        fetchingWines: false,
        fetchError: action.payload.errorMessage
      };
    case CLEAR_WINES_LIST:
      return initialState;
    default:
      return initialState;
  }
};
