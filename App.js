import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Navigator from './navigator'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
