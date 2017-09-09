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
import LineUpScreen from '../LineUpScreen'
import { colors } from '../../../styles'

const PLAYER_POOL_CONTAINER_HEIGHT_IN_PX = 240
const screenHeight = Dimensions.get('window').height
const topIllustrationImage = require('../../../assets/images/app-top-illustration.jpg')

class PickScreen extends React.Component {
  render() {
    const playersOrdered = _.sortBy(this.props.players, 'number')
    const hasLines = this.props.lineUp.lines.length > 0
    return (
      <View>
        <Image source={topIllustrationImage} style={styles.topIllustrationImage} />
        {
          !hasLines &&
          <View>
            <View style={styles.playerPoolWrapper}>
              { !hasLines && <PlayerPool /> }

            </View>
            <View style={styles.playerPickerWrapper}>
              <PlayerPicker players={playersOrdered} />
            </View>
          </View>
        }
        { hasLines && <LineUpScreen /> }
      </View>
    )
  }
}

PickScreen.propTypes = {
  players: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    lineUp: state.club.lineUp,
    players: state.club.players
  }
}

export default connect(mapStateToProps, null)(PickScreen)

const styles = StyleSheet.create({
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
    backgroundColor: 'white',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 1
  }
})
