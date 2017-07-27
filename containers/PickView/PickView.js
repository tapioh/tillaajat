import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import _ from 'lodash'
import Player from '../../components/Player'

export default class PickView extends React.Component {
  render() {
    const { players } = this.props
    const playersOrdered = _.sortBy(players, 'position')
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          playersOrdered.slice(0, 8).map(player => {
            return (
              <View style={styles.playerWrapper} key={player.number}>
                <Player name={player.name}
                        position={player.position}
                        number={player.number}
                        facebookId={player.facebookId} />
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

PickView.PropTypes = {
  players: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'center'
  },
  playerWrapper: {
    flexDirection: 'column',
    marginHorizontal: 5,
    marginVertical: 10
  }
})
