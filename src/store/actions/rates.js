import * as type from '../types';

function getRate(base, target) {
  return {
    type: type.GET_RATE_REQUESTED,
    payload: { base, target },
  };
}

export default getRate;
