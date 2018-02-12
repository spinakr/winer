export const FETCH_MORE_WINES_REQUEST = "wineList/FETCH_MORE_WINES_REQUEST";
export const FETCH_MORE_WINES_SUCCEEDED = "wineList/FETCH_MORE_WINES_SUCCEEDED";
export const FETCH_MORE_WINES_FAILED = "wineList/FETCH_MORE_WINES_FAILED";
export const CLEAR_WINES_LIST = "wineList/CLEAR_WINES_LIST";

export const MOVE_WINE_TO_ARCHIVE_REQUEST = "MOVE_WINE_TO_ARCHIVE_REQUEST";
export const MOVE_WINE_TO_ARCHIVE_SUCCESS = "MOVE_WINE_TO_ARCHIVE_SUCCESS";
export const MOVE_WINE_TO_ARCHIVE_FAILED = "MOVE_WINE_TO_ARCHIVE_FAILED";

export const MOVE_WINE_TO_INVENTORY_REQUEST = "MOVE_WINE_TO_INVENTORY_REQUEST";
export const MOVE_WINE_TO_INVENTORY_SUCCESS = "MOVE_WINE_TO_INVENTORY_SUCCESS";
export const MOVE_WINE_TO_INVENTORY_FAILED = "MOVE_WINE_TO_INVENTORY_FAILED";

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

    case MOVE_WINE_TO_ARCHIVE_REQUEST:
      return {
        ...state
      };
    case MOVE_WINE_TO_ARCHIVE_SUCCESS:
      return {
        ...state,
        wines: state.wines.filter(wine => {
          return wine.id !== action.payload.wineId;
        })
      };
    case MOVE_WINE_TO_ARCHIVE_FAILED:
      return {
        ...state
      };

    case MOVE_WINE_TO_INVENTORY_REQUEST:
      return {
        ...state
      };
    case MOVE_WINE_TO_INVENTORY_SUCCESS:
      return {
        ...state,
        wines: state.wines.filter(wine => {
          return wine.id !== action.payload.wineId;
        })
      };
    case MOVE_WINE_TO_INVENTORY_FAILED:
      return {
        ...state
      };

    default:
      return initialState;
  }
};
