const {Router} = require('express')
const Status = require('http-status')
const container = require('src/container')
const fetch = require('node-fetch')

const {getOneUseCase: getOneUseCaseOffer} = require('src/app/offer')
const {getOneUseCase: getOneUseCaseDeal} = require('src/app/deal')

async function loadData (req) {
  let offers = req.body['offers']
  let deals = req.body['deals']
  let offerObjects = []
  let dealObjects = []
  if (offers) {
    for (let offer in offers) {
      await getOneUseCaseOffer.getOne(offers[offer]).then(async (data) => {
        offerObjects.push(data)
      })
    }
  }
  if (dealObjects) {
    for (let deal in deals) {
      await getOneUseCaseDeal.getOne(deals[deal]).then(async (data) => {
        dealObjects.push(data)
      })
    }
  }
  return {'offerObjects': offerObjects, 'dealObjects': dealObjects}
}

module.exports = () => {
  const router = Router()
  const {response: {Success, Fail}} = container.cradle

  /**
   * @swagger
   * /ourpartners_data/:
   *   get:
   *     tags:
   *       - Partners
   *     description: Returns data from given deals and offers
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: Offers and deals data in JSON format
   *
   *       400:
   *         description: Bad request
   */

  router.post('/', function (req, res) {
    loadData(req).then((offerObjects) => {
        res.status(Status.OK).json(Success(offerObjects))
      }
    )
  })

  return router
}
