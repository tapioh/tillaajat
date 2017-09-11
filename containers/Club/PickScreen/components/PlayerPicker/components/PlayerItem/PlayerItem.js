import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import PlayerRow from '../../../../../../../components/PlayerRow'
import PlayerActions from '../../../../../../../components/PlayerActions'

export default class PlayerItem extends React.PureComponent {
  onPress(playerNumber) {
    this.props.onPressItem(playerNumber)
  }

  render() {
    const {
      name,
      number,
      facebookId,
      position,
      selected
    } = this.props

    return (
      <TouchableOpacity onPress={() => this.onPress(number)}>
        <View style={styles.playerItem}>
          <PlayerRow name={name}
                     number={number}
                     facebookId={facebookId} />
          <PlayerActions position={position} selected={selected} />
        </View>
      </TouchableOpacity>
    )
  }
}

PlayerItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  facebookId: PropTypes.string.isRequired,
  position: PropTypes.number,
  selected: PropTypes.bool.isRequired,
  onPressItem: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  playerItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10
  }
})
