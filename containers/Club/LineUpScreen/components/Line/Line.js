import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { colors, mainFontFamily } from '../../../../../styles'
import PlayerBlock from '../../../../../components/PlayerBlock'

const ENTER_ANIMATION_DURATION_IN_MS = 500

function renderLine(line) {
  return (
    <View style={styles.line}>
      {
        Object.keys(line).map((position, index) => {
          const player = line[position]
          return (
            <View key={index}>
              {renderPlayer(player)}
            </View>
          )
        })
      }
    </View>
  )
}

function renderPlayer(player) {
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

class Line extends React.Component {
  render() {
    const { line, lineNumber, lineText, enterDelay } =  this.props
    const lineString = lineNumber ? `${lineNumber}. ${lineText}` : lineText
    return (
      <Animatable.View animation='fadeInLeft' duration={ENTER_ANIMATION_DURATION_IN_MS} delay={enterDelay} style={styles.lineWrapper}>
        <Text style={styles.lineText}>{lineString}</Text>
        {renderLine(line)}
      </Animatable.View>
    )
  }
}

Line.propTypes = {
  line: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  lineText: PropTypes.string.isRequired,
  lineNumber: PropTypes.number,
  enterDelay: PropTypes.number
}

export default Animatable.createAnimatableComponent(Line)

const styles = StyleSheet.create({
  lineWrapper: {
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 15,
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
  }
})
