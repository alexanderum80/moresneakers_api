const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getCountriesUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  searchUseCase
} = require('src/app/shop')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
 * @swagger
 * definitions:
 *   shop:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       name:
 *         type: string
 *       region:
 *         type: string
 *       country:
 *         type: string
 *       currency:
 *         type: string
 *       active:
 *         type: boolean
 *       address:
 *         type: string
 *       createdBy:
 *         type: string
 *         format: uuid
 */

  router
    .get('/countries', (req, res) => {
      getCountriesUseCase
        .getCountries()
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
   * /shops/id:
   *   get:
   *     tags:
   *       - Shops
   *     description: Returns one shop given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A shop in json format
   *         schema:
   *           $ref: '#/definitions/shop'
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
  * /shops:
  *   get:
  *     tags:
  *       - Shops
  *     description: Returns a list of shops
  *     security:
  *       - JWT: []
  *     responses:
  *       200:
  *         description: An array of shops
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/shop'
  *       401:
  *        $ref: '#/responses/Unauthorized'
  */
  router
    .get('/', (req, res) => {
      getAllUseCase
        .all(mapQuery(req.query))
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
   * /shops/search:
   *   post:
   *     tags:
   *       - Shops
   *     description: Returns a list of shops
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of shops
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/shop'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .post('/search', (req, res) => {
    searchUseCase.search(mapQuery(req.body))
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

  /**
 * @swagger
 * /shops:
 *   post:
 *     tags:
 *       - Shops
 *     description: Create new shop
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Shops's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/shop'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/shop'
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
   * /shops/id:
   *   put:
   *     tags:
   *       - Shops
   *     description: Update Shop
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Shop's ID to update
   *         type: string
   *       - name: body
   *         description: Shop's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/shop'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/shop'
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
   * /shops/id:
   *   delete:
   *     tags:
   *       - Shops
   *     description: Delete Collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Shop's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/shop'
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
