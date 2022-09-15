import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistedState = localStorage.getItem('converterReduxState')
  ? JSON.parse(localStorage.getItem('converterReduxState'))
  : {};

const store = compose(
  applyMiddleware(sagaMiddleware),
  // eslint-disable-next-line no-underscore-dangle
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('converterReduxState', JSON.stringify(store.getState()));
});

sagaMiddleware.run(rootSaga);

export default store;
