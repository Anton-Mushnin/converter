import * as type from '../types';

const initialState = {
  pairs: [],
  loading: false,
  error: null,
  reload: true,
};

export default function favorites(state = initialState, action) {
  switch (action.type) {
    case type.ADD_FAVORITE:
      return {
        ...state,
        reload: true,
        pairs: [...state.pairs, { base: action.base, target: action.target }],
      };
    case type.REMOVE_FAVORITE:
      return {
        ...state,
        reload: false,
        pairs: state.pairs.filter(
          ({ base, target }) => (base + target !== action.base + action.target),
        ),
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
        reload: false,
        pairs: state.pairs.map((pair) => ({
          ...pair,
          yesterday: action.yesterday[pair.target] / action.yesterday[pair.base],
          today: action.today[pair.target] / action.today[pair.base],
        })),
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
