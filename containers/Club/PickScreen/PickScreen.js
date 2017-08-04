import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { View } from 'react-native'
import PlayerPicker from './components/PlayerPicker'
import PickScreenHeader from './components/PickScreenHeader'
import PickScreenActions from './components/PickScreenActions'

class PickScreen extends React.Component {
  render() {
    const playersOrdered = _.sortBy(this.props.players, 'number')
    return (
      <View>
        <PlayerPicker players={playersOrdered} />
        <PickScreenHeader />
        <PickScreenActions />
      </View>
    )
  }
}

PickScreen.propTypes = {
  players: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.club.players
  }
}

export default connect(mapStateToProps, null)(PickScreen)
