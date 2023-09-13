const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const attrs = [
  'id',
  'name',
  'type',
  'description',
  'address',
  'slug',
  'siteUrl',
  'currency',
  'country',
  'region',
  'shippingDetails',
  'shippingCountries',
  'countries',
  'mainImage',
  'smallImage',
  'headerImage',
  'trackingListBaseUrl',
  'trackingListBaseUrlIsAfter',
  'rank',
  'active',
  'zipCode',
  'parent',
  'isParent',
  'showOnRegion',
  'lat',
  'lon',
  'defaultOfferLabel',
  'createdAt',
  'updatedAt',
  'keywords',
  'meta_description'
]

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase
} = require('src/app/crud')(repository, Shop, attrs/*, { afterCreate }*/)
const getCountriesUseCase = require('./get_countries')
const updateUseCase = require('./update')
const createUseCase = require('./create')
const { searchUseCase } = require('./search')(repository, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getCountriesUseCase,
  searchUseCase
}
