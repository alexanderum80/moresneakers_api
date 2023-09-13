const { Url } = require('src/domain/url')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const repository = BaseRepository(database.models.urls, Url)

module.exports = repository
