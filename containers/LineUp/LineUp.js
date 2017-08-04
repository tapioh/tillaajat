import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import Player from '../../components/Player'
import { lineUpGenerator } from '../../util'

class LineUps extends React.Component {
  onLongPressPlayer(player) {
    console.warn('LONG PRESS', player)
  }

  renderLine(line) {
    return Object.keys(line).map((position, index) => {
      return <View key={index}>
        {this.renderPlayer(line[position])}
      </View>
    })
  }

  renderPlayer(player) {
    return (
      <View style={styles.playerWrapper}>
        <TouchableOpacity onLongPress={() => this.onLongPressPlayer(player)}>
          <View>
            {
              player &&
              <Player name={player.name}
                      facebookId={player.facebookId} />
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { lines, goalkeepers } = this.props.lineUp
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          lines.map((line, index) => {
            return <View style={styles.lineWrapper} key={index}>
              <Text style={styles.lineText}>{index + 1}. KETJU</Text>
              <View style={styles.line}>
                {this.renderLine(line)}
              </View>
            </View>
          })
        }
        <View style={styles.lineWrapper}>
          <Text style={styles.lineText}>{goalkeepers.length > 1 ? 'MAALIVAHDIT' : 'MAALIVAHTI'}</Text>
          <View style={styles.line}>
            {
              goalkeepers.map((goalkeeper, index) => {
                return <View key={index}>
                  {this.renderPlayer(goalkeeper)}
                </View>
              })
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}

LineUps.propTypes = {
  lineUp: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    lineUp: lineUpGenerator(state.club.players, state.club.selectedPlayers)
  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LineUps)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  lineWrapper: {
    flexDirection: 'column'
  },
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'center',
    marginBottom: 50,
    width: 300
  },
  lineText: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontFamily: (Platform.OS === 'ios') ? 'Chalkduster' : 'Roboto',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
  },
  playerWrapper: {
    flexDirection: 'column',
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 15
  }
})
