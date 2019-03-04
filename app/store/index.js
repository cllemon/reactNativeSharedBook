import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import fusionReducers from './reducer/index';

const reducers = combineReducers(fusionReducers);
const createAsyncStoreMiddleware = applyMiddleware(thunk)(createStore);
const store = createAsyncStoreMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
