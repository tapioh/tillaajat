const clubLogo = require('../assets/images/tillaajat-logo-white-small.png')

export function getProfileImageForFacebookId(facebookId) {
  return facebookId
    ? { uri: `https://graph.facebook.com/${facebookId}/picture?width=200&height=200` }
    : clubLogo
}
