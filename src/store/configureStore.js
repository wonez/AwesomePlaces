import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import places from './reducers/places';
import ui from './reducers/ui';
import auth from './reducers/auth'

export function configureStore(){

    const reducers = combineReducers({
        placeReducer: places,
        uiReducer: ui,
        authReducer: auth
    })

    let composeEnhancers = compose;

    if(__DEV__){
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    }

    return createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
}