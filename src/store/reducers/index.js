import { combineReducers } from 'redux';
import symbols from './symbols';

const rootReducer = combineReducers({
  symbols,
  // rates,
  // favs,
});

export default rootReducer;
