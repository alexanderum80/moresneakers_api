const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getLinkedReleasesUseCase,
  linkReleasesUseCase,
  getLinkedShopsUseCase,
  linkShopsUseCase,
  changeImageUrlUseCase,
  getByExactNameUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/collection')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   collection:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       brand:
   *         type: string
   *         format: uuid
   */

  /**
   * @swagger
   * /collections/id:
   *   get:
   *     tags:
   *       - Collections
   *     description: Returns one collection given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A collection in json format
   *         schema:
   *           $ref: '#/definitions/collection'
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
   * /collections/:
   *   get:
   *     tags:
   *       - Collections
   *     description: Returns a list of collections
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of collections
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/collection'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      if (req.query.slug) {
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
   * /collections/id/shops:
   *   get:
   *     tags:
   *       - Collections
   *     description: Returns the list of shops linked to a collection
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of collections
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
   * Authentication for modifying endpoints
   */
  router.use(auth.authenticate())

  /**
   * @swagger
   * /collections/:
   *   post:
   *     tags:
   *       - Collections
   *     description: Create new collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Collection's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/collection'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/collection'
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
   * /collections/id:
   *   put:
   *     tags:
   *       - Collections
   *     description: Update Collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Collection's ID to update
   *         type: string
   *       - name: body
   *         description: Collection's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/collection'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/collection'
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
   * /collections/id:
   *   put:
   *     tags:
   *       - Collections
   *     description: Update Collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Collection's ID to update
   *         type: string
   *       - name: body
   *         description: Collection's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/collection'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/collection'
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
   * /collections/id:
   *   delete:
   *     tags:
   *       - Collections
   *     description: Delete Collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Collection's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/collection'
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
   * /collections/id/shops:
   *   post:
   *     tags:
   *       - Collections
   *     description: Set the shops linked to a collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Collection's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/collection'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/collection'
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

  /**
   * @swagger
   * /collections/id/releases:
   *   post:
   *     tags:
   *       - Collections
   *     description: Set the releases linked to a collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Collection's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/collection'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/collection'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .post('/:id/releases', (req, res) => {
      linkReleasesUseCase
        .linkReleases({ id: req.params.id, body: req.body })
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
   * /collections/id/releases:
   *   get:
   *     tags:
   *       - Collections
   *     description: Returns the list of releases linked to a collection
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of collections
   *         schema:
   *           type: array
   *           items:
   *             id:
   *               type: string
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id/releases', (req, res) => {
      getLinkedReleasesUseCase
        .getLinkedReleases(req.params.id)
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
