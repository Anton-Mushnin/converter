import { all } from 'redux-saga/effects';
import symbolSaga from './symbolSaga';

export default function* rootSaga() {
  yield all([
    symbolSaga(),
  ]);
}
