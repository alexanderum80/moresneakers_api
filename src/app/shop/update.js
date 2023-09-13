const repository = require('src/infra/repositories/shop')
const offersRepository = require('src/infra/repositories/offer')
const { Shop } = require('src/domain/shop')
const bitly = require('src/infra/thirdparty/bitly')
const Redis = require('src/redis');

const applyLink = async (shop, link) => {
  let trackedUrl = '';
  if(!shop.trackingListBaseUrlIsAfter){
    trackedUrl = `${shop.trackingListBaseUrl}${encodeURI(link.url)}`;
  }
  else{
    trackedUrl = `${encodeURI(link.url)}${shop.trackingListBaseUrl}`;     
  } 

  const toUpdate = { trackedUrl }
  try {
    const bitlyUrl = await bitly.shortify(trackedUrl)
    if (bitlyUrl && bitlyUrl.deeplink && bitlyUrl.deeplink.url) {
      toUpdate.bitlyUrl = bitlyUrl.deeplink.url
    }
    else{
      toUpdate.bitlyUrl = trackedUrl

    }
  } catch (ex) {
    toUpdate.bitlyUrl = trackedUrl
  }
  return toUpdate
}

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Shop(body)
      const oldShop = await repository.getById(id)
      domain.slug = domain.name.toLowerCase().replace(/\s+/g, '-')
      await repository.updateShop(id, domain)

      // Only recompute bitly tracked urls if the trackingListbaseUrl has changed
      let c = (domain.trackingListBaseUrl && oldShop.trackingListBaseUrl !== domain.trackingListBaseUrl)
      || oldShop.trackingListBaseUrlIsAfter != domain.trackingListBaseUrlIsAfter;
      if (c) {
        oldShop.trackingListBaseUrl = domain.trackingListBaseUrl
        oldShop.trackingListBaseUrlIsAfter= domain.trackingListBaseUrlIsAfter
        await offersRepository.updateShopLinks(oldShop, applyLink)
      }
      await Redis.del('offers')
      await Redis.del('releases')

      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  update
}
