import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Animated,
  StyleSheet
} from 'react-native'

const TRANSLATE_DURATION_IN_MS = 500

export default class FooterActions extends React.Component {
  state = {
    visible: false,
    actionsTranslate: new Animated.Value(0)
  }

  componentWillMount() {
    const animatedValue = new Animated.Value(this.props.visible ? 1 : 0)
    this.setState({
      actionsTranslate: animatedValue
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    })

    if (nextProps.visible) {
      // Show animation
      Animated.spring(this.state.actionsTranslate, {
        toValue: 1,
        duration: TRANSLATE_DURATION_IN_MS
      }).start()
    } else {
      // Hide animation
      Animated.spring(this.state.actionsTranslate, {
        toValue: 0,
        duration: TRANSLATE_DURATION_IN_MS * 2
      }).start()
    }
  }

  render() {
    const actionsTransform = {
      transform: [
        {
          translateY: this.state.actionsTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [120, 0]
          })
        }
      ]
    }
    return (
      <View style={styles.actions}>
        <Animated.View style={actionsTransform}>
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}

FooterActions.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    right: 70,
    bottom: 30,
    left: 70
  }
})
