import { combineReducers } from 'redux';
import symbols from './symbols';
import rates from './rates';
import favorites from './favorites';

const rootReducer = combineReducers({
  symbols,
  rates,
  favorites,
});

export default rootReducer;
