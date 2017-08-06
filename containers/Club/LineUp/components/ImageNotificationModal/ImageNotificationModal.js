import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-native-spinkit'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { PICTURE_SAVE_STATE_LOADING, PICTURE_SAVE_STATE_SAVED } from '../../constants'
import Modal from '../../../../../components/Modal'
import { colors, mainFontFamily } from '../../../../../styles'

const SPINNER_SIZE = 50
const SPINNER_TYPE = 'FadingCircleAlt'
const shieldCheckMarkIcon = require('../../../../../assets/icons/icon-dark-checkmark-shield.png')

export default class ImageNotificationModal extends React.Component {
  render() {
    const { showModal, pictureSaveState, onPressContinueButton } =  this.props
    return (
      <Modal open={showModal}>
        <View style={styles.modal}>
          {
            pictureSaveState === PICTURE_SAVE_STATE_LOADING &&
            <Spinner style={styles.spinner}
                     size={SPINNER_SIZE}
                     type={SPINNER_TYPE}
                     color={colors.black} />
          }
          {
            pictureSaveState === PICTURE_SAVE_STATE_SAVED &&
            <View style={styles.modalContent}>
              <Image source={shieldCheckMarkIcon}
                     style={styles.modalImage} />
              <Text style={styles.modalImageText}>Kuva tallennettu</Text>
              <TouchableOpacity onPress={onPressContinueButton}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>JATKA</Text>
                </View>
              </TouchableOpacity>
            </View>
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

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 20,
    height: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: SPINNER_SIZE + 13,
    height: SPINNER_SIZE + 13
  },
  modalImage: {
    width: 111,
    height: 150,
    marginBottom: 20
  },
  modalImageText: {
    flexDirection: 'column',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30
  },
  modalButton: {
    position: 'relative',
    width: 200,
    height: 55,
    paddingVertical: 20,
    backgroundColor: colors.black,
    borderWidth: 0,
    borderRadius: 55
  },
  modalButtonText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: colors.white,
    fontFamily: mainFontFamily
  }
})
