import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { togglePlayer } from '../../../actions'
import Player from '../../../../../components/Player'
import { HEADER_HEIGHT_IN_PX } from '../../../../../constants'

class PlayerPicker extends React.Component {
  onPressPlayer(player) {
    this.props.togglePlayer(player)
  }

  onLongPressPlayer(player) {
    console.warn('LONG PRESS', player)
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          this.props.players.map(player => {
            return (
              <View style={styles.playerWrapper} key={player.number}>
                <TouchableOpacity onPress={() => this.onPressPlayer(player)} onLongPress={() => this.onLongPressPlayer(player)}>
                  <View>
                    <Player position={player.position}
                            number={player.number}
                            facebookId={player.facebookId}
                            togglable={true} />
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

PlayerPicker.propTypes = {
  players: PropTypes.array.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayer: (player) => { dispatch(togglePlayer(player)) }
})

export default connect(null, mapDispatchToProps)(PlayerPicker)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingTop: HEADER_HEIGHT_IN_PX
  },
  playerWrapper: {
    flexDirection: 'column',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 15
  }
})
