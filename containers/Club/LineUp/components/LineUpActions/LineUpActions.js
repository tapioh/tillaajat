import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet
} from 'react-native'
import FooterActions from '../../../../../components/FooterActions'
import TillaajatButton from '../../../../../components/TillaajatButton'

const generateIcon = require('../../../../../assets/icons/icon-dark-generate.png')
const downloadIcon = require('../../../../../assets/icons/icon-dark-download.png')

export default class LineUpActions extends React.Component {
  render() {
    return (
      <FooterActions visible={this.props.showActions}>
        <View style={styles.buttonsWrapper}>
          <View style={[styles.buttonContainer, styles.generateButtonContainer]}>
            <TillaajatButton iconSrc={generateIcon} iconWidth={48} iconHeight={38} onPress={this.props.onPressGenerateButton} />
          </View>
          <View style={[styles.buttonContainer, styles.downloadButtonContainer]}>
            <TillaajatButton iconSrc={downloadIcon} iconWidth={38} iconHeight={38} onPress={this.props.onPressSaveButton} />
          </View>
        </View>
      </FooterActions>
    )
  }
}

LineUpActions.propTypes = {
  showActions: PropTypes.bool.isRequired,
  onPressGenerateButton: PropTypes.func.isRequired,
  onPressSaveButton: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '50%'
  },
  generateButtonContainer: {
    paddingRight: 5
  },
  downloadButtonContainer: {
    paddingLeft: 5
  }
})
