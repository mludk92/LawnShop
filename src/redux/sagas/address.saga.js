import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ADDRESS" actions
function* fetchAddress() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/address', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ADDRESS', payload: response.data });
  } catch (error) {
    console.log('Sale get request failed', error);
  }
}

function* addressSaga() {
  yield takeLatest('FETCH_ADDRESS', fetchAddress);
}

export default addressSaga;
