import { call, put, takeLatest } from "redux-saga/effects";
import {
  ADD_WINE_REQUEST,
  ADD_WINE_SUCCEEDED,
  ADD_WINE_FAILED
} from "../reducers/addWineReducer";
import writeService from "../api/wineWriteService";

function* addWine(action) {
  const { success, error } = yield call(
    writeService.saveWine,
    action.payload.vinmonopoletId
  );

  if (success) {
    yield put({
      type: ADD_WINE_SUCCEEDED
    });
  } else {
    yield put({
      type: ADD_WINE_FAILED,
      payload: { errorMessage: error }
    });
  }
}

export default function* addWineSaga() {
  yield takeLatest(ADD_WINE_REQUEST, addWine);
}
