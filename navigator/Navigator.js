import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Animated,
  Image,
  StyleSheet
} from 'react-native'
import {
  CHANGE_SCREEN_START,
  CHANGE_SCREEN_END,
  CHANGE_SCREEN_DURATION_IN_MS
} from './constants'
import PickScreen from '../containers/Club/PickScreen'
import LineUp from '../containers/Club/LineUp'

const backgroundImage = require('../assets/images/app-background.jpg')

class Navigator extends React.Component {
  state = {
    viewFade: new Animated.Value(1)
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.screenChangeStatus) {
      case CHANGE_SCREEN_START:
        Animated.timing(this.state.viewFade, {
          toValue: 0,
          duration: CHANGE_SCREEN_DURATION_IN_MS / 2
        }).start()
        break
      case CHANGE_SCREEN_END:
        Animated.timing(this.state.viewFade, {
          toValue: 1,
          duration: CHANGE_SCREEN_DURATION_IN_MS / 2
        }).start()
        break
    }
  }

  render() {
    const { screen } = this.props
    const viewFade = {
      opacity: this.state.viewFade
    }
    return (
      <Image source={backgroundImage} style={styles.backgroundImage}>
        <Animated.View style={viewFade}>
          {screen === 'PickScreen' && <PickScreen />}
          {screen === 'LineUp' && <LineUp />}
        </Animated.View>
      </Image>
    )
  }
}

Navigator.propTypes = {
  screen: PropTypes.string.isRequired,
  screenChangeStatus: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    screen: state.navigator.screen,
    screenChangeStatus: state.navigator.screenChangeStatus
  }
}

export default connect(mapStateToProps, null)(Navigator)


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null
  }
})
