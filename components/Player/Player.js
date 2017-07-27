import React from 'react'
import PropTypes from 'prop-types'
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

export default class PickView extends React.Component {
  render() {
    const { position, name, number, facebookId } = this.props
    const imageSource = facebookId
      ? {uri: `https://graph.facebook.com/${facebookId}/picture?width=200&height=200`}
      : clubLogo
    const positionString = POSITION_STRINGS[position]
    return (
      <View style={styles.playerContainer}>
        <Image source={imageSource} style={styles.playerImage} />
        <Image source={brushSymbol} style={styles.brushSymbol} />
        <Text style={styles.playerText}>{positionString}</Text>
      </View>

    )
  }
}

PickView.PropTypes = {
  position: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  facebookId: PropTypes.string.isRequired
}

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
  playerImage: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginBottom: 10
  },
  playerText: {
    color: '#fff',
    fontFamily: (Platform.OS === 'ios') ? 'Chalkduster' : 'Roboto',
    fontSize: 18
  }
})
