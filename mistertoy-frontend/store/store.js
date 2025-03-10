import { toyReducer } from "./reducers/toy.reducer.js";
const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())