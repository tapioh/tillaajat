import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'
import * as Animatable from 'react-native-animatable'
import { colors } from '../../styles'

const SPINNER_SIZE_IN_PX = 35
const SPINNER_TYPE = 'Bounce'
const ANIMATION_DURATION_IN_MS = 500
const ANIMATION_NAME = 'fadeIn'

class Loader extends React.Component {
  render() {
    return (
      <Animatable.View animation={ANIMATION_NAME} duration={ANIMATION_DURATION_IN_MS}>
        <Spinner size={SPINNER_SIZE_IN_PX}
                 type={SPINNER_TYPE}
                 color={colors.black} />
      </Animatable.View>
    )
  }
}

Loader.propTypes = {

}

export default Animatable.createAnimatableComponent(Loader)
