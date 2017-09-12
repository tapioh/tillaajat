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
import TopIllustrationImage from '../../../components/TopIllustrationImage'
import { colors, shadows } from '../../../styles'

const PLAYER_POOL_CONTAINER_HEIGHT_IN_PX = 240
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class PickScreen extends React.Component {
  render() {
    return (
      <View style={styles.pickScreen}>
        <TopIllustrationImage />
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
    backgroundColor: colors.backgroundGrey,
  },
  playerPoolWrapper: {
    justifyContent: 'center',
    marginHorizontal: 15,
    height: 250,
    marginTop: 20,
    marginBottom: -30,
    zIndex: 1
  },
  playerPickerWrapper: {
    height: SCREEN_HEIGHT - PLAYER_POOL_CONTAINER_HEIGHT_IN_PX,
    backgroundColor: 'white'
  }
})
