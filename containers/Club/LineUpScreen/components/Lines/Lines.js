import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet
} from 'react-native'
import Line from '../Line'
import { LINEUP_SCREEN_STATUS_VISIBLE, LINEUP_ANIMATION_DURATION_IN_MS } from '../../../constants'

const BASE_ENTER_DELAY_IN_MS = LINEUP_ANIMATION_DURATION_IN_MS / 2
const ANIMATION_IN_NAME = 'fadeInDown'
const ANIMATION_OUT_NAME = 'fadeOutUp'

export default class Lines extends React.Component {
  render() {
    const { lines, goalkeepers } =  this.props.lineUp
    const { lineUpScreenStatus } = this.props
    const linesCount = lines.length
    const goalkeepersLineText = goalkeepers.length > 1 ? 'MAALIVAHDIT' : 'MAALIVAHTI'
    const goalkeepersEnterDelay = BASE_ENTER_DELAY_IN_MS * (linesCount + 1)
    const animationName = lineUpScreenStatus === LINEUP_SCREEN_STATUS_VISIBLE ? ANIMATION_IN_NAME : ANIMATION_OUT_NAME

    return (
      <View style={styles.linesWrapper}>
        {
          lines.map((line, index) => {
            const lineNumber = index + 1
            const enterDelay = BASE_ENTER_DELAY_IN_MS * lineNumber
            const zIndexStyle = {
              zIndex: linesCount - index + 1
            }
            return (
              <View style={[styles.lineWrapper, zIndexStyle]} key={index}>
                <Line line={line}
                      lineText='KETJU'
                      lineNumber={lineNumber}
                      animationName={animationName}
                      enterDelay={enterDelay} />
              </View>
            )
          })
        }
        <View style={styles.goalkeepersWrapper}>
          <Line line={goalkeepers}
                lineText={goalkeepersLineText}
                animationName={animationName}
                enterDelay={goalkeepersEnterDelay}/>
        </View>
      </View>
    )
  }
}

Lines.propTypes = {
  lineUp: PropTypes.object.isRequired,
  lineUpScreenStatus: PropTypes.string.isRequired
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
    marginBottom: 0,
    zIndex: 0
  }
})
