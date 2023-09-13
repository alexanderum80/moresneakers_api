const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const attrs = ['id', 'currency', 'price', 'discountCode', 'salePercentage', 'releaseId', 'shopId', 'status', 'shipping', 'countries', 'offerDate', 'raffle', 'raffleStart', 'raffleEnd', 'releaseTime', 'displayWhatsNew', 'displayOnSale', 'timezone', 'createdAt', 'updatedAt','noTime','isPinned']

const updateUseCase = require('./update')
const patchUseCase = require('./patch')

const createUseCase = require('./create')
const getFullOffersUseCase = require('./getFullOffers');
const getOffersWithReleasesComingSoonUseCase = require('./getOffersWithReleasesComingSoon');
const getOffersDropedInTheLast24hUseCase = require('./getOffersDropedInTheLast24h');

const {
  getOneUseCase,
  // createUseCase,
  getAllUseCase,
  removeUseCase
} = require('src/app/crud')(OfferRepository, Offer, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  patchUseCase,
  getFullOffersUseCase,
  getOffersWithReleasesComingSoonUseCase,
  getOffersDropedInTheLast24hUseCase
}
