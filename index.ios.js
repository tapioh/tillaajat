import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { registerScreens, PICK_SCREEN } from './screens'
import { colors, mainFontFamily } from './styles'
import configureStore from './store'

const store = configureStore()
registerScreens(store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: PICK_SCREEN,
    navigatorStyle: {
      navBarHidden: true,
      navBarTextColor: colors.white,
      navBarTextFontFamily: mainFontFamily,
      navBarButtonColor: colors.white,
      navBarButtonFontSize: 18,
      navBarButtonFontFamily: mainFontFamily,
      navBarTransparent: true,
      navBarTranslucent: true,
      drawUnderNavBar: true,
      statusBarTextColorScheme: 'light'
    }
  }
})
