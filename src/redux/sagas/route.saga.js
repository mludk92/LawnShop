import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will make call to server for directions API 
function* fetchRoute(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.post('/api/route', { addresses: action.payload }, config);

    yield put({ type: 'SET_ROUTE', payload: response.data });
  } catch (error) {
    console.log('Route GET request failed', error);
  }
}

function* routeSaga() {
  yield takeLatest('FETCH_ROUTE', fetchRoute);
}

export default routeSaga;
