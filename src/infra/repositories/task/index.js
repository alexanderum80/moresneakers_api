const { Task } = require('src/domain/task')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const getOptionsCallback = (params) => {
  return {
    include: [{
      model: database.models.users
    }]
  }
}
const repository = BaseRepository(database.models.tasks, Task, { getOptionsCallback })

module.exports = repository
