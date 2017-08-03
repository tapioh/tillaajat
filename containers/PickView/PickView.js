import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { View } from 'react-native'
import { togglePlayer } from './actions'
import PlayerPicker from './components/PlayerPicker'
import PickViewHeader from './components/PickViewHeader'
import PickViewActions from './components/PickViewActions'

class PickView extends React.Component {
  render() {
    const playersOrdered = _.sortBy(this.props.players, 'position')
    return (
      <View>
        <PlayerPicker players={playersOrdered} />
        <PickViewHeader />
        <PickViewActions />
      </View>
    )
  }
}

PickView.propTypes = {
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
