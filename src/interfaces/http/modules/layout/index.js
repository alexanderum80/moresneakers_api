const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI
const Redis = require('src/redis');

const {
  getLayoutHottestUseCase,
  setLayoutHottestUseCase,
  getLayoutHeaderUseCase,
  setLayoutHeaderUseCase,
  getLayoutHeadingUseCase,
  setLayoutHeadingUseCase,
  getLayoutSliderUseCase,
  setLayoutSliderUseCase,
  getLayoutUseCase,
  setLayoutUseCase,
  getOurPartnersTabsUseCase,
  createOurPartnersTabUseCase,
  updateOurPartnersTabUseCase,
  deleteOurPartnersTabUseCase,
  getLayoutMenuUseCase,
  setLayoutMenuUseCase,
  getLayoutDealsUseCase,
  createLayoutDealsUseCase,
  updateLayoutDealsUseCase,
  deleteLayoutDealsUseCase,
  getLayoutWhatWeDoUseCase,
  setLayoutWhatWeDoUseCase,
  getLayoutReleasesTextUseCase,
  setLayoutReleasesTextUseCase,
  getLayoutReleasesTextUseCase2,
  setLayoutReleasesTextUseCase2

} = require('src/app/layout')

const {
  getLayoutFooterAllUseCase,
  createLayoutFooterUseCase,
  getLayoutFooterOneUseCase,
  removeLayoutFooterUseCase,
  updateLayoutFooterUseCase,
  getLayoutFooterAboutUseCase
} = require('src/app/layout/layout_footer')

const {
  getLayoutSneakersSectionUseCase,
  getLayoutSneakersSectionOneUseCase,
  createLayoutSneakersSectionUseCase,
  updateLayoutSneakersSectionUseCase,
  deleteLayoutSneakersSectionUseCase,
} = require('src/app/layout/layout_sneakers_section')


const {
  getOneUseCase: getBrandUseCase
} = require('src/app/brand')
const {
  getOneUseCase: getCollectionUseCase
} = require('src/app/collection')
const {
  getOneUseCase: getStyleUseCase
} = require('src/app/style')
const { updateWhatWeDo } = require('../../../../infra/repositories/layout')

const addFooterData = async (responseData) => {
  let layoutData = Object.assign({}, responseData);
  if (layoutData["brandId"]) {
    await getBrandUseCase.getOne(layoutData["brandId"]).then(async (data) => {
      layoutData['object'] = data
      layoutData['objectType'] = "Brand"
    })
  } else if (layoutData["collectionId"]) {
    await getCollectionUseCase.getOne(layoutData["collectionId"]).then(async (data) => {
      layoutData['object'] = data
      layoutData['objectType'] = "Collection"
    })
  } else if (layoutData["styleId"]) {
    await getStyleUseCase.getOne(layoutData["styleId"]).then(async (data) => {
      layoutData['object'] = data
      layoutData['objectType'] = "Style"
    })
  }
  return layoutData
}

const addForeignObjectData = async (data) => {
  if (data.rows) {
    for (let i = 0; i < data.rows.length; i++) {
      let tmpLayout = await addFooterData(data.rows[i])
      if (tmpLayout['objectType']) {
        data.rows[i]['objectType'] = tmpLayout['objectType']
        data.rows[i]['object'] = tmpLayout['object']
      }
    }
  } else {
    data = addFooterData(data)
  }
  return data
}


module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   layout:
   *     properties:
   *       page:
   *         type: string
   *       heading:
   *         type: string
   *       header:
   *         type: string
   *       slider:
   *         type: string
   *       hottest:
   *         type: string
   *       deals:
   *         type: string
   */
  router
    .get('/:page', (req, res, next) => {
      getLayoutUseCase
        .getPageLayout(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/slider', (req, res, next) => {
      getLayoutSliderUseCase
        .getLayoutSlider(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/heading', (req, res, next) => {
      getLayoutHeadingUseCase
        .getLayoutHeading(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/header', (req, res, next) => {
      getLayoutHeaderUseCase
        .getLayoutHeader(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/hottest', (req, res, next) => {
      getLayoutHottestUseCase
        .getLayoutHottest(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/menu', (req, res, next) => {
      getLayoutMenuUseCase
        .getMenu(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/ourpartners_tabs', (req, res, next) => {
      getOurPartnersTabsUseCase
        .getOurpartnersTabs(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/deals', (req, res, next) => {
      getLayoutDealsUseCase
        .getLayoutDeals(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/what-we-do', (req, res, next) => {
      getLayoutWhatWeDoUseCase
        .getLayoutWhatWeDo(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

    router
    .get('/:page/releases-text', (req, res, next) => {
      getLayoutReleasesTextUseCase
        .getLayoutReleasesText(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) 
          next(error)
        })
    })

    .get('/:page/releases-text-2', (req, res, next) => {
      getLayoutReleasesTextUseCase2
        .getLayoutReleasesText2(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) 
          next(error)
        })
    })



  router
    .get('/general/footers', async (req, res) => {
      const hash = "layout_footers"
      const searchParams = mapQuery(req.query);
      const field = 'general/footers';
      
      let d = await Redis.get(hash, field);      
      if(d){
        return res.status(Status.OK).json(d); 
      }
      
      getLayoutFooterAllUseCase
        .all(searchParams)
        .then(async data => {
          d = await addForeignObjectData(data);
          const r  = await Redis.set(hash, field, Success(d));
          res.status(Status.OK).json(r);
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })


  router
    .get('/general/footers-abaut-us', (req, res) => {
      getLayoutFooterAboutUseCase
        .getLayoutFooterAboutUs(mapQuery(req.query))
        .then(async data => {
          data = await addForeignObjectData(data)
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .get('/general/footers/:id', (req, res) => {
      getLayoutFooterOneUseCase
        .getOne(req.params.id)
        .then(async data => {
          data = await addForeignObjectData(data)
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .get('/general/sneakers-section', (req, res) => {
      getLayoutSneakersSectionUseCase
        .all(mapQuery(req.query))
        .then(async data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  router
    .get('/general/sneakers-section/:id', (req, res) => {
      getLayoutSneakersSectionOneUseCase
        .getOne(req.params.id)
        .then(async data => {
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
  // router.use(auth.authenticate())

  router
    .post('/:page/ourpartners_tabs', (req, res, next) => {
      createOurPartnersTabUseCase
        .createOurpartnersTab(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/ourpartners_tabs/:id', (req, res, next) => {
      updateOurPartnersTabUseCase
        .updateOurpartnersTab(req.params.page, req.params.id, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/what-we-do', async (req, res, next) => {
      try {
        const data = await setLayoutWhatWeDoUseCase.setLayouWhatWeDo(req.params.page, req.body)
        res.status(Status.OK).json(Success(data))
      } catch (error) {
        logger.error(error)
        next(error)
      }

      



      // .setLayouWhatWeDo(req.params.page, req.body)
      // .then(data => {
      //   res.status(Status.OK).json(Success(data))            
      // })
      // .catch((error) => {
      //   logger.error(error) // we still need to log every error for debugging
      //   next(error)
      // })
    })

    router
    .put('/:page/releases-text', async (req, res, next) => {
      try {
        const data = await setLayoutReleasesTextUseCase.setLayoutReleasesText(req.params.page, req.body)
        res.status(Status.OK).json(Success(data))
      } catch (error) {
        logger.error(error)
        next(error)
      }
    })

    router
    .put('/:page/releases-text-2', async (req, res, next) => {
      try {
        const data = await setLayoutReleasesTextUseCase2.setLayoutReleasesText2(req.params.page, req.body)
        res.status(Status.OK).json(Success(data))
      } catch (error) {
        logger.error(error)
        next(error)
      }
    })

  router
    .delete('/:page/ourpartners_tabs/:id', (req, res, next) => {
      deleteOurPartnersTabUseCase
        .deleteOurpartnersTab(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/', (req, res, next) => {
      setLayoutUseCase
        .setLayout(req.query.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/slider', (req, res, next) => {
      setLayoutSliderUseCase
        .setLayout(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/heading', (req, res, next) => {
      setLayoutHeadingUseCase
        .setLayoutHeading(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/header', (req, res, next) => {
      setLayoutHeaderUseCase
        .setHeader(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/hottest', (req, res, next) => {
      setLayoutHottestUseCase
        .setHottest(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/menu', (req, res, next) => {
      setLayoutMenuUseCase
        .setMenu(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .post('/general/footers', (req, res) => {
      createLayoutFooterUseCase
        .create({ body: req.body })
        .then(async data => {
          await Redis.set('layouts', 'general-footers', data);
          res.status(Status.OK).json(Success(data))
        })
        .catch(error => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })
    })

  router
    .delete('/general/footers/:id', (req, res) => {
      removeLayoutFooterUseCase
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
    .put('/general/footers/:id', (req, res) => {
      updateLayoutFooterUseCase
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

  router
    .post('/general/sneakers-section', (req, res) => {
      createLayoutSneakersSectionUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch(error => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(Fail(error.message))
        })
    })

  router
    .delete('/general/sneakers-section/:id', (req, res) => {
      deleteLayoutSneakersSectionUseCase
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
    .put('/general/sneakers-section/:id', (req, res) => {
      updateLayoutSneakersSectionUseCase
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

  router
    .post('/:page/deals', (req, res, next) => {
      createLayoutDealsUseCase
        .createLayoutDeals(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .delete('/:page/deals/:id', (req, res, next) => {
      deleteLayoutDealsUseCase
        .deleteLayoutDeals(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/deals/:id', (req, res, next) => {
      updateLayoutDealsUseCase
        .updateLayoutDeals(req.params.page, req.params.id, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })
  return router
}
