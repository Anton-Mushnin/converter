import { call, put, takeEvery } from 'redux-saga/effects';
import API_KEY from '../../config/exchangeAPI';

function getApi(action) {
  const DEFAULT_BASE = 'EUR';
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(endDate.getDate() - 1);
  const startDateString = startDate.toISOString().slice(0, 10);
  const endDateString = endDate.toISOString().slice(0, 10);
  console.log(startDateString, endDateString);

  const apiUrl = `https://api.apilayer.com/exchangerates_data/timeseries?symbols=${action.target}&base=${DEFAULT_BASE}&start_date=${startDateString}&end_date=${endDateString}`;
  const myHeaders = new Headers();
  myHeaders.append('apikey', API_KEY);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };

  return fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return { yesterday: data.rates[startDateString], today: data.rates[endDateString] };
    })
    .catch((error) => { throw error; });
}

function* fetchRate(action) {
  try {
    const rates = yield call(getApi, action);
    console.log(rates);
    yield put({ type: 'GET_FAV_RATES_SUCCESS', yesterday: rates.yesterday, today: rates.today });
  } catch (e) {
    yield put({ type: 'GET_FAV_RATES_FAILED', message: e.message });
  }
}

function* favoriteSaga() {
  yield takeEvery('GET_FAV_RATES_REQUESTED', fetchRate);
}

export default favoriteSaga;
