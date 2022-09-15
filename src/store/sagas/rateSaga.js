import { call, put, takeEvery } from 'redux-saga/effects';
import API_KEY from '../../config/exchangeAPI';

function getApi(action) {
  const apiUrl = `https://api.apilayer.com/exchangerates_data/latest?symbols=${[action.target]}&base=${action.base}`;
  const myHeaders = new Headers();
  myHeaders.append('apikey', API_KEY);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  return fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .catch((error) => { throw error; });
}

function* fetchRate(action) {
  try {
    const rate = yield call(getApi, action);
    yield put({ type: 'GET_RATE_SUCCESS', rate });
  } catch (e) {
    yield put({ type: 'GET_RATE_FAILED', message: e.message });
  }
}

function* rateSaga() {
  yield takeEvery('GET_RATE_REQUESTED', fetchRate);
}

export default rateSaga;
