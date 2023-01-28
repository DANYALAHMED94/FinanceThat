import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as toastrReducer } from "react-redux-toastr";
import componentFilterReducer from './_reducers/component.redireaction.reducer'
const rootReducer = combineReducers({
  toastr: toastrReducer, // <- Mounted at toastr.
  componentFilterReducer
});
const composeEnhancers = composeWithDevTools({
  serialize: true,
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});
const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;
