import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { colors, mainFontFamily } from '../../../../../styles'
import PlayerBlock from '../../../../../components/PlayerBlock'

const FADE_IN_DURATION_IN_MS = 300

export default class Lines extends React.Component {
  state = {
    lineUpFade: new Animated.Value(0.5)
  }

  componentDidMount() {
    const hasLines = this.props.lineUp.lines.length > 0
    if (hasLines) {
      Animated.timing(this.state.lineUpFade, {
        toValue: 1,
        duration: FADE_IN_DURATION_IN_MS
      }).start()
    }
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
        <TouchableOpacity>
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
      opacity: this.state.lineUpFade
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
        <View style={[styles.lineWrapper, styles.goalkeepersWrapper]}>
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
  lineUp: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  linesWrapper: {
    marginVertical: 15,
    marginHorizontal: 15
  },
  lineWrapper: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: colors.white
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
    marginBottom: 30
  },
  playerWrapper: {
    flexDirection: 'column',
    marginBottom: 35
  },
  goalkeepersWrapper: {
    marginBottom: 0
  }
})
