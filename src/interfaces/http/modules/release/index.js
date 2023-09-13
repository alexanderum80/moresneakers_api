const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  setHiddenUseCase,
  getAllImagesUseCase,
  updateMainImageUseCase,
  removeImageUseCase,
  createImageUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneUseCase,
  searchUseCase,
  getFullReleaseBySlugUseCase,
  getReleasesByStyle,
  getFullReleasesUseCase,
  getBySlugUseCase,
  getByStatusGroupUseCase,
  searchtotalUseCase,
  
} = require('src/app/release')

const { getOneUseCase: getOneUseCaseBrand } = require('src/app/brand')
const { getOneUseCase: getOneUseCaseStyle } = require('src/app/style')
const { getOneUseCase: getOneUseCaseCollection } = require('src/app/collection')
const { getAllUseCase: getAllUseCaseOffer } = require('src/app/offer')
const { getOneUseCase: getOneUseCaseShop } = require('src/app/shop')
const { getOneUseCase: getOneUseCaseCategory } = require('src/app/category')

const orderImagesResponse = (data, endpointType) => {
  let imagesCopy, images = undefined

  function orderImagesArray (imagesCopy) {
    //order images of release of some endpoints response
    let orderedImages = JSON.parse(`[${imagesCopy.substring(1, imagesCopy.length - 1)}]`)
    orderedImages.sort((a, b) => a.imgOrder > b.imgOrder ? 1 : b.imgOrder > a.imgOrder ? -1 : 0)
    return orderedImages
  }

  if (data['count'] != 0) {
    if (endpointType == 1) {
      //if it is response from releases with slug filter
      imagesCopy = JSON.stringify(data.rows[0].images)
      images = orderImagesArray(imagesCopy)
      data.rows[0].images = images
    } else if (endpointType == 2) {
      // if it is response from releases by id
      imagesCopy = JSON.stringify(data.images)
      images = orderImagesArray(imagesCopy)
      data.images = images
    } else if (endpointType == 3) {
      // if it is response from releases by id/images
      imagesCopy = JSON.stringify(data)
      images = orderImagesArray(imagesCopy)
      data = images
    }
  }
  return data
}

module.exports = () => {
  const router = Router()
  const {
    logger,
    auth,
    response: { Success, Fail },
    query: mapQuery
  } = container.cradle
  /**
   * @swagger
   * definitions:
   *   release:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       description:
   *         type: string
   *       sku:
   *         type: string
   *       images:
   *         type: array
   *         items:
   *           type: string
   *       gender:
   *         type: string
   *       hot:
   *         type: boolean
   *       children:
   *         type: boolean
   *       price:
   *         type: number
   *       releaseDate:
   *          type: string
   *          format: date-time
   *       updatedAt:
   *          type: string
   *          format: date-time
   */

  /**
   * @swagger
   * /releases/id:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns one release given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A release in json format
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router.get('/:id', (req, res, next) => {
    getOneUseCase
      .getOne(req.params.id)
      .then(async data => {
        data = orderImagesResponse(data, 2)
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        next(error)
      })
  })
  /**
   * @swagger
   * /releases/:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  
  router.get('/', async (req, res) => {
    if (req.query.slug) {
      const slug = req.query.slug
      
      getFullReleaseBySlugUseCase
        .getFullReleaseBySlug(slug, mapQuery(req.query))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })

    } else if (req.query.styleId) {
      const styleId = req.query.styleId;
      getReleasesByStyle
        .getReleasesByStyle(styleId, mapQuery(req.query))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error)
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })

    } else if (req.query.full) {
      getFullReleasesUseCase
        .getFullReleases(mapQuery(req.query))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })

    } 
    else {
      getAllUseCase
        .all(mapQuery(req.query))
        .then(async data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch(error => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })
    }

  })


/**
   * @swagger
   * /releases/search:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
 router.get('/:name/search', (req, res) => {
  searchtotalUseCase
  .searchTotal(req.params.name, mapQuery(req.query))
  .then(data => {
    res.status(Status.OK).json(Success(data))
  })
  .catch(error => {
    logger.error('error') // we still need to log every error for debugging
    res.status(Status.BAD_REQUEST).json(Fail(error.message))
  })
})


  /**
   * @swagger
   * /releases/search:
   *   post:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router.post('/search', (req, res) => {
    searchUseCase
      .search(mapQuery(req.body))
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router.get('/:id/images', (req, res) => {
    getAllImagesUseCase
      .getAllImages(req.params.id)
      .then(data => {
        data = orderImagesResponse(data, 3)
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })

  /**
   * @swagger
   * /releases/by-slug/slug:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns one release given slug
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A release in json format
   *         schema:
   *           $ref: '#/definitions/release'
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
   * /releases/by-status-group/group:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases given status group
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */

  router.get('/by-status-group/:group', (req, res, next) => {debugger;
    getByStatusGroupUseCase.getByStatusGroup(req.params.group, mapQuery(req.query))
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
   * /releases/by-slug/slug/offers:
   *   get:
   *     tags:
   *       - Offers
   *     description: Returns offers of a release selected by slug
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A list of offers in json format
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router.get('/by-slug/:slug/offers', (req, res, next) => {
    getBySlugUseCase.getJustOffersBySlug(req.params.slug, mapQuery(req.query))
      .then(async data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        next(error)
      })
  })

  /**
   * Authentication for modifying endpoints
   */
  router.use(auth.authenticate())

  /**
   * @swagger
   * /releases/:
   *   post:
   *     tags:
   *       - Releases
   *     description: Create new release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/release'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.post('/', (req, res) => {
    createUseCase
      .create({ body: req.body })
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/id:
   *   put:
   *     tags:
   *       - Releases
   *     description: Update Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/release'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.put('/:id', (req, res) => {
    updateUseCase
      .update({ id: req.params.id, body: req.body })
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/id:
   *   delete:
   *     tags:
   *       - Releases
   *     description: Delete Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router.delete('/:id', (req, res) => {
    removeUseCase
      .remove({ id: req.params.id })
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/id/images:
   *   post:
   *     tags:
   *       - Releases
   *     description: Add a new image to a release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/release'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.post('/:id/images', (req, res) => {
    createImageUseCase
      .createImage({ id: req.params.id, body: req.body })
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })

  /**
   * @swagger
   * /releases/id:
   *   delete:
   *     tags:
   *       - Releases
   *     description: Delete Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router.delete('/:idRelease/images/:idImage', (req, res) => {
    removeImageUseCase
      .remove({ id: req.params.idImage })
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch(error => {
        logger.error(error)
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/id/mainImage:
   *   patch:
   *     tags:
   *       - Releases
   *     description: Change release main image
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           mainImage:
   *            type: string
   *            format: uuid
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.patch('/:id/mainImage', (req, res) => {
    updateMainImageUseCase
      .updateMainImage(req.params.id, req.body.mainImage)
      .then(() => {
        res.status(Status.OK).json(Success({}))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })
  /**
   * @swagger
   * /releases/id/hiddenDashboard:
   *   patch:
   *     tags:
   *       - Releases
   *     description: Change release main image
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           hiddenDashboard:
   *            type: string
   *            format: uuid
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.patch('/:id/hiddenDashboard', (req, res) => {
    setHiddenUseCase
      .setHiddenDashboard(req.params.id)
      .then(() => {
        res.status(Status.OK).json(Success({}))
      })
      .catch(error => {
        logger.error(error) // we still need to log every error for debugging
        res.status(Status.BAD_REQUEST).json(Fail(error.message))
      })
  })

  /**
   * @swagger
   * /releases/id:
   *   patch:
   *     tags:
   *       - Releases
   *     description: Offer group updates of a release in bulk
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           mainImage:
   *            type: string
   *            format: uuid
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router.patch('/:id', async (req, res) => {
    try {
      const response = await updateUseCase.massOffersUpdate({ id: req.params.id, body: req.body })
      res.status(Status.OK).json(Success(`${response.length} updated offers`))

    } catch (error) {
      logger.error(error) // we still need to log every error for debugging
      res.status(Status.BAD_REQUEST).json(Fail(error.message))
    }
  })

  return router
}
