const { shortify } = require('src/infra/thirdparty/bitly')

const generateDeeplinkUseCase = (url, trackingUrl) => {
  if (!url || !trackingUrl) {
    throw new Error('Missing url or trackingUrl params')
  }
  return shortify(trackingUrl + url)
}

module.exports = {
  generateDeeplinkUseCase
}
