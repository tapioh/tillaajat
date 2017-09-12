import React from 'react'
import {
  Image,
  StyleSheet
} from 'react-native'

const topIllustrationImage = require('../../assets/images/app-top-illustration.jpg')
const IMAGE_HEIGHT_IN_PX = 190

export default class TopIllustrationImage extends React.Component {
  render() {
    return <Image source={topIllustrationImage} style={styles.topIllustrationImage} />
  }
}

const styles = StyleSheet.create({
  topIllustrationImage: {
    height: IMAGE_HEIGHT_IN_PX,
    width: '100%',
    marginBottom: IMAGE_HEIGHT_IN_PX * -1
  }
})