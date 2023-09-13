const { BitlyClient } = require('bitly')
const accessToken = process.env.BITLY_ACCESS_TOKEN || '6996b7ed8b655d7e658df1e5da58a5d914c4eb7b'
const bitly = new BitlyClient(accessToken, {})

const shortify = async (url) => {
  let result
  try {
    result = await bitly.shorten(url)
  } catch (e) {
    throw e
  }
  return { deeplink: result }
}

module.exports = {
  shortify
}
