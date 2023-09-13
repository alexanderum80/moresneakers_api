const {SearchParams} = require('src/domain/search')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = () => {
  const mapQuery = (params) => {
    const {limit, offset, ordering, filter = {}, ...filterRest} = params
    if('status' in filterRest && !filterRest.status)delete filterRest.status
    const pagination = {
      limit: (params.limit) ? parseInt(params.limit) : 100,
      offset: (params.offset) ? parseInt(params.offset) : 0
    }
    let orderClauses = params.ordering
    if (!orderClauses) {
      orderClauses = []
    } else if (!Array.isArray(orderClauses)) {
      orderClauses = orderClauses.split(',')
    }
    let order
    if (!orderClauses) {
      order = [['createdAt', 'DESC']]
    } else {
      order = []
      orderClauses.forEach((sortParam) => {
        let field = (sortParam.charAt(0) === '-') ? sortParam.substring(1) : sortParam
        let type = (sortParam.charAt(0) === '-') ? 'DESC' : 'ASC'
        if (type === 'ASC' && field === 'rank') {
          order.push([Sequelize.fn('ISNULL', Sequelize.col(field))])
          order.push([field, type])
        } else {
          order.push([field, type])
        }
      })
    }

    console.log(order)

    Object.assign(filter, filterRest)
    const searchParams = SearchParams({filter, pagination, order})
    return searchParams
  }
  return mapQuery
}
