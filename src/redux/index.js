import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import products from "./reducers/productReducers";
import thunk from "redux-thunk";

const initialState = {}

const rootReducer = combineReducers({
    products
})


export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))