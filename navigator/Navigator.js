import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet
} from 'react-native'
import PickScreen from '../containers/PickScreen'
import LineUp from '../containers/LineUp'

const backgroundImage = require('../assets/images/app-background.jpg')

class Navigator extends React.Component {
  render() {
    const { screen } = this.props
    return (
      <Image source={backgroundImage} style={styles.backgroundImage}>
        {screen === 'PickScreen' && <PickScreen />}
        {screen === 'LineUp' && <LineUp />}
      </Image>
    )
  }
}

Navigator.propTypes = {
  screen: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    screen: state.navigator.screen
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
