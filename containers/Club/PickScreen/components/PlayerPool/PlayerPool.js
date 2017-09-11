import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import FloatingPlayer from './components/FloatingPlayer'
import { LINE_UP_SCREEN, LINE_UP_SCREEN_TITLE } from '../../../../../screens'
import { mainFontFamily, colors, shadows } from '../../../../../styles'
import {
  PLAYER_POOL_HEIGHT_IN_PX,
  PLAYER_POOL_WIDTH_IN_PX,
  PLAYER_POOL_ACTIONS_HEIGHT_IN_PX
} from './constants'

const GENERATE_BUTTON_WIDTH_IN_PX = 120
const MIN_PLAYERS_COUNT = 6
const FACTOR_MULTIPLIER = 30

class PlayerPool extends React.Component {
  onPressGenerateButton() {
    this.props.navigator.push({
      screen: LINE_UP_SCREEN,
      title: LINE_UP_SCREEN_TITLE
    })
  }

  render() {
    const { floatingPlayers } = this.props
    const selectedPlayersCount = floatingPlayers.length
    const enableGenerateButton = selectedPlayersCount >= MIN_PLAYERS_COUNT
    const generateButtonStyle = enableGenerateButton ? styles.generateButtonEnabled : styles.generateButtonDisabled
    const generateButtonCall = enableGenerateButton ? () => this.onPressGenerateButton() : () => false

    return (
      <View style={[styles.playerPoolContainer, shadows.mediumBoxShadow]}>
        {
          selectedPlayersCount === 0 &&
          <View style={styles.playerPoolEmpty}>
            <Text style={styles.playerPoolEmptyTitle}>VALITSE PELAAJAT</Text>
            <Text style={styles.playerPoolEmptyText}>Kuka on in, kuka out?</Text>
            <Text style={styles.playerPoolEmptyText}>Merkkaa init ja generoi kokoonpano.</Text>
          </View>
        }
        {
          selectedPlayersCount > 0 &&
          <View>
            <View style={styles.playerPool}>
              {
                floatingPlayers.map((player, index) => {
                  const factor = selectedPlayersCount * FACTOR_MULTIPLIER
                  return <View style={styles.playerImageWrapper} key={index}>
                    <FloatingPlayer player={player} key={index} index={index} factor={factor} />
                  </View>
                })
              }
            </View>
            <View style={styles.playerPoolActions}>
              <View style={styles.selectedPlayersCountContainer}>
                <Text style={styles.selectedPlayersCount}>
                  {selectedPlayersCount} {
                  selectedPlayersCount === 1
                    ? 'pelaaja'
                    : 'pelaajaa'
                } IN
                </Text>
              </View>
              <View style={generateButtonStyle}>
                <TouchableOpacity onPress={generateButtonCall}
                                  style={styles.generateButton}>
                  <View>
                    <Text style={styles.generateButtonText}>Generoi</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}

PlayerPool.propTypes = {
  floatingPlayers: PropTypes.any.isRequired,
  navigator: PropTypes.object
}

const mapStateToProps = (state) => {
  const players = state.club.players
  const selectedPlayers = state.club.selectedPlayers
  const floatingPlayers = _.map(selectedPlayers, (playerNumber) => {
    return _.find(players, player => player.number === playerNumber)
  })

  return {
    floatingPlayers
  }
}

export default connect(mapStateToProps, null)(PlayerPool)

const styles = StyleSheet.create({
  playerPoolContainer: {
    backgroundColor: colors.white,
    borderWidth: 0,
    borderRadius: 6
  },
  playerPoolEmpty: {
    justifyContent: 'center',
    height: 220,
    paddingHorizontal: 30
  },
  playerPoolEmptyTitle: {
    color: colors.grey,
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: mainFontFamily,
    textAlign: 'center',
    marginBottom: 15
  },
  playerPoolEmptyText: {
    color: colors.darkGrey,
    backgroundColor: 'transparent',
    fontSize: 16,
    fontFamily: mainFontFamily,
    textAlign: 'center'
  },
  playerPool: {
    position: 'relative',
    height: PLAYER_POOL_HEIGHT_IN_PX,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderColor: colors.backgroundGrey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerPoolActions: {
    height: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  clubLogo: {
    width: 123,
    height: 114
  },
  playerImageWrapper: {
    position: 'absolute'
  },
  selectedPlayersCountContainer: {
    height: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX - 16,
    width: PLAYER_POOL_WIDTH_IN_PX - GENERATE_BUTTON_WIDTH_IN_PX - 1,
    marginVertical: 8,
    borderRightWidth: 1,
    borderRightColor: colors.backgroundGrey
  },
  selectedPlayersCount: {
    lineHeight: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX - 16,
    color: colors.black,
    backgroundColor: 'transparent',
    fontFamily: mainFontFamily,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  },
  generateButton: {
    height: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX,
    width: GENERATE_BUTTON_WIDTH_IN_PX
  },
  generateButtonEnabled: {
    opacity: 1
  },
  generateButtonDisabled: {
    opacity: 0.2
  },
  generateButtonText: {
    height: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX,
    lineHeight: PLAYER_POOL_ACTIONS_HEIGHT_IN_PX,
    color: colors.blue,
    fontFamily: mainFontFamily,
    fontSize: 18,
    textAlign: 'center'
  }
})
