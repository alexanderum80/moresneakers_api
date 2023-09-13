const EntityNotFoundError = require('src/infra/errors/EntityNotFoundError')
const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')
const container = require('src/container') // we have to get the DI
const { set_release_status } = container.cradle

const { SearchResult } = require('src/domain/search')
const Redis = require('src/redis')

module.exports = (model, toEntity, options = {}) => {
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

  const getAll = async (selectFields, searchParams) => {
    const hash = model.tableName;
    const key = `${JSON.stringify(searchParams)}`; 
    // // await Redis.del(hash);
    let res = await Redis.get(hash, key);    
    if(res){
      const {rows, count} = res; 
      return SearchResult({ rows, count });       
    }

    let attrs = {}
    // include sub queries and other sequelize options
    if (options.getOptions) {
      Object.assign(attrs, options.getOptions)
    }
    // get options from searchParams
    if (options.getOptionsCallback) {
      Object.assign(attrs, options.getOptionsCallback(searchParams))
    }
    getPagination(searchParams)
    let searchAttrs = toSequelizeSearch(attrs, selectFields, searchParams, options.filterMappings);
    const result = await model.findAndCountAll(searchAttrs);
    const rows = result.rows.map((data) => {
      const { dataValues } = data
      if (options && options.associatedIds) {
        options.associatedIds.forEach((item) => {
          dataValues[item] = dataValues[item].map((assocation) => assocation.id)
        })
      }
      // if(model.tableName=='releases'){
      //   set_release_status(dataValues)
      // }
      return toEntity(dataValues)
    })

    res = { rows, count: result.count };
  
    return Redis.set(hash, key, SearchResult(res));
  }

  const getById = async (id, attrs) => {
    const hash = model.tableName;
    const key = id;
    const dv = await Redis.get(hash, key);
    if(dv){
      return toEntity(dv);
    }

    const getAttrs = { where: { id: id }, attributes: attrs }
    if (options && options.getOptions) {
      Object.assign(getAttrs, options.getOptions)
    }
    if (options.getOptionsCallback) {
      Object.assign(getAttrs, options.getOptionsCallback({}))
    }
    const entity = await model.findOne(getAttrs)
    if (!entity) {
      throw new EntityNotFoundError()
    }
    const { dataValues } = entity;
    if (options && options.associatedIds) {
      options.associatedIds.forEach((item) => {
        dataValues[item] = dataValues[item].map((assocation) => assocation.id)
      })
    }
    // if(model.tableName=='releases'){
    //   set_release_status(dataValues)
    // }
    await Redis.set(hash, key, dataValues);
    return toEntity(dataValues);
    
  }

  const getByName = async (name, attrs) => {
    const hash = model.tableName;
    const key = name;
    let result = await Redis.get(hash, key);
    if(result){
      return result;
    }
    result = await model.findAll({
      where: { name }
    });
    return Redis.set(hash, key, result);
  }

  const getBySlug = async (slug, attrs = {}) => {
    let params =  {where: {slug}};
    
    if(Object.keys(attrs).length > 0) {
      params = { where: { slug }, attributes: attrs };
    } 

    const hash = model.tableName;
    const key = JSON.stringify(params);
    let result = await Redis.get(hash, key);
    if(result)return result;
    
    result = await model.findOne(params);
    return Redis.set(hash, key, result);
  }

  const create = async (domain) => {
    await Redis.del(model.tableName);
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }
    if (options && options.createOptions) {
      return model.create(domain, options.createOptions).then(({ dataValues }) => {
        return toEntity(dataValues)
      })
    }
    return model.create(domain).then(({ dataValues }) => {
      return toEntity(dataValues)
    })
  }

  const bulkCreate = async (elements) => {
    await Redis.del(model.tableName);
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }
    if (options && options.createOptions) {
      return model.bulkCreate(elements, options.createOptions).then((models) => {
        return models.map((element) => { toEntity(element) })
      })
    }
    return model.bulkCreate(elements).then((models) => {
      return models.map((element) => { toEntity(element) })
    })
  }

  const bulkUpdate = async (records) => {
    await Redis.del(model.tableName);
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }
    if (options && options.bulkUpdateOptions) {
      return model.bulkCreate(records, options.bulkUpdateOptions)
    }
  }

  const update = async (domain, id,silent=false) => {
    await Redis.del(model.tableName);
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }
    let opt = options.updateOptions?{...options.updateOptions}:{}
    if(silent)
      Object.assign(opt, { silent:true })
    else
      Object.assign(opt, { silent:false })


    if (opt) {
      Object.assign(opt, { where: { id } })
      return model.update(domain, opt)
    }
    return model.update(domain, { where: { id }, ...silent ? { silent:true } : {} })
  }

  const destroy = async (id) => {
    await Redis.del(model.tableName);
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }
    return model.destroy({ where: { id } })
  }

  const destroyAll = async () => {
    await Redis.del(model.tableName);  
    switch(model.tableName){
      case 'offers':
        await Redis.del('shops');
        await Redis.del('releases');
        await Redis.del('offers');
        break;
    }  
    return model.destroy({ where: {} })
  }

  return {
    getAll,
    create,
    bulkCreate,
    bulkUpdate,
    update,
    destroy,
    destroyAll,
    getById,
    getPagination,
    getByName,
    getBySlug,
  }
}
