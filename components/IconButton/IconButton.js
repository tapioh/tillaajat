import React from 'react'
import PropTypes from 'prop-types'
import {
  View, 
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { colors, shadows } from '../../styles'

export default class IconButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.buttonWrapper, shadows.buttonShadow]}>
          {
            this.props.iconSrc &&
            <Image style={[
              styles.buttonIcon,
              {
                width: this.props.iconWidth,
                height: this.props.iconHeight,
                marginLeft: (this.props.iconWidth / 2) * -1,
                marginTop: (this.props.iconHeight / 2) * -1
              }
              ]}
              source={this.props.iconSrc} />
          }
        </View>
      </TouchableOpacity>
    )
  }
}

IconButton.propTypes = {
  iconSrc: PropTypes.number.isRequired,
  iconWidth: PropTypes.number.isRequired,
  iconHeight: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    width: '100%',
    height: 55,
    backgroundColor: colors.white,
    borderWidth: 0,
    borderRadius: 55
  },
  buttonIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})
