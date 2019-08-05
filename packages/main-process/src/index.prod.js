import React from 'react'
import ReactDOM from 'react-dom'

import './favicons'
import configureStore from 'store'
import App from 'scenes/app.js'
import Error from './index.error'

const renderApp = (Component, store, history) => {
  ReactDOM.render(
    <Component store={store} history={history} />,
    document.getElementById('app')
  )
}

const renderError = () => {
  ReactDOM.render(<Error />, document.getElementById('app'))
}

configureStore()
  .then(root => {
    renderApp(App, root.store, root.history)
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.info(e)
    renderError(e)
  })
