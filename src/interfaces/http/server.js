const express = require('express')
const Sentry = require("@sentry/node");


module.exports = ({ config, router, logger, auth }) => {
  Sentry.init({
    dsn: "https://df63e00d307841c2b1a69030139ac4c5@o209398.ingest.sentry.io/5497634",
  });
  const app = express();

  app.use((req, res, next) => {
    if(process.env.NODE_ENV == 'development'){
      console.log('develop scope')
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200/');
    }
    next();
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler())
  app.disable('x-powered-by')

  app.use(auth.initialize())
  app.use(router)

  app.use(express.static('public'))
  // we define our static folder
  app.use('/api/images', express.static('public/upload/images'))


  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());

  return {
    app,
    start: () => new Promise((resolve) => {
      const http = app.listen(config.port, () => {
        const { port } = http.address()
        logger.info(`🤘 API - Port ${port}`)
      })
    })
  }
}
