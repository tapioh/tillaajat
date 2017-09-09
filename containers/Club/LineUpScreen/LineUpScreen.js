import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { takeSnapshot } from "react-native-view-shot"
import Spinner from 'react-native-spinkit'
import {
  View,
  ScrollView,
  CameraRoll,
  StyleSheet,
  Dimensions
} from 'react-native'
import { generateLineUp, resetLineUp, resetPlayers } from '../actions'
import { PICTURE_SAVE_STATE_LOADING, PICTURE_SAVE_STATE_SAVED } from './constants'
import { NAVIGATOR_BUTTONS, GENERATE_BUTTON_ID, SAVE_BUTTON_ID } from './navigatorButtons'
import Lines from './components/Lines'
import ImageNotificationModal from './components/ImageNotificationModal'
import { colors } from '../../../styles'
import { HEADER_HEIGHT_IN_PX } from '../../../constants'

const screenHeight = Dimensions.get('window').height
const SPINNER_SIZE_IN_PX = 25
const SPINNER_TYPE = 'Bounce'
const POP_WAIT_DURATION_IN_MS = 150

class LineUpScreen extends React.Component {
  static navigatorButtons = NAVIGATOR_BUTTONS

  state = {
    pictureSaveState: ''
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    const { generateLineUp, players, selectedPlayers } = this.props
    generateLineUp(players, selectedPlayers)
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case GENERATE_BUTTON_ID:
          this.onPressGenerateButton()
          break
        case SAVE_BUTTON_ID:
          this.onPressSaveButton()
          break
        default:
          return null
          break
      }
    } else if (event.id === 'didDisappear') {
      this.props.resetLineUp()
    }
  }

  onPressGenerateButton = () => {
    const { resetLineUp, generateLineUp, players, selectedPlayers } = this.props
    resetLineUp()
    generateLineUp(players, selectedPlayers)
  }

  onPressSaveButton = () => {
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
    setTimeout(() => {
      this.props.navigator.pop({
        animated: true,
        animationType: 'fade'
      })
      this.props.resetLineUp()
    }, POP_WAIT_DURATION_IN_MS)
  }

  render() {
    const { pictureSaveState } = this.state
    const hasLines = this.props.lineUp.lines.length > 0
    const showModal = pictureSaveState !== ''
    return (
      <View style={styles.container}>
        {
          !hasLines &&
          <Spinner style={styles.spinner}
                   size={SPINNER_SIZE_IN_PX}
                   type={SPINNER_TYPE}
                   color={colors.black} />
        }
        {
          hasLines &&
          <ScrollView ref={component => this.scrollView = component}
                      collapsable={false}>
            <Lines lineUp={this.props.lineUp} />
          </ScrollView>
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
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  const { lineUp, players, selectedPlayers } = state.club
  return { lineUp, players, selectedPlayers }
}

const mapDispatchToProps = (dispatch) => ({
  generateLineUp: (players, selectedPlayers) => { dispatch(generateLineUp(players, selectedPlayers)) },
  resetLineUp: () => { dispatch(resetLineUp()) },
  resetPlayers: () => { dispatch(resetPlayers()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(LineUpScreen)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: screenHeight - HEADER_HEIGHT_IN_PX,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundGrey
  }
})
