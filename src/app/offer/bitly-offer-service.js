const OfferRepository = require('src/infra/repositories/offer')
const bitly = require('src/infra/thirdparty/bitly')

const addBitlyToLinks = async (domain, id) => {
  // Only apply bitly if there was a change in tracked url
  const oldLinksDict = {}
  if (id) {
    const oldLinks = await OfferRepository.getLinks(id);
    console.log("OLD LINKS" + JSON.stringify(oldLinks))
    oldLinks.forEach((link) => {
      oldLinksDict[link.trackedUrl] =  link.bitlyUrl
    })
  }
  if (domain.links) {
    for (link of domain.links) {
      if (oldLinksDict[link.trackedUrl]) {
        link.bitlyUrl = oldLinksDict[link.trackedUrl]
      } else {
        try {
          const bitlyUrl = await bitly.shortify(link.trackedUrl)
          if (bitlyUrl && bitlyUrl.deeplink && bitlyUrl.deeplink.url) {
            link.bitlyUrl = bitlyUrl.deeplink.url
          }
        } catch (ex) { }
      }
    }
  }
  console.log(JSON.stringify(domain))
  return domain
}

module.exports = {
  addBitlyToLinks
}
