import { call } from 'redux-saga/effects'
import createSaga from 'createSaga'

import heroBannerSaga from './heroBannerSaga'

export default createSaga([
  call(heroBannerSaga)
])
