const { Offer } = require('src/domain/offer');
const SearchResult = require('src/domain/search/search_result')
const BaseRepository = require('../base_repository');
const container = require('src/container'); // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError');

// inject database
const { database } = container.cradle;
const model = database.models.offers;
const offersLinksModel = database.models.offer_links;
const releasesModel = database.models.releases;
const styleModel = database.models.styles;
const shopsModel = database.models.shops;
const brandsModel = database.models.brands;
const categoriesModel = database.models.categories;
const Sequelize = require('sequelize');
const moment = require('moment');
const Redis = require('src/redis');

const Op = Sequelize.Op;
const createOptions = {
  include: [
    {
      model: offersLinksModel,
      as: 'links',
    },
    {
      model: shopsModel,
      as: 'shop',
    },
  ],
};
const updateOptions = createOptions;

const bulkUpdateOptions = {
  updateOnDuplicate: ["raffle", "status", "raffleEnd", "releaseTime", "timezone", "displayWhatsNew", "updatedAt" ]
};

const getOptionsCallback = (params) => {
  if (params.order) {
    params.order.forEach((param, ind) => {
      if (param[0] === 'hot') {
        params.order[ind].unshift({ model: releasesModel, as: 'release' });
      }
    });
  }
  return {
    include: [
      {
        model: releasesModel,
        as: 'release',
        attributes: [
          'id',
          'sku',
          'name',
          'description',
          'color',
          'priceUSD',
          'priceGBP',
          'priceEUR',
          'slug',
          'gender',
          'collectionId',
          'styleId',
          'hot',
          'mainImage',
          'updatedAt',
          'thumbnail',
          'inlineRelease'
        ],
        required: true,
        include: [
          {
            model: styleModel,
            as: 'style',
            include: [{model: brandsModel, as: 'BrandModel'}],
            required: true,
          },
        ],
      },
      {
        model: offersLinksModel,
        as: 'links',
      },
      {
        model: shopsModel,
        as: 'shop',
        include: [{ model: shopsModel, as: 'parentShop' }]
      }
    ],
    distinct: true,
    subQuery: false,
  };
};

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { brand: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel,
    };
  },
  categoryId: (value) => {
    return {
      filter: { id: Array.isArray(value) ? { [Op.or]: value } : value },
      model: categoriesModel,
    };
  },
  sku: (value) => {
    return {
      filter: { sku: value },
      model: releasesModel,
    };
  },
  collectionId: (value) => {
    return {
      filter: { collectionId: value },
      model: releasesModel,
    };
  },
  styleId: (value) => {
    return {
      filter: { styleId: value },
      model: releasesModel,
    };
  },
  gender: (value) => {
    return {
      filter: { gender: value },
      model: releasesModel,
    };
  },
  hot: (value) => {
    return {
      filter: { hot: value },
      model: releasesModel,
    };
  },
  active: (value) => {
    return {
      filter: { active: Boolean(value) },
      model: shopsModel,
    };
  },
  showOnRegion: (value) => {
    return {
      filter: { showOnRegion: value },
      model: shopsModel,
    };
  },
  minPrice: (value) => {
    return {
      filter: { price: { [Op.gte]: parseFloat(value) } },
    };
  },
  maxPrice: (value) => {
    return {
      filter: { price: { [Op.lte]: parseFloat(value) } },
    };
  },
  color: (value) => {
    const colors = Array.isArray(value) ? value : [value];
    const likes = [];
    colors.forEach((color) => {
      likes.push({ [Op.like]: `%${color}%` });
    });
    return {
      filter: { color: { [Op.or]: likes } },
      model: releasesModel,
    };
  },
  status: (value) => {
    return { 
      filter:{
        status:value,
      }
    }
  },
  notStatus: (value) => {
    if(value){
      if(Array.isArray(value))
        return { 
          filter: { 
            status: Array.isArray(value) ? { [Op.notIn]: value } : {[Op.ne]:value} 
          },
        }
      else 
        return { 
          filter:{
            status:{[Op.ne]:value},
          }
        }
    }
  },
  raffleEndBeforeTodayNoStatus: (value) => {
    const d = moment.utc()
    const raffleEnd = { 
      [Op.lt]: d,
      // [Op.ne]: null, 
      // [Op.ne]: '0000-00-00 00:00:00' 
    }

    if(value){
      if(Array.isArray(value))
        return { 
          filter: { 
            [Op.not]:{
              raffleEnd,
              status: Array.isArray(value) ? { [Op.notIn]: value } : {[Op.eq]:value} 
            }
          },
        }
      else 
        return { 
          filter:{
            [Op.not]:{
              raffleEnd,
              status:{[Op.eq]:value},
            }
          }
        }
    }
  },
  statusReleases: (value) => {
    return { 
      filter:{
        status:value,
        model: releasesModel,
      }
    }
  },
  releasesNext48h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const n48h=moment(d).add(48,'hours')
    return { 
      filter:{
        releaseTime: { [Op.gte]: d,[Op.lte]:n48h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } ,
        model: releasesModel,
      }
    }
  },
  next48h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const n48h=moment(d).add(48,'hours')
    return { 
      filter:{
        releaseTime: { [Op.gte]: d,[Op.lte]:n48h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },

  releasesNext72h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const n72h=moment(d).add(72,'hours')
    return { 
      filter:{
        releaseTime: { [Op.gte]: d,[Op.lte]:n72h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } ,
        model: releasesModel,
      }
    }
  },
  next72h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const n72h=moment(d).add(72,'hours')
    return { 
      filter:{
        releaseTime: { [Op.gte]: d,[Op.lte]:n72h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },

  last12h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const l12j=moment(d).subtract(12,'hours')
    return {
      filter:{ 
        releaseTime: { 
          // [Op.lte]: d,
          [Op.gte]:l12j,
          [Op.ne]: null, 
          [Op.ne]: '0000-00-00 00:00:00' 
        } 
      }
    }
  },
  last24h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const l24h=moment(d).subtract(24,'hours')
    return {
      filter:{ 
        updatedAt: { [Op.lte]: d,[Op.gte]:l24h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },
  raffleEndLastWeek: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const lw=moment(d).subtract(7,'days')
    return {
      filter:{ 
        raffleEnd: { [Op.gte]:lw, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },
  lastWeek: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const lw=moment(d).subtract(7,'days')
    return {
      filter:{ 
        releaseTime: { [Op.lte]: d,[Op.gte]:lw, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },
  releasesLast24h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const l24h=moment(d).subtract(24,'hours')
    return {
      filter:{ 
        updatedAt: { [Op.lte]: d,[Op.gte]:l24h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' },
        model: releasesModel,
      }
    }
  },
  last72h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const l72h=moment(d).subtract(72,'hours')
    return {
      filter:{ 
        updatedAt: { [Op.lte]: d,[Op.gte]:l72h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },
  releasesLast72h: (value) => {
    const d= value ? moment(value).utc() : moment.utc()
    const l72h=moment(d).subtract(72,'hours')
    return {
      filter:{ 
        updatedAt: { [Op.lte]: d,[Op.gte]:l72h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' },
        model: releasesModel,
      }
    }
  },

  isRaffle: (value) => {
    const ir = (!value || value == "true") ? true : false;
    return {
      filter: { raffle: { [Op.eq]: ir } },
    };
  },

  hasReleaseTime: (value) => {
    return { 
      filter:{
        releaseTime: { [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
      }
    }
  },

  
};

const OfferRepository = BaseRepository(database.models.offers, Offer, {
  createOptions,
  updateOptions,
  bulkUpdateOptions,
  getOptionsCallback,
  filterMappings,
});

const updateLinks = async (id, links) => {
  const offer = await model.findOne({
    where: { id },
  });
  if (!offer) {
    throw new EntityNotFound();
  }
  await offersLinksModel.destroy({
    where: {
      offerId: id,
    },
  });
  const newLinks = await offersLinksModel.bulkCreate(links);
  await offer.setLinks(newLinks);
  return newLinks;
};

const getLinks = async (id) => {
  const offer = await model.findOne({
    where: { id },
  });
  if (!offer) {
    throw new EntityNotFound();
  }
  return offer.getLinks();
};

const updateShopLinks = async (shop, apply) => {
  const shopId = shop.id;
  let links = await offersLinksModel.findAll({
    include: [
      {
        model: model,
        where: { shopId },
      },
    ],
  });
  for (const link of links) {
    const toUpdate = await apply(shop, link);
    if (toUpdate) {
      await link.update(toUpdate);
    }
  }
  return links;
};

const getFullOffersList = async (searchParams) => {
  OfferRepository.getPagination(searchParams);

  const offers = await model.findAndCountAll({
      include: [{
          model: releasesModel, as: 'release',
          include: [{
            model: styleModel, as: 'style',
            include: [{
                model: brandsModel, as: 'BrandModel'
            }]
          }]
      }],
      offset: searchParams.pagination.offset || 0,
      limit: searchParams.pagination.limit || 16,
      order: searchParams.order
    });

  const rows = offers.rows.map((data) => {
    const {dataValues} = data
    return Offer(dataValues)
  })
  return SearchResult({rows, count: offers.count})

};

const getPagination = (searchParams) => {
  let sp = {}
  sp['limit'] =
    searchParams['filter']['pageSize'] ? +parseInt(searchParams['filter']['pageSize']) :
      searchParams['pagination']['limit']
  sp['offset'] =
    searchParams['filter']['pageIndex'] ? (parseInt(searchParams['filter']['pageIndex']) - 1) *
      parseInt(searchParams['pagination']['limit']) : searchParams['pagination']['offset']
      return sp;
}

/**
 * Fetches offers with releases coming soon (next 48 h)
 * @param date The date string to start (YYYY-MM-DD), if null wil be utc today
 * @returns {Promise<*[]>}
 */
 const getOffersWithReleasesComingSoon = async (date=null,searchParams) => {
  const d= date ? moment(date).utc() : moment.utc()
  const next48h=moment(d).add(48,'hours')
  const where = { 
    status:'coming_soon',
    releaseTime: { [Op.gte]: d,[Op.lte]:next48h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
  }
  const hash = 'offers';
  const key = JSON.stringify({...where,...searchParams});
  let offers = await Redis.get(hash, key);
  if(offers) return offers; 
  const sp = getPagination(searchParams)

  let data = await model.findAll({
    where,
    include:[
      {
        model:releasesModel,
        as:'release',
        // where:{
        //   releaseDate: { [Op.gte]: d,[Op.lte]:next48h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
        // }
      },
      {
      model: offersLinksModel,
      as: 'links',
    },
    {
      model: shopsModel,
      as: 'shop',
    }
    ],
    ...sp,
    order: [
      ['releaseTime','DESC']
    ]
  });

  return Redis.set(hash, key, data);
}

/**
 * Fetches offers droped in the last 24 hours
 * @param date The date string to start (YYYY-MM-DD), if null wil be utc today
 * @returns {Promise<*[]>}
 */
 const getOffersDropedInTheLast24h = async (date=null,searchParams) => {
  const d= date ? moment(date).utc() : moment.utc()
  const last24h=moment(d).subtract(24,'hours')
  const where = { 
    updatedAt: { [Op.lte]: d,[Op.gte]:last24h, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } 
  }
  const hash = 'offers';
  const key = JSON.stringify({...where,...searchParams});
  let offers = await Redis.get(hash, key);
  if(offers) return offers; 
  const sp = getPagination(searchParams)

  let data = await model.findAll({
    where,
    include:[
      {
        model:releasesModel,
        as:'release',
      },
      {
      model: offersLinksModel,
      as: 'links',
    },
    {
      model: shopsModel,
      as: 'shop',
    }
    ],
    ...sp,
    order: [['updatedAt','DESC']]
  });

  return Redis.set(hash, key, data);
}

Object.assign(OfferRepository, {
  updateLinks,
  updateShopLinks,
  getLinks,
  getFullOffersList,
  getOffersWithReleasesComingSoon,
  getOffersDropedInTheLast24h
});

module.exports = OfferRepository;