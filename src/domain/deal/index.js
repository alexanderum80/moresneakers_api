const { makeEntity } = require('../helper')

const transform = (data) => {
  if (!data.startTime) {
    data.startTime = null;
  }
  if (!data.endTime) {
    data.endTime = null;
  }
  if (!data.startDate) {
    data.startDate = null;
  }
  if (!data.endDate) {
    data.endTime = null;
  }
  return data
}

const Deal = makeEntity(require('./deal'), transform)

module.exports = { Deal }
