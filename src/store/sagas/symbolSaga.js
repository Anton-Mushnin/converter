import { call, put, takeEvery } from 'redux-saga/effects';
import API_KEY from '../../config/exchangeAPI';

const apiUrl = 'https://api.apilayer.com/exchangerates_data/symbols';
function getApi() {
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

function* fetchSymbols() {
  try {
    const symbols = yield call(getApi);
    yield put({ type: 'GET_SYMBOLS_SUCCESS', symbols });
  } catch (e) {
    yield put({ type: 'GET_SYMBOLS_FAILED', message: e.message });
  }
}

function* symbolSaga() {
  yield takeEvery('GET_SYMBOLS_REQUESTED', fetchSymbols);
}

export default symbolSaga;
