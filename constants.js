import { Platform } from 'react-native'

export const POSITION_LEFT_WING = 1
export const POSITION_CENTER = 2
export const POSITION_RIGHT_WING = 3
export const POSITION_LEFT_DEFENDER = 4
export const POSITION_RIGHT_DEFENDER = 5
export const POSITION_GOALKEEPER = 999
export const POSITION_OTHER = 1000

export const POSITION_STRINGS = {
  [POSITION_LEFT_WING]: 'VH',
  [POSITION_CENTER]: 'KH',
  [POSITION_RIGHT_WING]: 'OH',
  [POSITION_LEFT_DEFENDER]: 'VP',
  [POSITION_RIGHT_DEFENDER]: 'OP',
  [POSITION_GOALKEEPER]: 'MV',
  [POSITION_OTHER]: 'MUU'
}

export const HEADER_HEIGHT_IN_PX = Platform.OS !== 'ios' ? 54 : 64
export const PLAYER_ROW_HEIGHT_IN_PX = 45
export const PLAYER_ACTIONS_WIDTH_IN_PX = 110
export const PLAYER_BLOCK_HEIGHT_IN_PX = 100
export const PLAYER_BLOCK_WIDTH_IN_PX = 100
