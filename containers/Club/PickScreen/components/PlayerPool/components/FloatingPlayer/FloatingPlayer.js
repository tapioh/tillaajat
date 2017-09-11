import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import FloatingElement from '../../../../../../../components/FloatingElement'
import { getProfileImageForFacebookId } from '../../../../../../../util'
import {
  PLAYER_IMAGE_WIDTH_IN_PX,
  PLAYER_POOL_HEIGHT_IN_PX,
  PLAYER_POOL_MARGIN_IN_PX
} from '../../constants'
import { colors } from '../../../../../../../styles'

const SCREEN_WIDTH = Dimensions.get('window').width

export default class FloatingPlayer extends React.Component {

  render() {
    const { player, index, factor } = this.props
    const imageSource = getProfileImageForFacebookId(player.facebookId)
    const factorY = Math.min(factor, PLAYER_POOL_HEIGHT_IN_PX / 2)
    const factorX = Math.min(factor, (SCREEN_WIDTH - PLAYER_POOL_MARGIN_IN_PX) / 2)
    const translateY = factorY * _.random(-100, 100) / 100
    const translateX = factorX * _.random(-100, 100) / 100
    const zIndexStyle = {
      zIndex: index + 1
    }
    return (
      <View style={[styles.playerImageWrapper, zIndexStyle]} key={player.number}>
        <FloatingElement style={styles.playerImageContent}
                         translateY={translateY}
                         translateX={translateX}>
          <Image source={imageSource} style={styles.playerImage}/>
        </FloatingElement>
      </View>
    )
  }
}

PropTypes.FloatingPlayer = {
  player: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  factor: PropTypes.number.isRequired
}


const styles = StyleSheet.create({
  playerImageContent: {
    top: 0,
    left: 0,
    width: PLAYER_IMAGE_WIDTH_IN_PX,
    height: PLAYER_IMAGE_WIDTH_IN_PX,
    borderRadius: PLAYER_IMAGE_WIDTH_IN_PX / 2
  },
  playerImage: {
    width: PLAYER_IMAGE_WIDTH_IN_PX,
    height: PLAYER_IMAGE_WIDTH_IN_PX,
    borderRadius: PLAYER_IMAGE_WIDTH_IN_PX / 2,
    backgroundColor: colors.darkGrey
  }
})
