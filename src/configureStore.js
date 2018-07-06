import { takeEvery } from 'redux-saga/effects'
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import rootReducer from './reducer'
import rootSaga from './saga'

export default function configureStore({ initialState = {}, history } = {}) {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
    logger,
  ]

  const store = createReduxStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(...middleware),
      composeWithDevTools(),
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}
