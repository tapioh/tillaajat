import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takeSnapshot } from "react-native-view-shot"
import {
  View,
  ScrollView,
  CameraRoll,
  StyleSheet,
  Dimensions
} from 'react-native'
import { generateLineUp, resetPlayers } from '../actions'
import { changeScreen, SCREEN_PICK_SCREEN } from '../../../navigator'
import { PICTURE_SAVE_STATE_LOADING, PICTURE_SAVE_STATE_SAVED } from './constants'
import Lines from './components/Lines'
import LineUpActions from './components/LineUpActions'
import ImageNotificationModal from './components/ImageNotificationModal'
import { colors } from '../../../styles'

const screenHeight = Dimensions.get('window').height

class LineUpScreen extends React.Component {
  state = {
    pictureSaveState: ''
  }

  onPressGenerateButton() {
    const { generateLineUp, players, selectedPlayers } = this.props
    generateLineUp(players, selectedPlayers)
  }

  onPressSaveButton() {
    this.setState({
      pictureSaveState: PICTURE_SAVE_STATE_LOADING
    })
    takeSnapshot(this.scrollView, {
      format: 'jpeg',
      quality: 0.8,
      snapshotContentContainer: true
    }).then(
      uri => {
        CameraRoll.saveToCameraRoll(uri, 'photo').then((uri) => this.onPictureSave(uri))
      },
      error => {
        console.error("Oops, snapshot failed", error)
      }
    )
  }

  onPictureSave(uri) {
    this.setState({
      pictureSaveState: PICTURE_SAVE_STATE_SAVED
    })
  }

  onPressContinueButton() {
    this.props.resetPlayers()
    this.props.changeScreen(SCREEN_PICK_SCREEN)
  }

  render() {
    const { pictureSaveState } = this.state
    const hasLines = this.props.lineUp.lines.length > 0
    const showModal = pictureSaveState !== ''
    return (
      <View style={styles.container}>
        <ScrollView ref={component => this.scrollView = component}
                    collapsable={false}>
          <Lines lineUp={this.props.lineUp} lineUpStatus={this.props.lineUpStatus} />
        </ScrollView>
        {
          hasLines &&
          <LineUpActions showActions={true}
                         onPressGenerateButton={() => this.onPressGenerateButton()}
                         onPressSaveButton={() => this.onPressSaveButton()} />
        }
        <ImageNotificationModal showModal={showModal}
                                pictureSaveState={pictureSaveState}
                                onPressContinueButton={() => this.onPressContinueButton()} />
      </View>
    )
  }
}

LineUpScreen.propTypes = {
  lineUp: PropTypes.object.isRequired,
  lineUpStatus: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    lineUp: state.club.lineUp,
    lineUpStatus: state.club.lineUpStatus,
    players: state.club.players,
    selectedPlayers: state.club.selectedPlayers
  }
}

const mapDispatchToProps = (dispatch) => ({
  generateLineUp: (players, selectedPlayers) => { return dispatch(generateLineUp(players, selectedPlayers)) },
  resetPlayers: () => { dispatch(resetPlayers()) },
  changeScreen: (screenName) => { dispatch(changeScreen(screenName)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(LineUpScreen)

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: screenHeight
  }
})
