import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
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
const screenHeight = Dimensions.get('window').height
const topIllustrationImage = require('../../../assets/images/app-top-illustration.jpg')

class PickScreen extends React.Component {
  render() {
    const playersOrdered = _.sortBy(this.props.players, 'number')
    return (
      <View style={styles.pickScreen}>
        <Image source={topIllustrationImage} style={styles.topIllustrationImage} />
        <View>
          <View style={styles.playerPoolWrapper}>
            <PlayerPool navigator={this.props.navigator} />
          </View>
          <View style={[styles.playerPickerWrapper, shadows.defaultBoxShadow]}>
            <PlayerPicker players={playersOrdered} />
          </View>
        </View>
      </View>
    )
  }
}

PickScreen.propTypes = {
  players: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.club.players
  }
}

export default connect(mapStateToProps, null)(PickScreen)

const styles = StyleSheet.create({
  pickScreen: {
    backgroundColor: colors.backgroundGrey
  },
  topIllustrationImage: {
    height: 390,
    width: '100%',
    marginTop: -200,
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
    height: screenHeight - PLAYER_POOL_CONTAINER_HEIGHT_IN_PX,
    backgroundColor: 'white'
  }
})
