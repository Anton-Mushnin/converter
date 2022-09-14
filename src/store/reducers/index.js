import { combineReducers } from 'redux';
import symbols from './symbols';
import rates from './rates';

const rootReducer = combineReducers({
  symbols,
  rates,
  // favs,
});

export default rootReducer;
