const { createContainer, asValue, asFunction, asClass } = require('awilix')

const app = require('./app')
const server = require('./interfaces/http/server')
const router = require('./interfaces/http/router')
const auth = require('./interfaces/http/auth')
const config = require('../config')
const logger = require('./infra/logging/logger')
const database = require('./infra/database')
const jwt = require('./infra/jwt')
const response = require('./infra/support/response')
const date = require('./infra/support/date')
const query = require('./infra/support/query_mapper')
const set_release_status = require('./infra/support/set_release_status')

const upload = require('./infra/multer')
const Redis = require('./redis')
const container = createContainer()

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    database: asFunction(database).singleton(),
    auth: asFunction(auth).singleton(),
    jwt: asFunction(jwt).singleton(),
    query: asFunction(query).singleton(),
    set_release_status: asFunction(set_release_status).singleton(),
    response: asFunction(response).singleton(),
    date: asFunction(date).singleton(),
    upload: asFunction(upload).singleton(),
    config: asValue(config),
    redis: asClass(Redis).singleton()
  })
  // register repositories

module.exports = container
