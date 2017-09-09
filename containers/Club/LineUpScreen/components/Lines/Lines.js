import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  StyleSheet
} from 'react-native'
import Line from '../Line'

const FADE_IN_DURATION_IN_MS = 300
const BASE_ENTER_DELAY_IN_MS = 300

export default class Lines extends React.Component {
  state = {
    lineUpFade: new Animated.Value(0)
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

  render() {
    const { lines, goalkeepers } =  this.props.lineUp
    const goalkeepersLineText = goalkeepers.length > 1 ? 'MAALIVAHDIT' : 'MAALIVAHTI'
    const goalkeepersEnterDelay = BASE_ENTER_DELAY_IN_MS * (lines.length + 1)
    const lineUpAnimation = {
      opacity: this.state.lineUpFade
    }

    return (
      <Animated.View style={[styles.linesWrapper, lineUpAnimation]}>
        {
          lines.map((line, index) => {
            const lineNumber = index + 1
            const enterDelay = BASE_ENTER_DELAY_IN_MS * lineNumber
            return (
              <View style={styles.lineWrapper} key={index}>
                <Line line={line}
                      lineText='KETJU'
                      lineNumber={lineNumber}
                      enterDelay={enterDelay} />
              </View>
            )
          })
        }
        <View style={styles.goalkeepersWrapper}>
          <Line line={goalkeepers}
                lineText={goalkeepersLineText}
                enterDelay={goalkeepersEnterDelay}/>
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
    marginBottom: 15
  },
  goalkeepersWrapper: {
    flexDirection: 'column',
    marginBottom: 0
  }
})
