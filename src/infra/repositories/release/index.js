const { Release, ReleaseImage } = require('src/domain/release')
const SearchResult = require('src/domain/search/search_result')
const BaseRepository = require('../base_repository')
const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const EntityUniqueConstrainError = require('src/infra/errors/EntityAlreadyExists')
// const bitly = require('src/infra/thirdparty/bitly')

// inject database
const { database, set_release_status } = container.cradle
const model = database.models.releases
const releaseImageModel = database.models.release_images
const styleModel = database.models.styles
const categoriesModel = database.models.categories
const offerModel = database.models.offers
const offerLinksModel = database.models.offer_links
const brandsModel = database.models.brands
const shopsModel = database.models.shops
const collectionsModel = database.models.collections

const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Redis = require('src/redis')

// const setOffersTrackedURL = async (releases) => {
//   await releases.forEach(async release=>{
//     await release.offers.forEach(async (offer,idx)=>{
//       let {shop,links} = offer;
//       let link = links[0];
//       if(!shop.trackingListBaseUrlIsAfter){
//         link.trackedUrl = `${shop.trackingListBaseUrl}${encodeURI(link.url)}`;
//       }
//       else{
//         link.trackedUrl = `${encodeURI(link.url)}${shop.trackingListBaseUrl}`;     
//       } 
    
//       try {
//         const bitlyUrl = await bitly.shortify(link.trackedUrl)
//         if (bitlyUrl && bitlyUrl.deeplink && bitlyUrl.deeplink.url) {
//           link.bitlyUrl = bitlyUrl.deeplink.url
//         }
//         else{
//           link.bitlyUrl = link.trackedUrl;
//         }
//       } catch (ex) {
//         link.bitlyUrl = link.trackedUrl;

//        }
      
//     })

//   })
// }

const getOptionsCallback = (params) => {
  return {
    include: [
      { model: releaseImageModel, as: 'images' },
      {
        model: styleModel, as: 'style', include: [{ model: brandsModel, as: 'BrandModel' }]
      },
      {
        model: offerModel, as: 'offers', attributes: ['status', 'raffle', 'shipping'], include: [
          {
            model: shopsModel, as: 'shop', required: false,
          }]
      },
      {
        model: categoriesModel, as: 'categories'
      }
    ],
    distinct: true
  }
}

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { brand: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel
    }
  },
  categoryId: (value) => {
    return {
      filter: { id: Array.isArray(value) ? { [Op.or]: value } : value },
      model: categoriesModel
    }
  },
  status: (value) => {
    return {
      filter: { status: Array.isArray(value) ? { [Op.or]: value } : value },
      model: offerModel
    }
  },
  onlyOnSale: (value) => {
    return {
      filter: { status: 'on_sale' },
      model: offerModel
    }
  },
  shipping: (value) => {
    return {
      filter: { shipping: Array.isArray(value) ? { [Op.or]: value } : value },
      model: offerModel
    }
  },
  outdated: (value) => {
    const date = new Date(moment.utc().format('YYYY-MM-DD'))
    return {
      // with date past today and not null
      filter: { releaseDate: { [Op.lt]: date, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } }
    }
  },
  coming: (value) => {
    const date = new Date(moment.utc().format('YYYY-MM-DD'))
    return {
      filter: { releaseDate: { [Op.gt]: date, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } }
    }
  },
  upcoming: (value) => {
    if (parseInt(value) === 0) {
      return {
        filter: { releaseDate: { [Op.ne]: null } }
      }
    }
    return {
      filter: { releaseDate: null }
    }
  },
  activeShop: (value) => {
    return {
      filter: { active: Boolean(value) },
      model: shopsModel,
    };
  },
  minPriceEUR: (value) => {
    return {
      filter: { priceEUR: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPriceEUR: (value) => {
    return {
      filter: { priceEUR: { [Op.lte]: parseFloat(value) } }
    }
  },
  minPriceGBP: (value) => {
    return {
      filter: { priceGBP: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPriceGBP: (value) => {
    return {
      filter: { priceGBP: { [Op.lte]: parseFloat(value) } }
    }
  },
  minPriceUSD: (value) => {
    return {
      filter: { priceUSD: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPriceUSD: (value) => {
    return {
      filter: { priceUSD: { [Op.lte]: parseFloat(value) } }
    }
  },
  fromDate: (value) => {
    return {
      filter: { releaseDate: { [Op.gte]: moment.utc(value) } }
    }
  },
  toDate: (value) => {
    return {
      filter: { releaseDate: { [Op.lte]: moment.utc(value) } }
    }
  },
  gender: (value) => {
    return {
      filter: { gender: Array.isArray(value) ? { [Op.or]: [...value, 'u'] } : { [Op.eq]: `${value}` } }
    }
  },
  color: (value) => {
    const colors = Array.isArray(value) ? value : [value]
    const likes = []
    colors.forEach(color => {
      likes.push({ [Op.like]: `%${color}%` })
    })
    return {
      filter: { color: { [Op.or]: likes } }
    }
  },
  name: (value) => {
    const words = value.split(/\s+/g)
    const likes = []
    words.forEach(word => {
      likes.push({ [Op.like]: `%${word}%` })
    })
    return {
      filter: {
        [Op.or]: {
          name: { [Op.and]: likes },
          sku: { [Op.and]: likes }
        }
      }
    }
  },
  query: (value) => {
    const words = value.split(/\s+/g)
    const likes = []
    words.forEach(word => {
      likes.push({ [Op.like]: `%${word}%` })
    })
    return {
      filter: {
        [Op.or]: {
          name: { [Op.and]: likes },
          sku: { [Op.and]: likes }
        }
      }
    }
  }
}

const associatedIds = ['categories']

const repository = BaseRepository(model, Release, { getOptionsCallback, filterMappings, associatedIds })

/**
 * Associates images to the release
 * @param id
 * @param images
 * @returns {Promise<Array<Model>>}
 */
const createImages = async (id, images) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImages = await releaseImageModel.bulkCreate(images)
  await release.addImages(newImages)
  return newImages
}

/**
 * Get all images associated with a release
 * @param id
 * @returns {Promise<*>}
 */
const getAllImages = async (id) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const images = release.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return ReleaseImage(dataValues)
  })
}

/**
 * Fetches all releases after date
 * @param date
 * @returns {Promise<*[]>}
 */
const getPastReleases = async (date) => {
  const releases = await model.findAll({
    where: { releaseDate: { [Op.lt]: date } }
  })
  return releases.map((data) => {
    return Release(data)
  })
}




/**
 * Gets the releases that match a specific slug with all your reference fields resolved
 * @param slug
 * @param searchParams
 * @returns {Promise<Release>}
 */
const getFullReleaseBySlug = async (slug, searchParams = {}) => {
  const query = {
    include: [
      {
        model: releaseImageModel, as: 'images',
      },
      {
        model: styleModel, as: 'style', attributes: ['id', 'name', 'description', 'brand'],
        include: [{ model: brandsModel, as: 'BrandModel' }]
      },
      {
        model: offerModel, as: 'offers', include: [{ model: offerLinksModel, as: 'links' },
        {
          model: shopsModel, as: 'shop',
          include: [{ model: shopsModel, as: 'parentShop' }]
        }]
      },
      {
        model: collectionsModel, as: 'collection'
      },
      {
        model: categoriesModel, as: 'categories'
      }
    ],
    where: { slug: { [Op.like]: `${slug}%` } },
    order: [[{ model: releaseImageModel, as: 'images' }, 'imgOrder', 'ASC']],
  };

  if (searchParams.filter.hasOwnProperty('activeShop')) {
    query['include'][2]['include'][1]['where'] = {
      active: {
        [Op.eq]: searchParams.filter.activeShop
      }
    }
  }
  const hash = 'releases';
  const key = JSON.stringify({slug,...query});
  let releases = await Redis.get(hash, key);
  if(releases) return releases; 

  releases = await model.findAll(query);
  // await setOffersTrackedURL(releases)
  
  return Redis.set(hash, key, releases);
}

/**
 * Get releases by style id and search parameters
 *
 * @param styleId        The style id
 * @param searchParams   Optional search params
 *
 * @returns {Promise<unknown>}
 */
const getReleasesByStyle = async (styleId, searchParams = {}) => {
  repository.getPagination(searchParams);
  let id = {
    [Op.eq]: styleId
  }
  if(typeof styleId == 'object')
  id={
    [Op.in]: styleId
  }
  const filterParams = function (searchParams){
    Object.keys(searchParams.filter).forEach((key) => {
      if(searchParams.filter[key] == 'All'){
        delete searchParams.filter[key]
      }
      if(key == "gender" && (searchParams.filter[key] == 'Men' || searchParams.filter[key] == 'Women')){
        searchParams.filter[key] = [searchParams.filter[key], 'Unisex']
      }
    })
  }
  const baseQuery = {
    include: [
      {
        model: releaseImageModel, as: 'images',
      },
      {
        model: styleModel, as: 'style',
        where: {
          id
        },
        include: [{ model: brandsModel, as: 'BrandModel' }]
      },
      {
        model: offerModel, as: 'offers', attributes: ['status', 'raffle', 'shipping'],
        include: [
          {
            model: shopsModel, as: 'shop',
            attributes: ['id','name','rank', ['parent','parentShop'], 'showOnRegion'],
            required: false,
          }
        ]
      },
      {
        model: categoriesModel, as: 'categories'
      }
    ],
    distinct: true,
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 16,
    order: searchParams.order,
  };
  const fields = ['id', 'name', 'description', 'styleId',
    'collectionId', 'sku', 'hot', 'children',
    'priceEUR', 'priceGBP', 'priceUSD', 'slug',
    'gender', 'color', 'supplierColor', 'mainImage',
    'releaseDate', 'customized', 'hiddenDashboard',
    'inlineRelease', 'createdAt', 'updatedAt', 'keywords', 'thumbnail'
  ];

  filterParams(searchParams);

  let query = toSequelizeSearch(baseQuery, fields, searchParams, filterMappings);

  console.log(query)

  const hash = model.tableName;
  const key = JSON.stringify({styleId,...query});
  let release = await Redis.get(hash, key);

  if(release) return SearchResult(release);

  return model.findAndCountAll(query).then((result) => {
    const rows = result.rows
    .map((data) => {
      const { dataValues } = data
      // set_release_status(dataValues)
      return dataValues
    })
    return Redis.set(hash, key, SearchResult({ rows, count: result.count }));
    //return SearchResult({ rows, count: result.count })
  })
}

const getFullReleaseList = async (searchParams) => {
  repository.getPagination(searchParams)

  const query = {
    include: [
      {
        model: styleModel, as: 'style', 
        include: [
          {
            model: brandsModel, as: 'BrandModel'
          }
        ]
      },
      {
        model: categoriesModel, as: 'categories'
      }
    ],
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 16,
    order: searchParams.order
  }
  if (searchParams.filter.hasOwnProperty('color')) {
    query['where'] = {
      [Op.or]: [
        {
          color: Array.isArray(searchParams.filter.color) ? { [Op.or]: searchParams.filter.color } : searchParams.filter.color
        }
      ]
    }
  }
  if (searchParams.filter.hasOwnProperty('brandId')) {
    query['include'][0]['where'] = {
      [Op.or]: [
        {
          brand: Array.isArray(searchParams.filter.brandId) ? { [Op.or]: searchParams.filter.brandId } : searchParams.filter.brandId
        }
      ]
    }
  }
  if (searchParams.filter.hasOwnProperty('categoryId')) {
    query['include'][1]['where'] = {
      [Op.or]: [
        {
          id: Array.isArray(searchParams.filter.categoryId) ? { [Op.or]: searchParams.filter.categoryId } : searchParams.filter.categoryId
        }
      ]
    }
  }

  const releases = await model.findAndCountAll(query)
  await setOffersTrackedURL(releases)

  return SearchResult({ rows: releases.rows, count: releases.count })
}

const offersIncludeForReleasesStatus = {
  model: offerModel, as: 'offers', attributes: ['status', 'raffle','raffleStart','raffleEnd', 'shipping','releaseId'],
  include: [
    {
      model: shopsModel, as: 'shop',
      attributes: ['id','name','rank', ['parent','parentShop'], 'showOnRegion'],
      required: false,
    }
  ],
  required:true
};


const getSearchTotalReleaseList = async (search , searchParams = {}) => {
  repository.getPagination(searchParams)

  const query = {
    include: [
      {
        model: styleModel, as: 'style',
        include: [
          {
            model: brandsModel, as: 'BrandModel',
          }
        ],
      },
      offersIncludeForReleasesStatus,
    ],  
    distinct: true,  
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 16,
    order: searchParams.order
  }
    const regexp_str=`${["",...search.split(" "),""].map(t=>t.toLowerCase()).join(".*")}`
  query['where'] = {
        [Op.or]:{
      name:{
        [Op.regexp]: regexp_str
      },    
      sku:{
        [Op.regexp]: regexp_str
      },
      color:{
          [Op.regexp]: regexp_str
      }
    }
  }
debugger;
  const hash = model.tableName;
  const key = `${JSON.stringify({regexp_str,searchParams})}`; 
  // await Redis.del(hash, key)
  let res = await Redis.get(hash, key);    
  if(res){
    const {rows,count} = res;
    return SearchResult({ rows, count }); 
  }


  return model.findAndCountAll(query).then((result) => {
    const rows = result.rows
    .map((data) => {
      const { dataValues } = data
      // set_release_status(dataValues)
      return dataValues
    })
    return Redis.set(hash, key, SearchResult({ rows, count: result.count }));
  })
}

const countLikeReleases = async (slug) => {
  const releases = await model.findAll({
    where: { slug: { [Op.like]: `${slug}%` } }  
  })
  if (!releases) return 0
  return releases.length
}

/**
 * Delete image from release
 * @param id
 * @returns {*}
 */
const destroyImage = (id) => releaseImageModel.destroy({ where: { id } })

/**
 * Update hiddenDashboard
 * @param id
 * @returns {*}
 */
const setHiddenDashboard = (id, hiddenDashboard) => model.update({ hiddenDashboard: hiddenDashboard }, { where: { id } })

const modifyUpdatedAt = (id, updatedAt) => database.sequelize.query('update releases set updatedAt=:updatedAt where id=:id', {
  replacements: {
    updatedAt,
    id
  }
})

const setImageOrder = (imgUrl, imgOrder) => database.sequelize.query('update release_images set imgOrder=:imgOrder where imgUrl=:imgUrl', {
  replacements: {
    imgOrder,
    imgUrl
  }
})

const findBySlug = async (slug) => {
  return await model.findOne({
    where: {
      slug
    }
  })
}

const findBySlugWithDetails = async (slug) => {
  return await model.findOne({
    include: [
      {
        model: releaseImageModel, as: 'images'
      },
      {
        model: collectionsModel, as: 'collection'
      },
      {
        model: styleModel, as: 'style', attributes: ['id', 'name', 'description'],
        include: [
          {
            model: brandsModel, as: 'BrandModel'
          }
        ]
      },
    ],
    where: { slug: { [Op.like]: `${slug}%` } },
    order: [[{ model: releaseImageModel, as: 'images' }, 'imgOrder', 'ASC']],
  })
}

const findOffersBySlug = async (slug, searchParams) => {
  repository.getPagination(searchParams)
  const query = {
    include: [
      {
        model: offerModel, as: 'offers', include: [{ model: offerLinksModel, as: 'links' },
        {
          model: shopsModel, as: 'shop',
          include: [{ model: shopsModel, as: 'parentShop' }],

        }],
        offset: searchParams.pagination.offset,
        limit: searchParams.pagination.limit || 16,
        order: searchParams.order,
      },
    ],
    where: { slug: { [Op.like]: `${slug}%` } }
  }
  if (searchParams.filter.hasOwnProperty('raffle')) {
    query['include'][0]['where'] = {
      [Op.and]: [
        {
          raffle: Array.isArray(searchParams.filter.raffle) ? { [Op.or]: searchParams.filter.raffle } : searchParams.filter.raffle
        }
      ]
    }
  }
  if (searchParams.filter.hasOwnProperty('shipping')) {
    if (!query['include'][0]['where']) {
      query['include'][0]['where'] = { [Op.and]: [] }
    }
    query['include'][0]['where'][Op.and].push(
      {
        shipping: Array.isArray(searchParams.filter.shipping) ? { [Op.or]: searchParams.filter.shipping } : searchParams.filter.shipping
      }
    )
  }

  if (searchParams.filter.hasOwnProperty('activeShop')) {
    query['include'][0]['include'][1]['where'] = {
      active: {
        [Op.eq]: searchParams.filter.activeShop
      }
    }
  }

  const offers = await model.findAndCountAll(query)
  return offers

}

const findByStatusGroup = async (groupStatus, searchParams) => {
  
  repository.getPagination(searchParams);

  const baseQuery = {
    include: [
      {
        model: styleModel, as: 'style',
        include: [
          {
            model: brandsModel, as: 'BrandModel'
          }
        ]
      },
      {
        model: offerModel, as: 'offers', attributes: ['status', 'raffle', 'shipping'],
        include: [
          {
            model: shopsModel, as: 'shop',
            required: false,
          }
        ]
      },
      {
        model: categoriesModel, as: 'categories'
      }
    ],
    distinct: true,
  }

  const fields = ['id', 'name', 'description', 'styleId',
    'collectionId', 'sku', 'hot', 'children',
    'priceEUR', 'priceGBP', 'priceUSD', 'slug',
    'gender', 'color', 'supplierColor', 'mainImage',
    'releaseDate', 'customized', 'hiddenDashboard',
    'inlineRelease', 'createdAt', 'updatedAt', 'keywords', 'thumbnail'
  ];

  const filterParams = function (searchParams){
    Object.keys(searchParams.filter).forEach((key) => {
      if(searchParams.filter[key] == 'All'){
        delete searchParams.filter[key]
      }
      if(key == "gender" && (searchParams.filter[key] == 'Men' || searchParams.filter[key] == 'Women')){
        searchParams.filter[key] = [searchParams.filter[key], 'Unisex']
      }
    })
  }

  filterParams(searchParams);

  let query = toSequelizeSearch(baseQuery, fields, searchParams, filterMappings);
  if (groupStatus === 'in-stock') {
    const whereCondition = {
      [Op.and]: [
        {
          status: {
            [Op.in]: ['available', 'on_sale', 'restock']
          },
          raffle: {
            [Op.eq]: 0
          }
        },
        {
          shopId: {
            [Op.in]: Sequelize.literal("(SELECT id FROM shops WHERE showOnRegion !='Marketplaces')")
          }
        }
      ]
    }

    const queryWhere = (query['include'][1]['where']) ? query['include'][1]['where'] : {};
    query['include'][1]['where'] = Object.assign(queryWhere, whereCondition);

  } else if (groupStatus === 'coming-soon') {
    const whereCondition = {
      status: {
        [Op.in]: ['coming_soon', 'live'],
      },
    }

    let queryWhere = (query['include'][1]['where']) ? query['include'][1]['where'] : {};
    query['include'][1]['where'] = Object.assign(queryWhere, whereCondition);

    queryWhere = (query['where']) ? query['where'] : {};
    query['where'] = Object.assign(queryWhere, {
      [Op.and]: Sequelize.literal("NOT EXISTS (SELECT 1 FROM offers INNER JOIN shops WHERE offers.releaseId = releases.id " +
        "AND shops.id = offers.shopId AND offers.status IN ('available', 'on_sale', 'restock') AND shops.showOnRegion != 'Marketplaces')")
    });

  } else if (groupStatus === 'resell-only') {
    const whereCondition = {
      status: {
        [Op.in]: ['available', 'sold_out', 'closed'],
      }
    };

    let queryWhere = (query['include'][1]['where']) ? query['include'][1]['where'] : {};
    query['include'][1]['where'] = Object.assign(queryWhere, whereCondition);

    queryWhere = (query['where']) ? query['where'] : {};
    query['where'] = Object.assign(queryWhere, {
      [Op.and]: Sequelize.literal("NOT EXISTS (SELECT 1 FROM offers WHERE offers.releaseId = releases.id AND offers.status IN ('on_sale', 'restock', 'coming_soon', 'live')) " +
        "AND NOT EXISTS (SELECT 1 FROM offers INNER JOIN shops WHERE offers.releaseId = releases.id AND shops.id = offers.shopId AND shops.showOnRegion != 'Marketplaces' AND offers.status = 'available') " +
        "AND EXISTS (SELECT 1 FROM offers INNER JOIN shops WHERE offers.releaseId = releases.id AND shops.id = offers.shopId AND shops.showOnRegion = 'Marketplaces' AND offers.status = 'available')")
    });
  }

  const hash = model.tableName;
  const key = `${JSON.stringify({groupStatus,searchParams})}`; 
  // await Redis.del(hash, key)
  let res = await Redis.get(hash, key);    
  if(res){
    const {rows,count} = res;
    return SearchResult({ rows, count }); 
  }

  const releases = await model.findAndCountAll(query).then((result) => {
    const rows = result.rows.map((data) => {
      const { dataValues } = data
      dataValues['categories'] = dataValues['categories'].map((assocation) => assocation.id)
      return Release(dataValues);
    })
    return Redis.set(hash, key, SearchResult({ rows, count: result.count }));
  })
  return releases;
}

const updateCategories = async (id, categories, release = null) => {
  if (release === null) {
    release = await model.findOne({
      where: { id }
    })
  }
  if (!release) {
    throw new EntityNotFound()
  }
  const categoriesDb = await categoriesModel.findAll({
    where: { id: categories }
  })
  await release.setCategories(categoriesDb)
  return release
}

const createRelease = async (domain) => {
  const existing = await findBySlug(domain.slug)
  if (existing) {
    throw new EntityUniqueConstrainError()
  }
  await Redis.del(model.tableName);
  const release = await repository.create(domain)
  await updateCategories(release.id, domain.categories)
  return release
}

const updateRelease = async (id, domain) => {
  const release = await model.findOne({
    where: { id }
  })

  if (!release) {
    throw new EntityNotFound()
  }
  if (domain.slug && release.slug !== domain.slug) {
    // Check slug only if it changed
    const existing = await findBySlug(domain.slug)
    if (existing) {
      throw new EntityUniqueConstrainError()
    }
  }

  await repository.update(domain, id)
  if (domain.categories) {
    await updateCategories(id, domain.categories)
  }
  await Redis.del(model.tableName);
}

const modifyThumbnail =
  (id, thumbnail) => database.sequelize.query('update releases set thumbnail=:thumbnail where id=:id', {
    replacements: {
      thumbnail,
      id
    }
  })

Object.assign(repository, {
  createImages,
  destroyImage,
  getAllImages,
  getPastReleases,
  setHiddenDashboard,
  countLikeReleases,
  modifyUpdatedAt,
  setImageOrder,
  updateCategories,
  createRelease,
  updateRelease,
  getFullReleaseBySlug,
  getReleasesByStyle,
  getFullReleaseList,
  findBySlug,
  findOffersBySlug,
  findBySlugWithDetails,
  findByStatusGroup,
  modifyThumbnail,
  getSearchTotalReleaseList
  
})

module.exports = repository
