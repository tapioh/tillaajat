import { Navigation } from 'react-native-navigation'

import PickScreen from '../containers/Club/PickScreen'
import LineUpScreen from '../containers/Club/LineUpScreen'

export const PICK_SCREEN = 'tillaajat.PickScreen'
export const PICK_SCREEN_TITLE = 'Tillaajat'
export const LINE_UP_SCREEN = 'tillaajat.LineUpScreen'
export const LINE_UP_SCREEN_TITLE = 'Kokoonpano'

export function registerScreens(store, Provider) {
  Navigation.registerComponent(PICK_SCREEN, () => PickScreen, store, Provider)
  Navigation.registerComponent(LINE_UP_SCREEN, () => LineUpScreen, store, Provider)
}
