const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getAllImagesUseCase,
  removeImageUseCase,
  createImageUseCase,
  changeImageUrlUseCase,
  getOneUseCase,
  getBySlugUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/blog')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   blog:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       body:
   *         type: string
   *       author:
   *         type: string
   *       title:
   *         type: string
   *       slug:
   *         type: string
   *       type:
   *         type: string
   *       brandId:
   *         type: string
   *         format: uuid
   */

  /**
   * @swagger
   * /blogs/id:
   *   get:
   *     tags:
   *       - Blogs
   *     description: Returns one blog given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A blog in json format
   *         schema:
   *           $ref: '#/definitions/blog'
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
   * /blogs/by-slug/slug:
   *   get:
   *     tags:
   *       - Blogs
   *     description: Returns one blog given slug
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A blog in json format
   *         schema:
   *           $ref: '#/definitions/blog'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router.get('/by-slug/:slug', (req, res, next) => {
    getBySlugUseCase.getBySlug(req.params.slug)
      .then(async data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        next(error)
      })
  })
  /**
   * @swagger
   * /blogs/:
   *   get:
   *     tags:
   *       - Blogs
   *     description: Returns a list of blogs
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of blogs
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/blog'
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
   * /blogs/:
   *   get:
   *     tags:
   *       - Blogs
   *     description: Returns a list of blogs
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of blogs
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/blog'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id/images', (req, res) => {
      getAllImagesUseCase
        .getAllImages(req.params.id)
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
 * /blogs/:
 *   post:
 *     tags:
 *       - Blogs
 *     description: Create new blog
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Blog's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/blog'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/blog'
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
   * /blogs/id:
   *   put:
   *     tags:
   *       - Blogs
   *     description: Update Blog
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Blog's ID to update
   *         type: string
   *       - name: body
   *         description: Blog's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/blog'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/blog'
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
   * /blogs/id:
   *   put:
   *     tags:
   *       - Blogs
   *     description: Update Blog
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Blog's ID to update
   *         type: string
   *       - name: body
   *         description: Blog's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/blog'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/blog'
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
   * /blogs/id:
   *   delete:
   *     tags:
   *       - Blogs
   *     description: Delete Blog
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Blog's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/blog'
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
   * /blogs/id/images:
   *   post:
   *     tags:
   *       - Blogs
   *     description: Add a new image to a blog
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Blog's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/blog'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/blog'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .post('/:id/images', (req, res) => {
      createImageUseCase
        .createImage({ id: req.params.id, body: req.body })
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
   * /blogs/id:
   *   delete:
   *     tags:
   *       - Blogs
   *     description: Delete Blog
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Blog's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/blog'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:idBlog/images/:idImage', (req, res) => {
      removeImageUseCase.remove({ id: req.params.idImage })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error)
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
