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
import {
  generateLineUp,
  resetLineUp,
  resetPlayers,
  animateLineUpIn,
  animateLineUpOut
} from '../actions'
import Loader from '../../../components/Loader'
import TopIllustrationImage from '../../../components/TopIllustrationImage'
import { LINEUP_SCREEN_STATUS_ANIMATE_OUT } from '../constants'
import { PICTURE_SAVE_STATE_LOADING, PICTURE_SAVE_STATE_SAVED } from './constants'
import { NAVIGATOR_BUTTONS, RELOAD_BUTTON_ID, DOWNLOAD_BUTTON_ID } from './navigatorButtons'
import Lines from './components/Lines'
import ImageNotificationModal from './components/ImageNotificationModal'
import { colors } from '../../../styles'
import { HEADER_HEIGHT_IN_PX } from '../../../constants'

const screenHeight = Dimensions.get('window').height
const POP_WAIT_DURATION_IN_MS = 150

class LineUpScreen extends React.Component {
  static navigatorButtons = NAVIGATOR_BUTTONS

  state = {
    pictureSaveState: ''
  }

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    const { showLineUp, players, selectedPlayers } = this.props
    showLineUp(players, selectedPlayers)
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      switch (event.id) {
        case RELOAD_BUTTON_ID:
          this.onPressReloadButton()
          break
        case DOWNLOAD_BUTTON_ID:
          this.onPressDownloadButton()
          break
        default:
          return null
          break
      }
    } else if (event.id === 'didDisappear') {
      this.props.resetLineUp()
    }
  }

  onPressReloadButton = () => {
    const { reloadLineUp, players, selectedPlayers } = this.props
    reloadLineUp(players, selectedPlayers)
  }

  onPressDownloadButton = () => {
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
    }, POP_WAIT_DURATION_IN_MS)
  }

  render() {
    const { pictureSaveState } = this.state
    const { lineUp, lineUpScreenStatus } = this.props
    const hasLines = this.props.lineUp.lines.length > 0
    const animateLineUpOut = this.props.lineUpScreenStatus === LINEUP_SCREEN_STATUS_ANIMATE_OUT
    const showLines = hasLines || animateLineUpOut
    const showModal = pictureSaveState !== ''
    return (
      <View style={styles.lineUpScreen}>
        <TopIllustrationImage />
        <View style={styles.container}>
          {
            !showLines &&
            <Loader />
          }
          {
            showLines &&
            <ScrollView ref={component => this.scrollView = component}
                        collapsable={false}>
              <Lines lineUp={lineUp} lineUpScreenStatus={lineUpScreenStatus} />
            </ScrollView>
          }
          <ImageNotificationModal showModal={showModal}
                                  pictureSaveState={pictureSaveState}
                                  onPressContinueButton={() => this.onPressContinueButton()} />
        </View>
      </View>
    )
  }
}

LineUpScreen.propTypes = {
  lineUp: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired,

}

const mapStateToProps = state => {
  const { lineUp, lineUpScreenStatus, players, selectedPlayers } = state.club
  return { lineUp, lineUpScreenStatus, players, selectedPlayers }
}

const mapDispatchToProps = (dispatch) => ({
  showLineUp: (players, selectedPlayers) => {
    dispatch(generateLineUp(players, selectedPlayers)).then(() => {
      dispatch(animateLineUpIn())
    })
  },
  resetLineUp: () => { dispatch(resetLineUp()) },
  resetPlayers: () => { dispatch(resetPlayers()) },
  reloadLineUp: (players, selectedPlayers) => {
    dispatch(animateLineUpOut()).then(() => {
      dispatch(resetLineUp())
      dispatch(generateLineUp(players, selectedPlayers)).then(() => {
        dispatch(animateLineUpIn())
      })
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LineUpScreen)

const styles = StyleSheet.create({
  lineUpScreen: {
    backgroundColor: colors.backgroundGrey,
  },
  container: {
    marginTop: HEADER_HEIGHT_IN_PX,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: screenHeight - HEADER_HEIGHT_IN_PX,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
