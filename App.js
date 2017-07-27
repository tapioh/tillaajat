import React from 'react'
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
      <Image source={backgroundImage} style={styles.backgroundImage}>
        <PickView players={players} />
      </Image>
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
