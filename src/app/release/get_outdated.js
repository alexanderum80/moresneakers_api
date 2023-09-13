const repository = require('src/infra/repositories/release')
const moment = require('moment')

const getOutOfDate = () => {
  const date = new Date(moment.utc().format('YYYY-MM-DD'))
  return Promise
    .resolve()
    .then(() =>
      repository.getPastReleases(date)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getOutOfDate
}
