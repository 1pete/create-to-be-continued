import OfflineRuntime from 'offline-plugin/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './containers/App'
import configureStore from './configureStore'

OfflineRuntime.install({
  onUpdateReady: () => {
    OfflineRuntime.applyUpdate()
  },
  onUpdated: () => {
    window.location.reload()
  },
})

const store = configureStore()

const renderApp = Component =>
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
)

renderApp(App)

if (__DEV__ && module.hot) {
  module.hot.accept('./containers/App', () => {
    renderApp(App)
  })
}
