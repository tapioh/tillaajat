import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { colors, mainFontFamily } from '../../styles'

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>{this.props.children}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.blue,
    borderWidth: 0,
    borderRadius: 55
  },
  buttonText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: colors.white,
    paddingTop: 20,
    paddingBottom: 19,
    paddingHorizontal: 40,
    fontFamily: mainFontFamily,
    fontWeight: '700'
  }
})
