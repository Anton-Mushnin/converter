import clm from 'country-locale-map';
import * as type from '../types';

const base = clm.getCurrencyByAlpha2(Intl.DateTimeFormat().resolvedOptions().locale.slice(-2));

const initialState = {
  rate: null,
  base,
  target: 'qq',
  loading: false,
  error: null,
};

export default function rates(state = initialState, action) {
  switch (action.type) {
    case type.SET_BASE: {
      return {
        ...state,
        base: action.base,
      };
    }

    case type.SET_TARGET: {
      return {
        ...state,
        target: action.target,
      };
    }
    case type.REVERSE: {
      return {
        ...state,
        base: state.target,
        target: state.base,
      };
    }
    case type.GET_RATE_REQUESTED:
      return {
        ...state,
        loading: true,
        rate: null,
      };
    case type.GET_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        rate: action.rate.rates,
      };
    case type.GET_RATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
