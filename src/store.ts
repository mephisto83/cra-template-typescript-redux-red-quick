import { combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, compose } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension'
import { CounterReducer } from './features/counter'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  count: CounterReducer,
  /*SWAP-SLICES*/
})

const middleWare = [thunkMiddleware];
const composeEnhancers = ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as any) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleWare)));


export default store;