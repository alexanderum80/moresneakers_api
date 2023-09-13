const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getAllByShopUseCase,
  getDealsListUseCase
} = require('src/app/deal')

module.exports = () => {debugger;
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   deal:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       startDate:
   *         type: string
   *         format: date-time
   *       endDate:
   *         type: string
   *         format: date-time
   *       salePercentage:
   *         type: number
   *       status:
   *         type: string
   *       promoCode:
   *         type: string
   *       time:
   *         type: string
   *       displayOnSale:
   *         type: boolean
   *       imgUrl:
   *         type: string
   *       shopId:
   *         type: string
   *         format: uuid
   */

   /**
   * @swagger
   * /deals/shop/shopId:
   *   get:
   *     tags:
   *       - Deals
   *     description: Returns all deals associated to a shop
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A list of deals in json format
   *         schema:
   *           $ref: '#/definitions/deal'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .get('/shop/:shopId', (req, res, next) => {
    getAllByShopUseCase
      .getAllByShop(req.params.shopId)
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
   * /deals/id:
   *   get:
   *     tags:
   *       - Deals
   *     description: Returns one deal given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A deal in json format
   *         schema:
   *           $ref: '#/definitions/deal'
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
   * /deals/:
   *   get:
   *     tags:
   *       - Deals
   *     description: Returns a list of deals
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of deals
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/deal'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      let _query = req.query; 
      if(req.query?.ordering){
        _query = {
          order: req.query.ordering,
          ...req.query
        }
      }
      
      getDealsListUseCase
        .getDealsList(mapQuery(_query))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router.use(auth.authenticate())

  /**
 * @swagger
 * /deals/:
 *   post:
 *     tags:
 *       - Deals
 *     description: Create new deal
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Deal's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/deal'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/deal'
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
   * /deals/id:
   *   put:
   *     tags:
   *       - Deals
   *     description: Update Deal
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Deal's ID to update
   *         type: string
   *       - name: body
   *         description: Deal's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/deal'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/deal'
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
   * /deals/id:
   *   put:
   *     tags:
   *       - Deals
   *     description: Update Deal
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Deal's ID to update
   *         type: string
   *       - name: body
   *         description: Deal's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/deal'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/deal'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .patch('/:id/imgUrl', (req, res) => {
      changeImageUrlUseCase
        .updateImageUrl(req.params.id, req.body.imgUrl)
        .then(() => {
          res.status(Status.OK).json(Success({}))
        })
        .catch((error) => {
          logger.error(error)
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /deals/id:
   *   delete:
   *     tags:
   *       - Deals
   *     description: Delete Deal
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Deal's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/deal'
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

  return router
}
