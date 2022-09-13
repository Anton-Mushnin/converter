import * as type from '../types';

function getSymbols(symbols) {
  return {
    type: type.GET_SYMBOLS_REQUESTED,
    payload: symbols,
  };
}

export default getSymbols;
