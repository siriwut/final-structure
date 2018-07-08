import { call } from 'redux-saga/effects'
import createSaga from 'createSaga'

import homeSaga from 'modules/home/sagas'

export default createSaga([
  call(homeSaga)
])
