const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')
const beforeUpdate = require('src/app/offer/hooks')
const { addBitlyToLinks } = require('src/app/offer/bitly-offer-service')
const Redis = require('src/redis')

const attrs = ['id', 'currency', 'price', 'discountCode', 'salePercentage', 'releaseId', 'shopId', 'status', 'shipping', 'countries', 'offerDate', 'raffle', 'raffleStart', 'raffleEnd', 'releaseTime', 'displayWhatsNew', 'displayOnSale', 'timezone', 'createdAt', 'updatedAt','noTime','isPinned']

const {
  getOneUseCase,
} = require('src/app/crud')(OfferRepository, Offer, attrs)


const patch = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offer = await getOneUseCase.getOne(id)
      offer = {...offer,...body};
      let domain = beforeUpdate.mapOffer(Offer(offer))

      domain = await addBitlyToLinks(domain, id)
      if(domain.releaseId)
        await Redis.del('releases');

      if(domain.shopId)
        await Redis.del('shops');

      await Redis.del('offers');

      let r = await OfferRepository.update(domain, id)
      await OfferRepository.updateLinks(id, domain.links)
      resolve(r)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  patch
}
