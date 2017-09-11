import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FlatList,
  StyleSheet
} from 'react-native'
import _ from 'lodash'
import PlayerItem from './components/PlayerItem'
import { togglePlayer } from '../../../actions'

class PlayerPicker extends React.PureComponent {
  onTogglePlayer = (playerNumber) => {
    this.props.togglePlayer(playerNumber)
  }

  keyExtractor = (item, index) => item.number

  renderPlayerRow = (listItem) => {
    const player = listItem && listItem.item
    const selected = _.includes(this.props.selectedPlayers, player.number)
    return <PlayerItem id={player.number}
                       name={player.name}
                       number={player.number}
                       facebookId={player.facebookId}
                       position={player.position}
                       selected={selected}
                       onPressItem={this.onTogglePlayer} />
  }

  render() {
    const playersOrdered = _.sortBy(this.props.players, 'number')
    const { selectedPlayers } = this.props

    return (
      <FlatList
        style={styles.playerPickerList}
        data={playersOrdered}
        extraData={selectedPlayers}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderPlayerRow}
        removeClippedSubviews={false} />
    )
  }
}

PlayerPicker.propTypes = {
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired
}


const mapStateToProps = (state) => {
  const { players, selectedPlayers } = state.club
  return {
    players, selectedPlayers
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayer: (player) => { dispatch(togglePlayer(player)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPicker)


const styles = StyleSheet.create({
  playerPickerList: {
    paddingVertical: 20
  }
})
