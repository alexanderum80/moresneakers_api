const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  patchUseCase,
  getFullOffersUseCase,
  getOffersWithReleasesComingSoonUseCase,
  getOffersDropedInTheLast24hUseCase,

} = require('src/app/offer');
const Redis = require('src/redis')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   offer:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *         description: Offer's id in Uuidv4 format
   *       description:
   *         type: string
   *         description: Offer's description
   *       releaseId:
   *         type: string
   *         description: The release it belongs to in Uuidv4 format
   *       shopId:
   *         type: string
   *         description: The shop it belongs to in Uuidv4 format
   *       status:
   *         type: string
   *         enum: ['sold_out', 'available', 'on_sale', 'unavailable', 'restock', 'coming_soon', 'live', 'closed']
   *       shipping:
   *         type: string
   *         enum: ['worldwide', 'unavailable']
   *       price:
   *         type: number
   *         description: The offer's price
   *       salePercentage:
   *         type: number
   *         description: The offer's sales percentage
   *       raffle:
   *         type: boolean
   *         description: Wether the offer is a raffle
   *       raffleStart:
   *         type: date
   *         description: Time when the raffle starts in the day, only when raffle true
   *       raffleEnd:
   *         type: date
   *         description: Time when the raffle ends in the day, only when raffle true
   *       releaseTime:
   *         type: date
   *         description: Release time, only when raffle false
   *       offerDate:
   *          type: string
   *          format: date-time
   *          description: The offer's date
   *       updatedAt:
   *          type: string
   *          format: date-time
   *          description: The time it was last updated
   *       createdAt:
   *          type: string
   *          format: date-time
   *          description: The time it was created
   */
  /**
   * @swagger
   * /offers/id:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns one style given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A style in json format
   *         schema:
   *           $ref: '#/definitions/style'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id', (req, res, next) => {
      getOneUseCase
        .getOne(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })
  /**
   * @swagger
   * /offers/:
   *   get:
   *     tags:
   *       - Offers
   *     description: Returns a list of offers
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of offers
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/offer'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      if ( req.query['full'] ) {

        getFullOffersUseCase
          .getFullOffers(mapQuery(req.query))
          .then(data => {
            res.status(Status.OK).json(Success(data));
          })
          .catch((error) => {
            logger.error(error) // we still need to log every error for debugging
            res.status(Status.BAD_REQUEST).json(Fail(error.message));
          })

      } else {
        
          getAllUseCase
            .all(mapQuery(req.query))
            .then(data => {
              res.status(Status.OK).json(Success(data))
            })
            .catch((error) => {
              logger.error(error) // we still need to log every error for debugging
              res.status(Status.BAD_REQUEST).json(Fail(error.message))
            })
      }
    })

    router.get('/about-to-drop/:action', async (req,res)=>{
      const date = req.query.date
      switch(req.params.action){
        case 'coming-soon':
          getOffersWithReleasesComingSoonUseCase
            .getOffersWithReleasesComingSoon(date,mapQuery(req.query))
            .then(data => {
              res.status(Status.OK).json(Success(data))
            })
            .catch((error) => {
              logger.error(error) 
              res.status(Status.BAD_REQUEST).json(Fail(error.message))
            })
          break;
        case 'just-dropped':
          getOffersDropedInTheLast24hUseCase
          .getOffersDropedInTheLast24h(date,mapQuery(req.query))
          .then(data => {
            res.status(Status.OK).json(Success(data))
          })
          .catch((error) => {
            logger.error(error) 
            res.status(Status.BAD_REQUEST).json(Fail(error.message))
          })
          break;
        case 'raffles':
          res.status(Status.OK).json({geo:req.params.action})
  
          break;
        default:
          res.status(Status.BAD_REQUEST).json(Fail('invalid action name'))
  
  
      }
    })

  /**
   * @swagger
   * /offers/:
   *   post:
   *     tags:
   *       - Offers
   *     description: Returns a list of offers
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of offers
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/offer'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .post('/search', (req, res) => {
      getAllUseCase.all(mapQuery(req.body))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * Authentication for modifying endpoints
   */
  router.use(auth.authenticate())
  router
  .get('/flushRedisCache', async (req, res) => {
    const r = await Redis.del('offers');

    res.json({r})
  })
  /**
 * @swagger
 * /offers/:
 *   post:
 *     tags:
 *       - Offers
 *     description: Create new offer
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Offer's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/offer'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/offer'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      createUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /offers/id:
   *   put:
   *     tags:
   *       - Offers
   *     description: Update Offer
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Offer's ID to update
   *         type: string
   *       - name: body
   *         description: Offer's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/offer'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/offer'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      updateUseCase
        .update({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /offers/id:
   *   delete:
   *     tags:
   *       - Offers
   *     description: Delete Offer
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Offer's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/offer'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:id', (req, res) => {
      removeUseCase
        .remove({ id: req.params.id })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

    router
    .patch('/:id', (req, res) => {
      patchUseCase
        .patch(req.params.id,req.body )
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })


  return router
}
