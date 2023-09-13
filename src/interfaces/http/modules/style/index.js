const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getPopularUseCase,
  getStylesByBrandUseCase,
  getLinkedShopsUseCase,
  linkShopsUseCase,
  getByExactNameUseCase,
  getOneUseCase,
  getStyleUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
} = require('src/app/style')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   style:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *         description: Style's id in Uuidv4 format
   *       name:
   *         type: string
   *         description: Style's name
   *       description:
   *         type: string
   *         description: Style's description
   *       brand:
   *         type: string
   *         format: uiid
   *         description: The brand it belongs to in Uuidv4 format
   *       parent:
   *         type: string
   *         format: uiid
   *         description: The parent style in Uuidv4 format
   *       category:
   *         type: string
   *         format: uiid
   *         description: The category it belongs to in Uuidv4 format
   *       updatedAt:
   *          type: string
   *          format: date-time
   *          description: The time it was last updated
   */

  router
    .get('/popular', (req, res) => {
      getPopularUseCase
        .getPopularStyles(req.query.brandId)
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
   * /styles/id:
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
      getStyleUseCase
        .getStyle(req.params.id)
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
   * /styles/:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns a list of styles
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of styles
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/style'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      if(req.query.brandId)
        getStylesByBrandUseCase
          .getStylesByBrand(req.query.brandId)
          .then(data=>{
            res.status(Status.OK).json(Success(data))
          })
          .catch((error) => {
            logger.error(error)
            res.status(Status.BAD_REQUEST).json(Fail(error.message))
          })
      else if (req.query.slug) {
        getByExactNameUseCase
          .getByExactName(req.query.slug)
          .then(data => {
            res.status(Status.OK).json(Success(data))
          })
          .catch((error) => {
            logger.error(error) // we still need to log every error for debugging
            res.status(Status.BAD_REQUEST).json(Fail(error.message))
          })
      } else {
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
      }
    })

  /**
   * @swagger
   * /styles/:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns the list of shops linked to a style
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of styles
   *         schema:
   *           type: array
   *           items:
   *             id:
   *               type: string
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id/shops', (req, res) => {
      getLinkedShopsUseCase
        .getLinkedShops(req.params.id)
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
   * Authenticated endpoints
   */
  router.use(auth.authenticate())

  /**
   * @swagger
   * /styles/:
   *   post:
   *     tags:
   *       - Styles
   *     description: Create new style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Style's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/style'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/style'
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
   * /styles/id:
   *   put:
   *     tags:
   *       - Styles
   *     description: Update Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to update
   *         type: string
   *       - name: body
   *         description: Style's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/style'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/style'
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
   * /styles/id:
   *   delete:
   *     tags:
   *       - Styles
   *     description: Delete Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/style'
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
  /**
   * @swagger
   * /styles/id/shops:
   *   post:
   *     tags:
   *       - Styles
   *     description: Set the shops linked to a style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Style's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/style'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/style'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .post('/:id/shops', (req, res) => {
      linkShopsUseCase
        .linkShops({ id: req.params.id, body: req.body })
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
