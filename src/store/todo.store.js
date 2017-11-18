import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index";

export default function configureStore(initState) {
    let store = createStore(rootReducer,initState,applyMiddleware(thunk));
    return store;
}