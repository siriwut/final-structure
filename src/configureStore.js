import { fromJS } from 'immutable'
import { takeEvery, put } from 'redux-saga/effects'
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import rootReducer from './reducer'
import rootSaga from './saga'

export const initialState = fromJS({})

const configureStore = (state = initialState, reducer, { middleware = [], reduxDevTools } = {}) => {
  const history = process.env.BROWSER
    ? createBrowserHistory()
    : createMemoryHistory()

    const composedMiddleware = reduxDevTools
      ? compose(
        applyMiddleware(...middleware),
        reduxDevTools
      )
      : applyMiddleware(...middleware)


    const store = createReduxStore(
      connectRouter(history)(reducer),
      state,
      composedMiddleware
    )

    return {
      store,
      history,
    }
}


const configureStoreProd = (state = initialState) => {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ]

  const { store, history } = configureStore(state, rootReducer, { middleware })

  return {
    store,
    history,
    runSaga: customSaga => sagaMiddleware.run(customSaga ? customSaga : rootSaga),
    closeSaga: () => store.dispatch(END)
  }
}

const configureStoreDev = (state = initialState) => {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ]

  const { store, history } = configureStore(
    state,
    rootReducer,
    {
      middleware,
      reduxDevTools: composeWithDevTools()
    })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default
      store.replaceReducer(connectRouter(history)(nextRootReducer))
    })
  }

  return {
    store,
    history,
    runSaga: customSaga => sagaMiddleware.run(customSaga ? customSaga : rootSaga),
    closeSaga: () => store.dispatch(END)
  }
}

export default process.env.NODE_ENV === 'production'
  ? configureStoreProd
  : configureStoreDev
