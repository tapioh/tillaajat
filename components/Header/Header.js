import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native'
import { BlurView } from 'react-native-blur'
import { HEADER_HEIGHT_IN_PX } from '../../constants'
import { colors } from '../../styles'

const EASING_DURATION_IN_MS = 250
const screenWidth = Dimensions.get('window').width

export default class Header extends React.Component {
  state = {
    progress: new Animated.Value(0)
  }

  componentDidUpdate() {
    Animated.timing(this.state.progress, {
      duration: EASING_DURATION_IN_MS,
      toValue: this.props.progress
    }).start()
  }

  render() {
    const fillWidth = this.state.progress.interpolate({
      inputRange: [0, 100],
      outputRange: [0, screenWidth]
    })
    return (
      <View style={styles.header}>
        <View style={styles.headerBlurred}>
          <View style={styles.headerBackground} />
          <View style={styles.headerProgress}>
            <Animated.View style={[styles.headerProgressFill, { width: fillWidth }]}></Animated.View>
          </View>
        </View>
        {
          Platform.OS === 'ios' &&
          <BlurView style={styles.blurView}
                    viewRef={this.headerBlurred}
                    blurType='xlight'
                    blurAmount={10} />
        }
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
        </View>
      </View>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT_IN_PX,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 10
  },
  headerBlurred: {
    height: HEADER_HEIGHT_IN_PX,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: HEADER_HEIGHT_IN_PX - 10,
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : colors.white
  },
  headerProgress: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  headerProgressFill: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: HEADER_HEIGHT_IN_PX - 10,
    zIndex: 2,
    borderWidth: 0
  },
  headerContent: {
    height: HEADER_HEIGHT_IN_PX - 10,
    paddingTop: Platform.OS === 'ios' ? 30 : 22,
    alignItems: 'center',
    position: 'relative',
    zIndex: 3
  },
  headerTitle: {
    fontSize: 18,
    color: colors.black,
    backgroundColor: 'transparent'
  }
})
