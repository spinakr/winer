import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import fetchMoreWinesSaga from "./sagas/fetchMoreWinesSaga";
import searchWinesSaga from "./sagas/searchWinesSaga";

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(reducers, initialState, composedEnhancers);

sagaMiddleware.run(fetchMoreWinesSaga);
sagaMiddleware.run(searchWinesSaga);

export default store;
