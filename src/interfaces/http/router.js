const statusMonitor = require('express-status-monitor')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')

const { Router } = require('express')
const { partialRight } = require('ramda')

const controller = require('./utils/create_controller')
const httpLogger = require('./middlewares/http_logger')
const errorHandler = require('./middlewares/error_handler')

module.exports = ({ config, logger, database }) => {
  const router = Router()

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor())
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(httpLogger(logger))
  }

  const apiRouter = Router()

  apiRouter
    .use(cors())
    .use(bodyParser.json())
    .use(compression())

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/', controller('index'))
  apiRouter.use('/token', controller('token'))
  apiRouter.use('/users', controller('user'))
  apiRouter.use('/shops', controller('shop'))
  apiRouter.use('/categories', controller('category'))
  apiRouter.use('/styles', controller('style'))
  apiRouter.use('/brands', controller('brand'))
  apiRouter.use('/releases', controller('release'))
  apiRouter.use('/offers', controller('offer'))
  apiRouter.use('/collections', controller('collection'))
  apiRouter.use('/blogs', controller('blog'))
  apiRouter.use('/deals', controller('deal'))
  apiRouter.use('/urls', controller('url'))
  apiRouter.use('/tasks', controller('task'))
  apiRouter.use('/image', controller('image'))
  apiRouter.use('/layouts', controller('layout'))
  apiRouter.use('/settings', controller('setting'))
  apiRouter.use('/analytics', controller('analytics'))
  apiRouter.use('/deeplink', controller('deeplink'))
  apiRouter.use('/mail', controller('mail'))
  apiRouter.use('/social', controller('social'))
  apiRouter.use('/ourpartners_data', controller('ourpartners'))
  router.use(`/api/${config.version}`, apiRouter)

  router.use(partialRight(errorHandler, [logger, config]))


  return router
}
