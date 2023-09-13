const { Deal } = require('src/domain/deal')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database

const { database } = container.cradle
const model = database.models.deals
const shopsModel = database.models.shops
const dealLinksModel = database.models.deal_links;

const Redis = require('src/redis');

const { Sequelize, Op } = require('sequelize')
const moment = require('moment')
const bitly = require('src/infra/thirdparty/bitly')
const base_repository = require('../base_repository')

const filterMappings = {
    hasEndDate: (value) => {
        return {
            filter:{
                endDate:{ [Op.ne]:null,[Op.ne]:'0000-00-00 00:00:00'}
            }
        }
    },
    endThisWeek: (value) => {
        const startOfWeek = moment(value?value:undefined).utc().startOf('week')
        const endOfWeek = moment(value?value:undefined).utc().endOf('week')
        return { 
            filter:{
                endDate: { [Op.gte]: startOfWeek,[Op.lte]:endOfWeek, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } ,
            }
        }
    },
};
const createOptions = {
    include: [
      {
        model: dealLinksModel,
        as: 'links',
      }
    ],
  };
  
const getOptionsCallback = (params) => {
    return {
      include: [
        {
            model: dealLinksModel,
            as: 'links',
          },
      ],
      distinct: true
    }
  }
const DealRepository = BaseRepository(database.models.deals, Deal,{
    filterMappings,
    createOptions,
    updateOptions:{...createOptions},
    getOptionsCallback
})

const getAllByShop = async (shopId) => {
    shop = await shopsModel.findOne({
        where: { id: shopId }
    })
    if (!shop) {
        throw new EntityNotFound()
    }
    const deals = await model.findAll({
        where: { 
            [Op.or]: [
                {
                    shopId
                },
                {
                    shopId: shop.parent
                }
            ]
        }
    })
    return deals
}

const getDealsList = async (searchParams) => {
  let or = []
  let and = []
  let where = []

  const getPagination = (searchParams) => {
    searchParams['pagination']['limit'] =
      searchParams['filter']['pageSize'] ? +parseInt(searchParams['filter']['pageSize']) :
        searchParams['pagination']['limit']
    searchParams['pagination']['offset'] =
      searchParams['filter']['pageIndex'] ? (parseInt(searchParams['filter']['pageIndex']) - 1) *
        parseInt(searchParams['pagination']['limit']) : searchParams['pagination']['offset']
    delete searchParams['filter']['pageSize']
    delete searchParams['filter']['pageIndex']
  }

  const getOrdering = (searchParams) => {
    let order_array = [];
    if (searchParams['filter']['order']) {
      let order = searchParams['filter']['order'];
      if(order.startsWith("-")){
        const char = order[0];

        const replaced = order.replace(char, '');
        order_array.push([replaced, 'DESC']);
      }
        
      else
        order_array.push([order, 'ASC']);
      
    }

    return order_array;
    
  }

  const _ordering = getOrdering(searchParams);


  getPagination(searchParams)

  /*if(or.length)where.push(
    `(${or.join(' or ')})`
  )
  if(and.length)where.push(
    `(${and.join(' and ')})`
  )

  const select = [
    'd.*','sh.name as shopName',
    'group_concat(dl.url separator "|") as linksURL','group_concat(dl.bitlyUrl separator "|") as linksBitlyUrl'
  ]
  const shop_join = `left join shops sh on sh.id = d.shopId`
  const links_join = `left join deal_links dl on dl.dealId = d.id`

  let query = `select ${select.join(',')} from deals d ${shop_join} ${links_join}`
  
  if(where.length)
  query += ` where ${where.join(' and ')}`

  query += ` group by d.id`

  if(searchParams.pagination.limit)
    query += ` limit ${searchParams.pagination.limit}`
  if(searchParams.pagination.offset)
    query += ` offset ${searchParams.pagination.offset}`

  let r = await database.sequelize.query(query,{type: database.sequelize.QueryTypes.SELECT})
    
  return r*/

  /*const startOfWeek = moment(value?value:undefined).utc().startOf('week')
  const endOfWeek = moment(value?value:undefined).utc().endOf('week')
  return { 
      filter:{
          endDate: { [Op.gte]: startOfWeek,[Op.lte]:endOfWeek, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } ,
      }
  }*/

  const _where = {
    status:{
      [Op.ne]: "Expired"
    },
    endDate:{
      [Op.gt]:  moment().utc().subtract(24, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  if(searchParams.filter.excludeAfter24hEnded && searchParams.filter.excludeAfter24hEnded == 'false'){
    delete _where.endDate;
  }

  
  if(searchParams.filter.excludeExpired && searchParams.filter.excludeExpired == 'false'){
    delete _where.status;
  }

  if(!searchParams.filter.excludeAfter24hEnded){
    delete _where.endDate;
  }

  if(!searchParams.filter.excludeExpired){
    delete _where.status;
  }
  

  const deals = await model.findAll({
      include: [
          {model: dealLinksModel, as: 'links'},
          {model: shopsModel, as: 'shop'}
      ],
      order: _ordering,
      offset: searchParams.pagination.offset || 0,
      limit: searchParams.pagination.limit || 16,
      where:_where
    });

  

  return deals;
}

// const applyLink = async (deal, link) => {
//     let trackedUrl = '';
//     if(!deal.trackingListBaseUrlIsAfter){
//       trackedUrl = `${deal.trackingListBaseUrl}${encodeURI(link.url)}`;
//     }
//     else{
//       trackedUrl = `${encodeURI(link.url)}${deal.trackingListBaseUrl}`;     
//     } 
  
//     const toUpdate = { trackedUrl }
//     try {
//       const bitlyUrl = await bitly.shortify(trackedUrl)
//       if (bitlyUrl && bitlyUrl.deeplink && bitlyUrl.deeplink.url) {
//         toUpdate.bitlyUrl = bitlyUrl.deeplink.url
//       }
//       else{
//         toUpdate.bitlyUrl = trackedUrl
  
//       }
//     } catch (ex) {
//       toUpdate.bitlyUrl = trackedUrl
//     }
//     return toUpdate
//   }
const updateLinks = async (dealId, links) => {
    const deal = await model.findOne({
      where: { id:dealId },
    });
    if (!deal) {
      throw new EntityNotFound();
    }
    await dealLinksModel.destroy({
      where: {
        dealId,
      },
    });
    const newLinks = await dealLinksModel.bulkCreate(links);
    // await deal.setLinks(newLinks);
    return newLinks;
}
 
const update = async (domain, id,silent=false) => {
    await Redis.del(model.tableName);
    await Redis.del('shops');

    if(domain.links)domain.links.forEach(d=>{d.dealId=id})

    if(!domain.endDate){
      domain = {...domain, endDate: null}
    }
    if(!domain.startDate){
      domain = {...domain, startDate: null}
    }
    
    let opt = {
        updateOptions:{...createOptions},
    }
    if(silent)
      Object.assign(opt, { silent:true })
    else
      Object.assign(opt, { silent:false })

    if (opt) {
      Object.assign(opt, { where: { id } })
      return model.update(domain, opt).then(()=>{
        if(domain.links)
        return updateLinks(id,domain.links)
      })
    }
    debugger;
    

    return model.update(domain, { where: { id }, ...silent ? { silent:true } : {} })
        // .then(()=>{
        //     if(domain.links)
        //     return updateLinks(id,domain.links)
        // })
}

const create = async (domain) => {debugger;
    await Redis.del(model.tableName);
    await Redis.del('shops');
    
    return model.create(domain, createOptions).then(async ({ dataValues }) => {
        debugger;
        // if(domain.links)
        //     await updateLinks(dataValues.id,domain.links);
      return Deal(dataValues);
    })
  }

Object.assign(DealRepository, {
    getAllByShop,
    update,
    create,
    getDealsList
})

module.exports = DealRepository
