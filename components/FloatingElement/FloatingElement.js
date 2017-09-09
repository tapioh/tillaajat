import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native'

const FLOAT_ANIMATION_LOOP_DURATION_MIN_IN_MS = 2000
const FLOAT_ANIMATION_LOOP_DURATION_MAX_IN_MS = 8000

export default class FloatingElement extends React.Component {
  state = {
    scale: new Animated.Value(0),
    translateY: new Animated.Value(0),
    translateX: new Animated.Value(0)
  }

  componentDidMount() {
    const { translateY, translateX } = this.props
    const loopDurationY = _.random(FLOAT_ANIMATION_LOOP_DURATION_MIN_IN_MS, FLOAT_ANIMATION_LOOP_DURATION_MAX_IN_MS)
    const loopDurationX = loopDurationY
    Animated.sequence([
      Animated.spring(this.state.scale, {
        toValue: 1
      })
    ]).start()
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(this.state.translateY, {
            toValue: translateY,
            duration: loopDurationY
          }),
          Animated.timing(this.state.translateY, {
            toValue: 0,
            duration: loopDurationY
          }),
          Animated.timing(this.state.translateY, {
            toValue: translateY * -1,
            duration: loopDurationY
          }),
          Animated.timing(this.state.translateY, {
            toValue: 0,
            duration: loopDurationY
          })
        ]),
        Animated.sequence([
          Animated.timing(this.state.translateX, {
            toValue: translateX,
            duration: loopDurationX
          }),
          Animated.timing(this.state.translateX, {
            toValue: 0,
            duration: loopDurationX
          }),
          Animated.timing(this.state.translateX, {
            toValue: translateX * -1,
            duration: loopDurationX
          }),
          Animated.timing(this.state.translateX, {
            toValue: 0,
            duration: loopDurationX
          })
        ])
      ]),
      {
        iterations: 'infinite'
      }
    ).start()
  }

  render() {
    const floatingStyle = {
      transform: [
        { scale: this.state.scale },
        { translateY: this.state.translateY },
        { translateX: this.state.translateX }]
    }

    return (
      <Animated.View style={[styles.container, floatingStyle]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

FloatingElement.propTypes = {
  children: PropTypes.any.isRequired,
  translateY: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  container: {

  }
})
