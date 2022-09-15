/* eslint-disable max-len */
import * as type from '../types';

const initialState = {
  pairs: [],
  loading: false,
  error: null,
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case type.ADD_FAVORITE:
      return {
        ...state,
        pairs: [...state.pairs, { base: action.base, target: action.target }],
      };
    case type.REMOVE_FAVORITE:
      return {
        ...state,
        pairs: state.pairs.filter(({ base, target }) => !(base === action.base && target === action.target)),
      };

    case type.GET_FAV_RATES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_FAV_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        rate: action.rate.rates,
      };
    case type.GET_FAV_RATES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}
