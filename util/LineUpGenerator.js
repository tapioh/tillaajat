import {
  POSITION_LEFT_WING,
  POSITION_CENTER,
  POSITION_RIGHT_WING,
  POSITION_LEFT_DEFENDER,
  POSITION_RIGHT_DEFENDER,
  POSITION_GOALKEEPER,
  POSITION_OTHER
} from '../constants'
import _ from 'lodash'

const REPLACE_POSITIONS = {
  [POSITION_LEFT_WING]: [POSITION_RIGHT_WING, POSITION_CENTER, POSITION_LEFT_DEFENDER, POSITION_RIGHT_DEFENDER, POSITION_OTHER],
  [POSITION_CENTER]: [POSITION_RIGHT_WING, POSITION_LEFT_WING, POSITION_LEFT_DEFENDER, POSITION_RIGHT_DEFENDER, POSITION_OTHER],
  [POSITION_RIGHT_WING]: [POSITION_LEFT_WING, POSITION_CENTER, POSITION_RIGHT_DEFENDER, POSITION_LEFT_DEFENDER, POSITION_OTHER],
  [POSITION_LEFT_DEFENDER]: [POSITION_RIGHT_DEFENDER, POSITION_RIGHT_WING, POSITION_LEFT_WING, POSITION_CENTER, POSITION_OTHER],
  [POSITION_RIGHT_DEFENDER]: [POSITION_LEFT_DEFENDER, POSITION_LEFT_WING, POSITION_RIGHT_WING, POSITION_CENTER, POSITION_OTHER]
}
const PLAYERS_IN_LINE = 5

function getPlayersForPosition(position, players) {
  return _.filter(players, (player) => {
    return position === player.position
  })
}

function getSuitablePlayer(position, players) {
  const playersForPosition = getPlayersForPosition(position, players)
  if (playersForPosition.length === 0) {
    const otherPositions = REPLACE_POSITIONS[position]
    for (let i = 0; i < otherPositions.length; i++) {
      const bestSuitablePlayers = getPlayersForPosition(otherPositions[i], players)
      if (bestSuitablePlayers.length > 0) {
        return bestSuitablePlayers[0]
      }
    }
  }
  return playersForPosition[0]
}

export function lineUpGenerator(players, selectedPlayers) {
  const playersInRoster = []
  const goalkeepersInRoster = []
  players.map((player) => {
    if (_.includes(selectedPlayers, player.number)) {
      if (player.position === POSITION_GOALKEEPER) {
        goalkeepersInRoster.push(player)
      } else  {
        playersInRoster.push(player)
      }
    }
  })

  const linesCount = Math.ceil(playersInRoster.length / PLAYERS_IN_LINE)
  const shuffledPlayers = _.shuffle(playersInRoster)
  const lineUp = { lines: [], goalkeepers: [] }
  const positionsInLine = [
    POSITION_LEFT_WING,
    POSITION_CENTER,
    POSITION_RIGHT_WING,
    POSITION_LEFT_DEFENDER,
    POSITION_RIGHT_DEFENDER
  ]
  Array(linesCount).fill().map(() => {
    const line = {}
    positionsInLine.map((position) => {
      const selectedPlayer = getSuitablePlayer(position, shuffledPlayers)
      line[position] = selectedPlayer
      _.remove(shuffledPlayers, selectedPlayer)
    })
    lineUp.lines.push(line)
  })
  lineUp.goalkeepers = goalkeepersInRoster
  return lineUp
}
