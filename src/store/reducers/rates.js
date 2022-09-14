import * as type from '../types';

const initialState = {
  rate: null,
  loading: false,
  error: null,
};

export default function rates(state = initialState, action) {
  switch (action.type) {
    case type.GET_RATE_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_RATE_SUCCESS:
      console.log('qq', action.rate.rates);
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
