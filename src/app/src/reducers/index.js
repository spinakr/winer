import { combineReducers } from "redux";
import addWineForm from "./addWineForm";
import wineList from "./wineListReducer";

export default combineReducers({
  addWineForm,
  wineList
});
