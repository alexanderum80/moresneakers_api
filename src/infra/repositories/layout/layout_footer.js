const { LayoutFooter } = require('src/domain/layout')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI

// inject database
const { database } = container.cradle

const repository = BaseRepository(database.models.layout_footer, LayoutFooter)

module.exports = repository
