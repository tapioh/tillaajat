import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Navigator from './containers/Navigator'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
