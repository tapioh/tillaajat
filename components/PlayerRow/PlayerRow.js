import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native'
import { getProfileImageForFacebookId } from '../../util'
import { PLAYER_ROW_HEIGHT_IN_PX, PLAYER_ACTIONS_WIDTH_IN_PX } from '../../constants'
import { mainFontFamily, colors } from '../../styles'

const screenWidth = Dimensions.get('window').width

export default class PlayerRow extends React.Component {
  render() {
    const { name, number, facebookId } = this.props
    const imageSource = getProfileImageForFacebookId(facebookId)
    return (
      <View style={styles.playerRow}>
        <Image source={imageSource} style={styles.playerImage} />
        <Text style={styles.playerText}>#{number} {name}</Text>
      </View>
    )
  }
}

PlayerRow.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  facebookId: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  playerRow: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: screenWidth - PLAYER_ACTIONS_WIDTH_IN_PX
  },
  playerImage: {
    width: PLAYER_ROW_HEIGHT_IN_PX,
    height: PLAYER_ROW_HEIGHT_IN_PX,
    borderRadius: PLAYER_ROW_HEIGHT_IN_PX / 2,
    marginRight: 10
  },
  playerText: {
    color: colors.black,
    fontFamily: mainFontFamily,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: PLAYER_ROW_HEIGHT_IN_PX
  }
})
