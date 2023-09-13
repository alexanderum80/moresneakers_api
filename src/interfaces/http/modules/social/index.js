const {Router} = require('express')
const Status = require('http-status')
const container = require('src/container')
const axios = require('axios').default
const fetch = require('node-fetch')

module.exports = () => {
  const router = Router()
  const {response: {Success, Fail}} = container.cradle

  /**
   * @swagger
   * /social/instagram/:
   *   get:
   *     tags:
   *       - Social
   *     description: Returns data from Instagram API
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: Instagram data in json format
   *
   *       400:
   *         description: Bad request
   */

  router.get('/instagram', function (req, res) {
    axios.get('https://www.instagram.com/moresneakersofficial/?__a=1')
      .then(function (response) {
        res.status(Status.OK).json(Success(response.data))
      })
      .catch(function (error) {
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })

  return router
}
