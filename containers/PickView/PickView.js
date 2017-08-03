import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native'
import { togglePlayer } from './actions'
import Player from '../../components/Player'
import PickViewHeader from './components/PickViewHeader'
import { HEADER_HEIGHT_IN_PX } from '../../constants'

class PickView extends React.Component {
  onPressButton(player) {
    this.props.togglePlayer(player)
  }

  onLongPressButton(player) {
    console.warn('LONG PRESS', player)
  }

  render() {
    const { players } = this.props
    const playersOrdered = _.sortBy(players, 'position')
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          {
            playersOrdered.map(player => {
              return (
                <View style={styles.playerWrapper} key={player.number}>
                  <TouchableOpacity onPress={() => this.onPressButton(player)} onLongPress={() => this.onLongPressButton(player)}>
                    <View>
                      <Player name={player.name}
                              position={player.position}
                              number={player.number}
                              facebookId={player.facebookId} />
                    </View>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
        <PickViewHeader />
      </View>
    )
  }
}

PickView.PropTypes = {
  players: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.club.players
  }
}

const mapDispatchToProps = (dispatch) => ({
  togglePlayer: (player) => { dispatch(togglePlayer(player)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PickView)

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
