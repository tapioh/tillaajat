import React from 'react'
import PropTypes from 'prop-types'
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native'
import PlayerRow from '../../../../../components/PlayerRow'
import PlayerActions from '../PlayerActions'

export default class PlayerPicker extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          this.props.players.map(player => {
            return (
              <View style={styles.playerRow} key={player.number}>
                <PlayerRow name={player.name}
                        number={player.number}
                        facebookId={player.facebookId} />
                <PlayerActions player={player} />
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  playerRow: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10
  }
})
