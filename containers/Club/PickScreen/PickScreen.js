import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import PlayerPool from './components/PlayerPool'
import PlayerPicker from './components/PlayerPicker'
import { colors, shadows } from '../../../styles'

const PLAYER_POOL_CONTAINER_HEIGHT_IN_PX = 240
const SCREEN_HEIGHT = Dimensions.get('window').height
const topIllustrationImage = require('../../../assets/images/app-top-illustration.jpg')

export default class PickScreen extends React.Component {
  render() {
    return (
      <View style={styles.pickScreen}>
        <Image source={topIllustrationImage} style={styles.topIllustrationImage} />
        <View>
          <View style={styles.playerPoolWrapper}>
            <PlayerPool navigator={this.props.navigator} />
          </View>
          <View style={[styles.playerPickerWrapper, shadows.defaultBoxShadow]}>
            <PlayerPicker />
          </View>
        </View>
      </View>
    )
  }
}

PickScreen.propTypes = {
  navigator: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  pickScreen: {
    backgroundColor: colors.backgroundGrey
  },
  topIllustrationImage: {
    height: 190,
    width: '100%',
    marginBottom: -170
  },
  playerPoolWrapper: {
    justifyContent: 'center',
    marginHorizontal: 15,
    height: 250,
    marginBottom: -30,
    zIndex: 1
  },
  playerPickerWrapper: {
    height: SCREEN_HEIGHT - PLAYER_POOL_CONTAINER_HEIGHT_IN_PX,
    backgroundColor: 'white'
  }
})
