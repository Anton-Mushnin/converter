import * as type from '../types';

function addPair(base, target) {
  return {
    type: type.ADD_FAVORITE,
    base,
    target,
  };
}

function removePair(base, target) {
  return {
    type: type.REMOVE_FAVORITE,
    base,
    target,
  };
}

export {
  addPair,
  removePair,
};
