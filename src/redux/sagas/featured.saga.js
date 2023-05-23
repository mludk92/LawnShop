import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_SALE" and "DELETE_FEATURED_ITEM" actions
function* fetchFeatured() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/featured', config);

    yield put({ type: 'SET_FEATURED', payload: response.data });
  } catch (error) {
    console.log('Featured get request failed', error);
  }
}

function* deleteFeaturedItem(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.delete('/api/featured', { data: action.payload }, config);

    // After successful delete, fetch the updated featured items
    yield put({ type: 'FETCH_FEATURED' });
  } catch (error) {
    console.log('Featured delete request failed', error);
  }
}

function* insertFeaturedItem(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    yield axios.post('/api/featured', action.payload, config);

    // After successful insert, fetch the updated featured items
    yield put({ type: 'FETCH_FEATURED' });
  } catch (error) {
    console.log('Featured POST request failed', error);
  }
}

function* featuredSaga() {
  yield takeLatest('FETCH_FEATURED', fetchFeatured);
  yield takeLatest('DELETE_FEATURED_ITEM', deleteFeaturedItem);
  yield takeLatest('INSERT_FEATURED', insertFeaturedItem);
}

export default featuredSaga;
