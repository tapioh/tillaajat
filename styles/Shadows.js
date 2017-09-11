import { colors } from './Colors'

export const shadows = {
  defaultBoxShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 1
  },
  mediumBoxShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 1
  },
  buttonShadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    shadowOpacity: 0.7,
    elevation: 1
  }
}
