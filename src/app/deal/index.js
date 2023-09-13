const repository = require('src/infra/repositories/deal')
const { Deal } = require('src/domain/deal')
const bitly = require('src/infra/thirdparty/bitly')

const shortenUrl = async (url) => {
  try {
    const bitlyUrl = await bitly.shortify(url)
    if (bitlyUrl && bitlyUrl.deeplink && bitlyUrl.deeplink.url) {
      return bitlyUrl.deeplink.url
    }
  } catch (ex) {
    return null
  }
}

const beforeCreate = async (domain) => {
  if (domain.trackedUrl && domain.trackedUrl !== '') {
    const bitly = await shortenUrl(domain.trackedUrl)
    if (bitly) {
      domain.bitlyUrl = bitly
    }
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
  return domain
}

const beforeUpdate = async (domain, { id }) => {
  const oldDeal = await repository.getById(id)
  if (domain.trackedUrl && domain.trackedUrl !== '' && oldDeal.trackedUrl !== domain.trackedUrl) {
    const bitly = await shortenUrl(domain.trackedUrl)
    if (bitly) {
      domain.bitlyUrl = bitly
    }
  }
  /*let links = domain.links;
  for (let link of links) {
    link.bitlyUrl = await shortenUrl(link.url);
  }*/
  const oldLinksDict = {}
  if (id) {
    const oldLinks = oldDeal.links;
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
  return domain
}

const attrs = ['id', 'createdAt', 'updatedAt', 'url' ,'bitlyUrl', 'trackedUrl' , 'salePercentage', 'status', 'shopId', 'displayOnSale', 'imgUrl', 'endDate', 'endTime', 'promoCode', 'startDate', 'startTime', 'description']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Deal, attrs, {
  beforeCreate,
  beforeUpdate
})

const changeImageUrlUseCase = require('./change_image_url')
const getAllByShopUseCase = require('./get_all_by_shop')
const getDealsListUseCase = require('./get_deals_list')

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getAllByShopUseCase,
  getDealsListUseCase
}
