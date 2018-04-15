import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEARCH_WINE_REQUEST,
  SEARCH_WINE_SUCCEEDED,
  SEARCH_WINE_FAILED
} from "../reducers/addWineReducer";
import readService from "../api/wineReadService";

function* searchWine(action) {
  const { wine, error } = yield call(
    readService.searchWine,
    action.payload.vinmonopoletId
  );

  if (error) {
    yield put({
      type: SEARCH_WINE_FAILED,
      payload: { errorMessage: error.Message }
    });
  } else {
    yield put({
      type: SEARCH_WINE_SUCCEEDED,
      payload: {
        wine
      }
    });
  }
}

export default function* fetchMoreWinesSaga() {
  yield takeLatest(SEARCH_WINE_REQUEST, searchWine);
}
