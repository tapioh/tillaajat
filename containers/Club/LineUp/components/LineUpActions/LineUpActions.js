import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takeSnapshot } from "react-native-view-shot"
import {
  View,
  StyleSheet,
  CameraRoll
} from 'react-native'
import { generateLineUp } from '../../../actions'
import FooterActions from '../../../../../components/FooterActions'
import TillaajatButton from '../../../../../components/TillaajatButton'

const generateIcon = require('../../../../../assets/icons/icon-dark-generate.png')
const downloadIcon = require('../../../../../assets/icons/icon-dark-download.png')

class LineUpActions extends React.Component {
  onPressGenerateButton() {
    const { generateLineUp, players, selectedPlayers } = this.props
    generateLineUp(players, selectedPlayers)
  }

  onPressDownloadButton() {
    takeSnapshot(this.props.screenShotRef, {
      format: 'jpeg',
      quality: 0.8,
      snapshotContentContainer: true
    }).then(
      uri => { CameraRoll.saveToCameraRoll(uri,'photo') },
      error => console.error("Oops, snapshot failed", error)
    )
  }

  render() {
    return (
      <FooterActions visible={this.props.showActions}>
        <View style={styles.buttonsWrapper}>
          <View style={[styles.buttonContainer, styles.generateButtonContainer]}>
            <TillaajatButton iconSrc={generateIcon} iconWidth={48} iconHeight={38} onPress={() => this.onPressGenerateButton()} />
          </View>
          <View style={[styles.buttonContainer, styles.downloadButtonContainer]}>
            <TillaajatButton iconSrc={downloadIcon} iconWidth={38} iconHeight={38} onPress={() => this.onPressDownloadButton()} />
          </View>
        </View>
      </FooterActions>
    )
  }
}

LineUpActions.propTypes = {
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired,
  showActions: PropTypes.bool.isRequired,
  screenShotRef: PropTypes.any
}

const mapStateToProps = state => {
  return {
    players: state.club.players,
    selectedPlayers: state.club.selectedPlayers
  }
}

const mapDispatchToProps = (dispatch) => ({
  generateLineUp: (players, selectedPlayers) => { dispatch(generateLineUp(players, selectedPlayers)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(LineUpActions)

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
