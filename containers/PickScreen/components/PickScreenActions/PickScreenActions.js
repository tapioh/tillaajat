import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  Animated,
  StyleSheet
} from 'react-native'
import TillaajatButton from '../../../../components/TillaajatButton'

const generateIcon = require('../../../../assets/icons/icon-dark-generate.png')
const MIN_PLAYERS_COUNT = 6
const TRANSLATE_DURATION_IN_MS = 500

class PickScreenActions extends React.Component {
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
      visible: nextProps.showActions
    })

    if (nextProps.showActions) {
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

  onPressGenerateButton() {
    console.warn('PRESS GENERATE')
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
          <TillaajatButton iconSrc={generateIcon} iconWidth={48} iconHeight={38} onPress={this.onPressGenerateButton} />
        </Animated.View>
      </View>
    )
  }
}

PickScreenActions.propTypes = {
  showActions: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    showActions: state.club.selectedPlayers.length >= MIN_PLAYERS_COUNT
  }
}

export default connect(mapStateToProps, null)(PickScreenActions)

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    right: 70,
    bottom: 30,
    left: 70
  }
})