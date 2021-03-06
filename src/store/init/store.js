import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {initialStore} from "./initial-store.js";
import thunk from "redux-thunk";

import favoritesState from '../reducers/favorites-window-reducer'
import filtersState from '../reducers/filters-window-reducer'
import charactersState from '../reducers/characters-reducer'

const reducers = combineReducers({
    favoritesState,
    filtersState,
    charactersState
});

const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const middlewareEnhancer = applyMiddleware(thunk);

export const store = createStore(reducers, initialStore, composeSetup(middlewareEnhancer));