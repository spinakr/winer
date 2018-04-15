import { combineReducers } from "redux";
import addWine from "./addWineReducer";
import wineList from "./wineListReducer";

export default combineReducers({
  addWine,
  wineList
});
