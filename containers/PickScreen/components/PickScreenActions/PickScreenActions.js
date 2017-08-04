import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeScreen, SCREEN_LINE_UP } from '../../../../navigator'
import FooterActions from '../../../../components/FooterActions'
import TillaajatButton from '../../../../components/TillaajatButton'

const generateIcon = require('../../../../assets/icons/icon-dark-generate.png')
const MIN_PLAYERS_COUNT = 6

class PickScreenActions extends React.Component {
  onPressGenerateButton() {
    this.props.changeScreen(SCREEN_LINE_UP)
  }

  render() {
    return (
      <FooterActions visible={this.props.showActions}>
        <TillaajatButton iconSrc={generateIcon} iconWidth={48} iconHeight={38} onPress={() => this.onPressGenerateButton()} />
      </FooterActions>
    )
  }
}

PickScreenActions.propTypes = {
  showActions: PropTypes.bool.isRequired,
  changeScreen: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    showActions: state.club.selectedPlayers.length >= MIN_PLAYERS_COUNT
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeScreen: (screenName) => { dispatch(changeScreen(screenName)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(PickScreenActions)
