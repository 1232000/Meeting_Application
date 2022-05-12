import { combineReducers, createStore, applyMiddleware } from "redux";
import authReducer from "./reducers/auth";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    auth: authReducer,
});
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
