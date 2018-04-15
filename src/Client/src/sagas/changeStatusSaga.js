import { call, put, takeLatest } from "redux-saga/effects";
import {
  MOVE_WINE_TO_ARCHIVE_REQUEST,
  MOVE_WINE_TO_ARCHIVE_SUCCESS,
  MOVE_WINE_TO_ARCHIVE_FAILED,
  MOVE_WINE_TO_INVENTORY_REQUEST,
  MOVE_WINE_TO_INVENTORY_SUCCESS,
  MOVE_WINE_TO_INVENTORY_FAILED
} from "../reducers/wineListReducer";
import writeService from "../api/wineWriteService";

function* moveToArchive(action) {
  const { success, error } = yield call(
    writeService.moveToArchive,
    action.payload.wineId
  );

  if (success) {
    yield put({
      type: MOVE_WINE_TO_ARCHIVE_SUCCESS,
      payload: { wineId: action.payload.wineId }
    });
  } else {
    yield put({
      type: MOVE_WINE_TO_ARCHIVE_FAILED,
      payload: { errorMessage: error }
    });
  }
}

function* moveToInventory(action) {
  const { success, error } = yield call(
    writeService.moveToInventory,
    action.payload.wineId
  );

  if (success) {
    yield put({
      type: MOVE_WINE_TO_INVENTORY_SUCCESS,
      payload: { wineId: action.payload.wineId }
    });
  } else {
    yield put({
      type: MOVE_WINE_TO_INVENTORY_FAILED,
      payload: { errorMessage: error }
    });
  }
}

export default function* changeStatusSaga() {
  yield takeLatest(MOVE_WINE_TO_ARCHIVE_REQUEST, moveToArchive);
  yield takeLatest(MOVE_WINE_TO_INVENTORY_REQUEST, moveToInventory);
}
