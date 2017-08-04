import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Animated,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  GENERATE_LINEUP_DURATION_IN_MS,
  REQUEST_GENERATE_LINEUP,
  RECEIVE_GENERATE_LINEUP
} from '../constants'
import Player from '../../../components/Player'
import LineUpActions from './components/LineUpActions'
import { colors, mainFontFamily } from '../../../styles'

const FADE_IN_DURATION_IN_MS = 300

class LineUp extends React.Component {
  state = {
    lineUpFade: new Animated.Value(0),
    lineUpTransform: new Animated.Value(0.5)
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.lineUpStatus) {
      case REQUEST_GENERATE_LINEUP:
        Animated.timing(this.state.lineUpFade, {
          toValue: 0,
          duration: GENERATE_LINEUP_DURATION_IN_MS
        }).start()
        Animated.timing(this.state.lineUpTransform, {
          toValue: 0.5
        }).start()
        break
      case RECEIVE_GENERATE_LINEUP:
        Animated.timing(this.state.lineUpFade, {
          toValue: 1,
          duration: FADE_IN_DURATION_IN_MS
        }).start()
        Animated.spring(this.state.lineUpTransform, {
          toValue: 1
        }).start()
        break
    }
  }

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
    const lineUpAnimation = {
      opacity: this.state.lineUpFade,
      transform: [{ scale: this.state.lineUpTransform }]
    }
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.View style={lineUpAnimation}>
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
          </Animated.View>
        </ScrollView>
        <LineUpActions />
      </View>
    )
  }
}

LineUp.propTypes = {
  lineUp: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    lineUp: state.club.lineUp,
    lineUpStatus: state.club.lineUpStatus
  }
}

export default connect(mapStateToProps, null)(LineUp)

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
    color: colors.white,
    fontFamily: mainFontFamily,
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