import * as type from '../types';

const initialState = {
  symbols: {},
  tickers: [],
  fullNames: [],
  loading: false,
  error: null,
  success: false,
};

export default function symbols(state = initialState, action) {
  switch (action.type) {
    case type.GET_SYMBOLS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_SYMBOLS_SUCCESS:
      return {
        ...state,
        loading: false,
        symbols: action.symbols.symbols,
        tickers: Object.keys(action.symbols.symbols),
        fullNames: Object.values(action.symbols.symbols),
        success: true,
      };
    case type.GET_SYMBOLS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
