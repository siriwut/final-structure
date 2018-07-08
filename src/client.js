import uniqueId from 'lodash/uniqueId'
import { fromJS } from 'immutable'
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { ensureReady, After } from '@jaredpalmer/after'

import configureStore from './configureStore'
import './client.css'
import routes from './routes'


const { store, history, runSaga, closeSaga } = configureStore(fromJS(window.__PRELOADED_STATE__))


async function render() {
  let sagaTask = await runSaga()
  const data = await ensureReady(routes)

  return hydrate(
    <StoreProvider key={uniqueId()} store={store}>
      <ConnectedRouter history={ history }>
      <BrowserRouter>
        <After data={data} routes={routes} />
      </BrowserRouter>
      </ConnectedRouter>
    </StoreProvider>,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept('./sags', () => {
      const getNewSagas = require('./saga');
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = runSaga(function* replacedSaga (action) {
          yield getNewSagas()
        })
      })
    })
  }
}

render()


if (module.hot) {
  module.hot.accept()
}
