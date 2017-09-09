import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { togglePlayer } from '../../../actions'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import { POSITION_STRINGS, PLAYER_ROW_HEIGHT_IN_PX } from '../../../../../constants'
import { mainFontFamily, colors } from '../../../../../styles'

class PlayerActions extends React.Component {
  onTogglePlayer(player) {
    this.props.togglePlayer(player)
  }

  render() {
    const { player, selected } = this.props
    const positionString = player.position ? POSITION_STRINGS[player.position] : null

    return (
      <View style={styles.playerActions}>
        <Text style={styles.positionText}>{positionString}</Text>
        <TouchableOpacity onPress={() => this.onTogglePlayer(player)}>
          {
            selected
              ? <View style={[styles.toggle, styles.toggleOn]}>
                  <Text style={[styles.toggleText, styles.toggleTextOn]}>IN!</Text>
                </View>
              : <View style={[styles.toggle, styles.toggleOff]}>
                  <Text style={[styles.toggleText, styles.toggleTextOff]}>IN?</Text>
                </View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

PlayerActions.propTypes = {
  player: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
  togglePlayer: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    selected: _.includes(state.club.selectedPlayers, ownProps.player.number)
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayer: (player) => { dispatch(togglePlayer(player)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerActions)

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
