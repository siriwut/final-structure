import { all } from 'redux-saga/effects'

export default (sagas = []) => function* saga() {
  yield all(sagas)
}
