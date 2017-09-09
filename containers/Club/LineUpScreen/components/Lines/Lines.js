import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  GENERATE_LINEUP_DURATION_IN_MS,
  REQUEST_GENERATE_LINEUP,
  RECEIVE_GENERATE_LINEUP
} from '../../../constants'
import { colors, mainFontFamily } from '../../../../../styles'
import PlayerBlock from '../../../../../components/PlayerBlock'

const FADE_IN_DURATION_IN_MS = 300

export default class Lines extends React.Component {
  state = {
    lineUpFade: new Animated.Value(0),
    lineUpTransform: new Animated.Value(0.5)
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.lineUpStatus) {
      case REQUEST_GENERATE_LINEUP:
        Animated.parallel([
          Animated.timing(this.state.lineUpFade, {
            toValue: 0,
            duration: GENERATE_LINEUP_DURATION_IN_MS
          }).start(),
          Animated.timing(this.state.lineUpTransform, {
            toValue: 0.5
          }).start()
        ])
        break
      case RECEIVE_GENERATE_LINEUP:
        Animated.parallel([
          Animated.timing(this.state.lineUpFade, {
            toValue: 1,
            duration: FADE_IN_DURATION_IN_MS
          }).start(),
          Animated.spring(this.state.lineUpTransform, {
            toValue: 1
          }).start()
        ])
        break
    }
  }

  onLongPressPlayer(player) {
    console.warn('LONG PRESS', player)
  }

  renderLine(line) {
    return Object.keys(line).map((position, index) => {
      return <View key={index}>
        {this.renderPlayer(line[position])}
      </View>
    })
  }

  renderPlayer(player) {
    return (
      <View style={styles.playerWrapper}>
        <TouchableOpacity onLongPress={() => this.onLongPressPlayer(player)}>
          <View>
            {
              player &&
              <PlayerBlock name={player.name}
                      number={player.number}
                      facebookId={player.facebookId} />
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { lines, goalkeepers } =  this.props.lineUp
    const lineUpAnimation = {
      opacity: this.state.lineUpFade,
      transform: [{ scale: this.state.lineUpTransform }]
    }

    return (
      <Animated.View style={[styles.linesWrapper, lineUpAnimation]}>
        {
          lines.map((line, index) => {
            return <View style={styles.lineWrapper} key={index}>
              <Text style={styles.lineText}>{index + 1}. KETJU</Text>
              <View style={styles.line}>
                {this.renderLine(line)}
              </View>
            </View>
          })
        }
        <View style={[styles.lineWrapper, styles.goalkeepers]}>
          <Text style={styles.lineText}>{goalkeepers.length > 1 ? 'MAALIVAHDIT' : 'MAALIVAHTI'}</Text>
          <View style={styles.line}>
            {
              goalkeepers.map((goalkeeper, index) => {
                return <View key={index}>
                  {this.renderPlayer(goalkeeper)}
                </View>
              })
            }
          </View>
        </View>
      </Animated.View>
    )
  }
}

Lines.propTypes = {
  lineUp: PropTypes.object.isRequired,
  lineUpStatus: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  linesWrapper: {
    marginTop: 30,
    marginBottom: 120,
    marginHorizontal: 15,
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: 'hidden'
  },
  lineWrapper: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderColor: colors.backgroundGrey,
    borderWidth: 1
  },
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lineText: {
    backgroundColor: 'transparent',
    color: colors.black,
    fontFamily: mainFontFamily,
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  playerWrapper: {
    flexDirection: 'column',
    marginBottom: 30
  },
  goalkeepers: {
  }
})
