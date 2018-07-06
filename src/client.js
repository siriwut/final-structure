import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { ensureReady, After } from '@jaredpalmer/after'

import configureStore from './configureStore'
import './client.css'
import routes from './routes'

const history = createBrowserHistory()
const store = configureStore({ history })

ensureReady(routes).then(data =>
  hydrate(
    <StoreProvider store={store}>
      <ConnectedRouter history={history}>
        <After data={data} routes={routes} />
      </ConnectedRouter>
    </StoreProvider>,
    document.getElementById('root')
  )
)

if (module.hot) {
  module.hot.accept()
}
