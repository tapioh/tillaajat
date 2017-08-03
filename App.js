import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import {
  Image,
  StyleSheet
} from 'react-native'
import PickView from './containers/PickView'
import players from './players'

const backgroundImage = require('./assets/images/app-background.jpg')

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Image source={backgroundImage} style={styles.backgroundImage}>
          <PickView players={players} />
        </Image>
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
})
