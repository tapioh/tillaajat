import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

export const PLAYER_IMAGE_WIDTH_IN_PX = 80
export const PLAYER_POOL_HEIGHT_IN_PX = 160
export const PLAYER_POOL_MARGIN_IN_PX = 30
export const PLAYER_POOL_WIDTH_IN_PX = SCREEN_WIDTH - PLAYER_POOL_MARGIN_IN_PX
export const PLAYER_POOL_ACTIONS_HEIGHT_IN_PX = 60
