import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { generateLineUp } from '../../../actions'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import FloatingElement from '../../../../../components/FloatingElement'
import { getProfileImageForFacebookId } from '../../../../../util'
import { mainFontFamily, colors } from '../../../../../styles'

const screenWidth = Dimensions.get('window').width
const PLAYER_IMAGE_WIDTH_IN_PX = 80
const PLAYER_POOL_HEIGHT_IN_PX = 160
const PLAYER_POOL_MARGIN_IN_PX = 30
const PLAYER_POOL_WIDTH_IN_PX = screenWidth - PLAYER_POOL_MARGIN_IN_PX
const PLAYER_POOL_ACTIONS_HEIGHT_IN_PX = 60
const GENERATE_BUTTON_WIDTH_IN_PX = 120
const MIN_PLAYERS_COUNT = 6

class PlayerPool extends React.Component {
  onPressGenerateButton() {
    const { generateLineUp, players, selectedPlayers } = this.props
    generateLineUp(players, selectedPlayers)
  }

  render() {
    const { floatingPlayers, selectedPlayers } = this.props
    const selectedPlayersCount = selectedPlayers.length
    const enableGenerateButton = selectedPlayersCount >= MIN_PLAYERS_COUNT

    return (
      <View style={styles.playerPoolContainer}>
        {
          selectedPlayersCount === 0 &&
          <View style={styles.playerPoolEmpty}>
            <Text style={styles.playerPoolEmptyTitle}>VALITSE PELAAJAT</Text>
            <Text style={styles.playerPoolEmptyText}>Kuka on in, kuka out?</Text>
            <Text style={styles.playerPoolEmptyText}>Merkkaa init ja generoi kokkari.</Text>
          </View>
        }
        {
          selectedPlayersCount > 0 &&
          <View>
            <View style={styles.playerPool}>
              {
                floatingPlayers.map((player, index) => {
                  const imageSource = getProfileImageForFacebookId(player.facebookId)
                  const factorBase = selectedPlayersCount * 30
                  const factorY = Math.min(factorBase, PLAYER_POOL_HEIGHT_IN_PX / 2)
                  const factorX = Math.min(factorBase, (screenWidth - PLAYER_POOL_MARGIN_IN_PX) / 2)
                  const translateY = factorY * _.random(-100, 100) / 100
                  const translateX = factorX * _.random(-100, 100) / 100
                  const zIndexStyle = {
                    zIndex: index + 1
                  }
                  return (
                    <View style={[styles.playerImageWrapper, zIndexStyle]} key={player.number}>
                      <FloatingElement style={styles.playerImageContent} translateY={translateY}
                                       translateX={translateX}>
                        <Image source={imageSource} style={styles.playerImage}/>
                      </FloatingElement>
                    </View>
                  )
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
              <View style={enableGenerateButton ? styles.generateButtonEnabled : styles.generateButtonDisabled}>
                <TouchableOpacity onPress={() => enableGenerateButton ? this.onPressGenerateButton() : false }
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
  players: PropTypes.array.isRequired,
  floatingPlayers: PropTypes.any.isRequired,
  selectedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const players = state.club.players
  const selectedPlayers = state.club.selectedPlayers
  const floatingPlayers = _.map(selectedPlayers, (playerNumber) => {
    return _.find(players, player => player.number === playerNumber)
  })

  return {
    players,
    floatingPlayers,
    selectedPlayers
  }
}

const mapDispatchToProps = (dispatch) => ({
  generateLineUp: (players, selectedPlayers) => { return dispatch(generateLineUp(players, selectedPlayers)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPool)

const styles = StyleSheet.create({
  playerPoolContainer: {
    backgroundColor: colors.white,
    borderWidth: 0,
    borderRadius: 6,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 1
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
  playerImageContent: {
    top: 0,
    left: 0,
    width: PLAYER_IMAGE_WIDTH_IN_PX,
    height: PLAYER_IMAGE_WIDTH_IN_PX,
    borderRadius: PLAYER_IMAGE_WIDTH_IN_PX / 2,
    backgroundColor: colors.backgroundGrey
  },
  playerImage: {
    width: PLAYER_IMAGE_WIDTH_IN_PX,
    height: PLAYER_IMAGE_WIDTH_IN_PX,
    borderRadius: PLAYER_IMAGE_WIDTH_IN_PX / 2
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
