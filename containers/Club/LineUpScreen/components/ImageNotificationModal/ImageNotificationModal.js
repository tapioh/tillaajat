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
import Button from '../../../../../components/Button'
import { colors, mainFontFamily } from '../../../../../styles'

const SPINNER_SIZE_IN_PX = 50
const SPINNER_TYPE = 'Bounce'

export default class ImageNotificationModal extends React.Component {
  render() {
    const { showModal, pictureSaveState, onPressContinueButton } =  this.props
    return (
      <Modal open={showModal}>
        <View style={styles.modal}>
          {
            pictureSaveState === PICTURE_SAVE_STATE_LOADING &&
            <Spinner style={styles.spinner}
                     size={SPINNER_SIZE_IN_PX}
                     type={SPINNER_TYPE}
                     color={colors.black} />
          }
          {
            pictureSaveState === PICTURE_SAVE_STATE_SAVED &&
            <View style={styles.modalContent}>
              <Text style={styles.modalImageText}>Kuva tallennettu</Text>
              <Button onPress={onPressContinueButton}>
                ALOITA ALUSTA
              </Button>
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
    height: 150,
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
    width: SPINNER_SIZE_IN_PX + 13,
    height: SPINNER_SIZE_IN_PX + 13
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
