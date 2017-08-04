import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generateLineUp } from '../../../actions'
import FooterActions from '../../../../../components/FooterActions'
import TillaajatButton from '../../../../../components/TillaajatButton'

const generateIcon = require('../../../../../assets/icons/icon-dark-generate.png')

class PickScreenActions extends React.Component {
  onPressGenerateButton() {
    const { generateLineUp, players, selectedPlayers } = this.props
    generateLineUp(players, selectedPlayers)
  }

  render() {
    return (
      <FooterActions visible={true}>
        <TillaajatButton iconSrc={generateIcon} iconWidth={48} iconHeight={38} onPress={() => this.onPressGenerateButton()} />
      </FooterActions>
    )
  }
}

PickScreenActions.propTypes = {
  players: PropTypes.array.isRequired,
  selectedPlayers: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.club.players,
    selectedPlayers: state.club.selectedPlayers
  }
}

const mapDispatchToProps = (dispatch) => ({
  generateLineUp: (players, selectedPlayers) => { dispatch(generateLineUp(players, selectedPlayers)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PickScreenActions)
