import { all } from 'redux-saga/effects';
import symbolSaga from './symbolSaga';
import rateSaga from './rateSaga';
import favoriteSaga from './favoriteSaga';

export default function* rootSaga() {
  yield all([
    symbolSaga(),
    rateSaga(),
    favoriteSaga(),
  ]);
}
