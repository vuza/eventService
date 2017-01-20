import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import eventServiceApp from './reducers'
import * as actions from './actions'
import App from './container/App'
import thunkMiddleware from 'redux-thunk'

let store = createStore(
    eventServiceApp,
    applyMiddleware(
        thunkMiddleware
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(actions.fetchEvents())
