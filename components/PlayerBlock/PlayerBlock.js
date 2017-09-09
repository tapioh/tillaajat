import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native'
import { getProfileImageForFacebookId } from '../../util'
import { PLAYER_BLOCK_HEIGHT_IN_PX, PLAYER_BLOCK_WIDTH_IN_PX } from '../../constants'
import { mainFontFamily, colors } from '../../styles'

const PLAYER_IMAGE_SIZE_IN_PX = 60

export default class PlayerBlock extends React.Component {
  render() {
    const { name, number, facebookId } = this.props
    const imageSource = getProfileImageForFacebookId(facebookId)
    const firstName = name ? name.split(' ').slice(0, -1).join(' ') : null
    return (
      <View style={styles.playerBlock}>
        <Image source={imageSource} style={styles.playerImage} />
        <Text style={styles.playerText}>
          <Text style={styles.playerNumberText}>#{number}</Text> {firstName}
        </Text>
      </View>
    )
  }
}

PlayerBlock.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  facebookId: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  playerBlock: {
    alignItems: 'center'
  },
  playerImage: {
    width: PLAYER_IMAGE_SIZE_IN_PX,
    height: PLAYER_IMAGE_SIZE_IN_PX,
    borderRadius: PLAYER_IMAGE_SIZE_IN_PX / 2,
    marginBottom: 10,
    backgroundColor: colors.darkGrey
  },
  playerText: {
    color: colors.black,
    fontFamily: mainFontFamily,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    width: PLAYER_BLOCK_WIDTH_IN_PX
  },
  playerNumberText: {
    fontWeight: '500',
    color: colors.darkGrey
  }
})

