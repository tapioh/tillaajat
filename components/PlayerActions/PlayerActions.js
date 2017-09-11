import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { POSITION_STRINGS, PLAYER_ROW_HEIGHT_IN_PX } from '../../constants'
import { mainFontFamily, colors } from '../../styles'

const TOGGLE_ON_ANIMATION_NAME = 'tada'
const TOGGLE_ON_ANIMATION_DURATION_IN_MS = 2000

class PlayerActions extends React.Component {
  render() {
    const { position, selected } = this.props
    const positionString = position ? POSITION_STRINGS[position] : null

    return (
      <View style={styles.playerActions}>
        <Text style={styles.positionText}>{positionString}</Text>
        {
          selected
            ? <Animatable.View animation={TOGGLE_ON_ANIMATION_NAME}
                               duration={TOGGLE_ON_ANIMATION_DURATION_IN_MS}
                               style={[styles.toggle, styles.toggleOn]}>
                <Text style={[styles.toggleText, styles.toggleTextOn]}>IN!</Text>
              </Animatable.View>
            : <View style={[styles.toggle, styles.toggleOff]}>
                <Text style={[styles.toggleText, styles.toggleTextOff]}>IN?</Text>
              </View>
        }
      </View>
    )
  }
}

PlayerActions.propTypes = {
  position: PropTypes.number,
  selected: PropTypes.bool.isRequired
}

export default Animatable.createAnimatableComponent(PlayerActions)

const styles = StyleSheet.create({
  playerActions: {
    flexDirection: 'row'
  },
  positionText: {
    height: PLAYER_ROW_HEIGHT_IN_PX,
    lineHeight: PLAYER_ROW_HEIGHT_IN_PX,
    marginRight: 5,
    fontFamily: mainFontFamily,
    fontWeight: '500',
    fontSize: 16,
    color: colors.lightGrey,
    width: 50,
    textAlign: 'center'
  },
  toggle: {
    height: PLAYER_ROW_HEIGHT_IN_PX,
    width: PLAYER_ROW_HEIGHT_IN_PX,
    borderWidth: 1,
    borderRadius: PLAYER_ROW_HEIGHT_IN_PX / 2,
    overflow: 'hidden'
  },
  toggleOn: {
    borderColor: colors.blue,
    backgroundColor: colors.blue,
  },
  toggleOff: {
    borderColor: colors.darkGrey,
    backgroundColor: colors.white
  },
  toggleText: {
    color: colors.white,
    fontFamily: mainFontFamily,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: PLAYER_ROW_HEIGHT_IN_PX,
    width: PLAYER_ROW_HEIGHT_IN_PX - 2,
    textAlign: 'center'
  },
  toggleTextOn: {
    color: colors.white
  },
  toggleTextOff: {
    color: colors.darkGrey
  }
})
