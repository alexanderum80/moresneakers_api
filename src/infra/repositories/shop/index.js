const { Shop } = require('src/domain/shop')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const EntityUniqueConstrainError = require('src/infra/errors/EntityAlreadyExists')
// inject database
const { database } = container.cradle
const model = database.models.shops
const workingHoursModel = database.models.shop_working_hours
const brandsModel = database.models.brands
const categoriesModel = database.models.categories
const countriesRepository = require('./countries_repository')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createOptions = {
  include: [{
    model: workingHoursModel,
    as: 'workingHours'
  }]
}
const updateOptions = createOptions
const getOptionsCallback = (params) => {
  return {
    include: [
      {
        model: workingHoursModel,
        as: 'workingHours',
        attributes: ['dayOfWeek', 'openHour', 'closeHour', 'offWork'],
        order: [['dayOfWeek', 'ASC']]
      }, {
        model: brandsModel, as: 'brands'
      }, {
        model: categoriesModel, as: 'categories'
      }
    ],
    distinct: true
  }
}

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { id: Array.isArray(value) ? { [Op.or]: value } : value },
      model: brandsModel
    }
  },
  categoryId: (value) => {
    return {
      filter: { id: Array.isArray(value) ? { [Op.or]: value } : value },
      model: categoriesModel
    }
  },
  showOnRegion: (value) => {
    return {
      filter: { showOnRegion: Array.isArray(value) ? { [Op.or]: value } : value }
    }
  },
  shipping: (value) => {
    const shippingFiler = { shippingCountries: Array.isArray(value) ? { [Op.or]: value } : value };
    if (Array.isArray(value) && value.find(reg => reg === 'Europe')) {
      const europeCountries = getEuropeCountries()
      const likes = []
      europeCountries.forEach(country => {
        likes.push({ [Op.like]: `%${country}%` })
      })
      return {
        filter: { [Op.or]: [
            { ...shippingFiler },
            {countries: { [Op.or]: likes }}
        ]}
      }
    }
    else if (Array.isArray(value) && value.find(reg => reg === 'USA')) {
      return {
        filter: { [Op.or]: [
            { ...shippingFiler },
            {countries: { [Op.like]: `%United States%` }}
          ]}
      }
    }
    return {
      filter: { ...shippingFiler }
    }
  },
  country: (value) => {
    const countries = Array.isArray(value) ? value : [value]
    const likes = []
    countries.forEach(country => {
      likes.push({ [Op.like]: `%${country}%` })
    })
    return {
      filter: { countries: { [Op.or]: likes } }
    }
  },
  hasParent: (value) => {
    if (parseInt(value) === 1) {
      return {
        filter: { parent: { [Op.ne]: null } }
      }
    }
    return {
      filter: { parent: null }
    }
  },
  init: value => {
    return {
      filter: { name: { [Op.like]: `${value}%` } }
    };
  }
}

const associatedIds = ['brands', 'categories']

const ShopRepository = BaseRepository(model, Shop, {
  createOptions,
  updateOptions,
  getOptionsCallback,
  associatedIds,
  filterMappings
})

const updateWorkingHours = async (id, workingHours) => {
  if (workingHours) {
    const shop = await model.findOne({
      where: { id }
    })
    if (!shop) {
      throw new EntityNotFound()
    }
    const currentWorkingHours = await workingHoursModel.findAll({
      where: { shopId: id }
    })

    for (let newWorkingHour of workingHours) {
      let currentWorkingHour = currentWorkingHours.find(w => w.dayOfWeek === newWorkingHour.dayOfWeek)
      if (currentWorkingHour) {
        currentWorkingHour.openHour = newWorkingHour.openHour
        currentWorkingHour.closeHour = newWorkingHour.closeHour
        currentWorkingHour.offWork = newWorkingHour.offWork
        await currentWorkingHour.save()
      } else {
        currentWorkingHour = await workingHoursModel.create(newWorkingHour)
        await shop.addWorkingHours(currentWorkingHour)
      }
    }
  }
}

const updateBrands = async (id, brands, shop = null) => {
  if (shop === null) {
    shop = await model.findOne({
      where: { id }
    })
  }
  if (!shop) {
    throw new EntityNotFound()
  }
  const brandsDb = await brandsModel.findAll({
    where: { id: brands }
  })
  await shop.setBrands(brandsDb)
  return shop
}

const updateCategories = async (id, categories, shop = null) => {
  if (shop === null) {
    shop = await model.findOne({
      where: { id }
    })
  }
  if (!shop) {
    throw new EntityNotFound()
  }
  const categoriesDb = await categoriesModel.findAll({
    where: { id: categories }
  })
  await shop.setCategories(categoriesDb)
  return shop
}

const createShop = async (domain) => {
  domain = unsetPropertiesByShopType(domain.isParent, domain.type, domain)
  const existing = await findBySlug(domain.slug)
  if (existing) {
    throw new EntityUniqueConstrainError()
  }
  const shop = await ShopRepository.create(domain)
  await updateBrands(shop.id, domain.brands)
  await updateCategories(shop.id, domain.categories)
}

const updateShop = async (id, domain) => {
  const shop = await model.findOne({
    where: { id }
  })
  if (!shop) {
    throw new EntityNotFound()
  }
  domain = unsetPropertiesByShopType(shop.isParent, shop.type, domain)

  if (domain.slug && shop.slug !== domain.slug) {
    // Check slug only if it changed
    const existing = await findBySlug(domain.slug)
    if (existing) {
      throw new EntityUniqueConstrainError()
    }
  }

  await ShopRepository.update(domain, id)
  if (shop.type === 'physical') {
    await updateWorkingHours(id, domain.workingHours)
  }
  if (domain.brands) {
    await updateBrands(id, domain.brands)
  }
  if (domain.categories) {
    await updateCategories(id, domain.categories)
  }
}

const findBySlug = async (slug) => {
  return await model.findOne({
    where: {
      slug
    }
  });
}

const unsetPropertiesByShopType = (isParent, shopType, domain) => {
  if (isParent) {
    domain.isParent = true
    domain.type = null
    domain.parent = null
    domain = unsetVirtualProperties(domain)
    domain = unsetPhysicalProperties(domain)
  } else {
    domain.isParent = false
    if (shopType === 'virtual') {
      domain = unsetPhysicalProperties(domain)
      domain.type = 'virtual'
    } else {
      domain = unsetVirtualProperties(domain)
      domain.type = 'physical'
    }
  }
  return domain
}

const unsetVirtualProperties = (domain) => {
  domain.currency = null
  domain.shippingDetails = null
  domain.shippingCountries = null
  return domain
}

const unsetPhysicalProperties = (domain) => {
  domain.address = null
  domain.zipCode = null
  domain.lat = 0.0
  domain.lon = 0.0
  domain.workingHours = null
  return domain
}

const getCountries = async () => {
  return countriesRepository.getCountries()
}


const getEuropeCountries = () => {
  const countries = countriesRepository.getCountries()
  return countries
    .filter(country => country.region === 'Europe')
    .map(item => item.country)
}

Object.assign(ShopRepository,{
  updateWorkingHours,
  updateBrands,
  updateCategories,
  getCountries,
  updateShop,
  createShop
});

module.exports = ShopRepository;
  

