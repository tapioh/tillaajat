import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import { POSITION_STRINGS } from '../../constants'

const brushSymbol = require('../../assets/images/brush-symbol.png')
const clubLogo = require('../../assets/images/tillaajat-logo-white-small.png')
const checkmarkIcon = require('../../assets/icons/icon-white-checkmark.png')

class Player extends React.Component {
  render() {
    const { position, name, number, facebookId, selected } = this.props
    const imageSource = facebookId
      ? { uri: `https://graph.facebook.com/${facebookId}/picture?width=200&height=200` }
      : clubLogo
    const positionString = POSITION_STRINGS[position]
    return (
      <View style={styles.playerContainer}>
        <Image source={imageSource} style={[styles.playerImage, selected && { opacity: 0.2 }]} />
        <Image source={brushSymbol} style={styles.brushSymbol} />
        {selected && <Image source={checkmarkIcon} style={styles.checkmarkIcon} />}
        <View style={styles.playerTextWrapper}>
          <Text style={styles.playerText}>{positionString}</Text>
          <Text style={styles.playerNumberText}>#{number}</Text>
        </View>
      </View>
    )
  }
}

Player.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  facebookId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: _.includes(state.club.selectedPlayers, ownProps.number)
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayer: (player) => { dispatch(togglePlayer(player)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingTop: 3,
    width: 83
  },
  brushSymbol: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    width: 83,
    height: 80
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 27,
    right: 0,
    left: '50%',
    width: 40,
    height: 30,
    marginLeft: -20
  },
  playerImage: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginBottom: 10
  },
  playerTextWrapper: {
    flex: 1
  },
  playerText: {
    color: '#fff',
    fontFamily: (Platform.OS === 'ios') ? 'Chalkduster' : 'Roboto',
    fontSize: 18,
    marginRight: 10,
    width: 85,
    textAlign: 'center'
  },
  playerNumberText: {
    color: '#fff',
    fontFamily: (Platform.OS === 'ios') ? 'Chalkduster' : 'Roboto',
    fontSize: 14,
    width: 85,
    textAlign: 'center',
  }
})
