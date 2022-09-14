import { all } from 'redux-saga/effects';
import symbolSaga from './symbolSaga';
import rateSaga from './rateSaga';

export default function* rootSaga() {
  yield all([
    symbolSaga(),
    rateSaga(),
  ]);
}
