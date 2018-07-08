import { END } from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'
import createSaga from 'createSaga'

import { heroBanner } from '../reducers'

const { types, actions } = heroBanner

export default createSaga([
  takeEvery(types.LOAD_BANNERS, loadBanners),
])

export function* loadBanners() {
  const banners = [
    { key: 1, link: '', image: '' },
    { key: 2, link: '', image: '' },
    { key: 3, link: '', image: '' },
    { key: 4, link: '', image: '' }
  ]

  yield put(actions.loadBannersSuccess(banners))
}
