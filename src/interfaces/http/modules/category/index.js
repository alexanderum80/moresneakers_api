const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  updateUseCase,
  removeUseCase,
  getByNameUseCase
} = require('src/app/category')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   category:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   */

  /**
   * @swagger
   * /categories/id:
   *   get:
   *     tags:
   *       - Categories
   *     description: Returns one category given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A category in json format
   *         schema:
   *           $ref: '#/definitions/category'
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
   * /categories:
   *   get:
   *     tags:
   *       - Categories
   *     description: Returns a list of categories
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of categories
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/category'
   *       401:
   *        $ref: '#/responses/Unauthorized'
   */
  router
    .get('/', (req, res) => {
      if (req.query.slug) {
        getByNameUseCase
          .getByName(req.query.slug)
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

  router.use(auth.authenticate())

  /**
   * @swagger
   * /categories:
   *   post:
   *     tags:
   *       - Categories
   *     description: Create new category
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Category's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/category'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/category'
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
   * /categories/id:
   *   put:
   *     tags:
   *       - Categories
   *     description: Update Category
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Category's ID to update
   *         type: string
   *       - name: body
   *         description: Category's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/category'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/category'
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
   * /categories/id:
   *   delete:
   *     tags:
   *       - Categories
   *     description: Delete Category
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Category's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/category'
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
