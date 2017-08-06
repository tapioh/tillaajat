import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native'
import { colors } from '../../styles'

const FADE_IN_DURATION_IN_MS = 300
const TRANSLATE_DURATION_IN_MS = 500
const { height } = Dimensions.get('window')

export default class Modal extends React.Component {
  state = {
    open: false,
    modalVisibility: new Animated.Value(0),
    contentTranslate: new Animated.Value(0)
  }

  componentWillMount() {
    const animatedValue = new Animated.Value(this.props.open ? 1 : 0)
    this.setState({
      modalVisibility: animatedValue
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    })

    if (nextProps.open) {
      Animated.sequence([
        Animated.timing(this.state.modalVisibility, {
          toValue: 1,
          duration: FADE_IN_DURATION_IN_MS,
        }),
        Animated.spring(this.state.contentTranslate, {
          toValue: 1,
          duration: TRANSLATE_DURATION_IN_MS
        })
      ]).start()
    } else {
      Animated.parallel([
        Animated.spring(this.state.contentTranslate, {
          toValue: 0,
          duration: TRANSLATE_DURATION_IN_MS * 2
        }),
        Animated.timing(this.state.modalVisibility, {
          toValue: 0,
          duration: FADE_IN_DURATION_IN_MS
        })
      ]).start()
    }
  }

  render() {
    const containerStyle = {
      opacity: this.state.modalVisibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    }
    const contentStyle = {
      transform: [
        {
          translateY: this.state.contentTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0],
          }),
        },
      ],
    }

    const combinedStyle = [containerStyle, styles.modal]
    const combinedContentStyle = [contentStyle, styles.modalContent]
    const pointerEvents = this.state.open ? 'auto' : 'none'
    return (
      <Animated.View style={combinedStyle} pointerEvents={pointerEvents}>
        <Animated.View style={combinedContentStyle} ref='content'>
          {this.props.children}
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    position: 'absolute',
    left: 15,
    right: 15,
    top: '50%',
    marginTop: '-50%'
  }
})
