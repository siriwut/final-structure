import { takeEvery } from 'redux-saga/effects'
import createSaga from 'createSaga'

export default createSaga([
  takeEvery('tape', loadBanners)
])

export function* loadBanners() {
  console.log('---hero banner==')
  yield
}
