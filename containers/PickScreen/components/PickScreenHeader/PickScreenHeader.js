import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import Header from '../../../../components/Header'

const MIN_PLAYERS_COUNT = 6

class PickScreenHeader extends React.Component {
  render() {
    return (
      <Header title='Valitse pelaajat' progress={this.props.progress} />
    )
  }
}

PickScreenHeader.propTypes = {
  progress: PropTypes.number.isRequired
}

const mapStateToProps = state => {
  return {
    progress: (state.club.selectedPlayers.length / MIN_PLAYERS_COUNT) * 100
  }
}

export default connect(mapStateToProps, null)(PickScreenHeader)