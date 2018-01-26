import { select, call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_MORE_WINES_REQUEST,
  FETCH_MORE_WINES_SUCCEEDED,
  FETCH_MORE_WINES_FAILED
} from "../reducers/wineListReducer";
import { fetchMoreWinesFromApi } from "../api/wineService";

function* fetchMoreWines(action) {
  const page = yield select(state => state.wineList.currentPage);
  const response = yield call(
    fetchMoreWinesFromApi,
    action.payload.status,
    page
  );

  const { wines, count, error } = response;
  if (error) {
    yield put({
      type: FETCH_MORE_WINES_FAILED,
      payload: { errorMessage: error.Message }
    });
  } else {
    yield put({
      type: FETCH_MORE_WINES_SUCCEEDED,
      payload: {
        wines,
        count
      }
    });
  }
}

export default function* fetchMoreWinesSaga() {
  yield takeLatest(FETCH_MORE_WINES_REQUEST, fetchMoreWines);
}
