import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { colors, shadows, mainFontFamily } from '../../../../../styles'
import PlayerBlock from '../../../../../components/PlayerBlock'
import { LINEUP_ANIMATION_DURATION_IN_MS } from '../../../constants'

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
    const { line, lineNumber, lineText, animationName, enterDelay } =  this.props
    const lineString = lineNumber ? `${lineNumber}. ${lineText}` : lineText
    return (
      <Animatable.View animation={animationName}
                       duration={LINEUP_ANIMATION_DURATION_IN_MS}
                       delay={enterDelay}
                       style={[styles.lineWrapper, shadows.defaultBoxShadow]}>
        <View style={styles.lineTextWrapper}>
          <Text style={styles.lineText}>{lineString}</Text>
        </View>
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
  animationName: PropTypes.string.isRequired,
  enterDelay: PropTypes.number,
}

export default Animatable.createAnimatableComponent(Line)

const styles = StyleSheet.create({
  lineWrapper: {
    paddingTop: 25,
    paddingBottom: 15,
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
  lineTextWrapper: {
    borderBottomWidth: 1,
    borderColor: colors.backgroundGrey,
    marginBottom: 35
  },
  lineText: {
    color: colors.black,
    fontFamily: mainFontFamily,
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    marginBottom: 15
  },
  playerWrapper: {
    flexDirection: 'column',
    marginBottom: 20
  }
})
