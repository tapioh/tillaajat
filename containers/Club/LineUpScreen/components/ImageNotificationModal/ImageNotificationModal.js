import React from 'react'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { PICTURE_SAVE_STATE_LOADING, PICTURE_SAVE_STATE_SAVED } from '../../constants'
import Modal from '../../../../../components/Modal'
import Loader from '../../../../../components/Loader'
import Button from '../../../../../components/Button'
import { mainFontFamily } from '../../../../../styles'

const ENTER_ANIMATION_DURATION_IN_MS = 500

class ImageNotificationModal extends React.Component {
  render() {
    const { showModal, pictureSaveState, onPressContinueButton } =  this.props
    return (
      <Modal open={showModal}>
        <View style={styles.modal}>
          {
            pictureSaveState === PICTURE_SAVE_STATE_LOADING &&
            <Loader />
          }
          {
            pictureSaveState === PICTURE_SAVE_STATE_SAVED &&
            <Animatable.View animation='fadeInUp' duration={ENTER_ANIMATION_DURATION_IN_MS} style={styles.modalContent}>
              <Text style={styles.modalImageText}>Kuva tallennettu</Text>
              <Button onPress={onPressContinueButton}>
                ALOITA ALUSTA
              </Button>
            </Animatable.View>
          }
        </View>
      </Modal>
    )
  }
}

ImageNotificationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  pictureSaveState: PropTypes.string.isRequired,
  onPressContinueButton: PropTypes.func.isRequired
}

export default Animatable.createAnimatableComponent(ImageNotificationModal)

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 20,
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImageText: {
    flexDirection: 'column',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: mainFontFamily,
    marginBottom: 20
  }
})
