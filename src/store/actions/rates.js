import * as type from '../types';

function getRate(base, target) {
  return {
    type: type.GET_RATE_REQUESTED,
    base,
    target,
  };
}

function setBase(base) {
  return {
    type: type.SET_BASE,
    base,
  };
}

function setTarget(target) {
  return {
    type: type.SET_TARGET,
    target,
  };
}

function reverse() {
  return {
    type: type.REVERSE,
  };
}

export {
  getRate,
  setBase,
  setTarget,
  reverse,
};
