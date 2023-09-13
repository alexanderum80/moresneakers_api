/* eslint-env mocha */

const categoryRepository = require('src/infra/repositories/category')
const brandRepository = require('src/infra/repositories/brand')
const styleRepository = require('src/infra/repositories/style')
const releaseRepository = require('src/infra/repositories/release')
const repository = require('src/infra/repositories/offer')

describe('Get all offers with advance filter by POST', () => {
  const BASE_URI = `/api/${config.version}`

  let adidasBrand
  let nikeBrand
  let sportCat
  let nikeStyle

  const setData = async () => {
    // Reset all repositories
    await repository.destroyAll()
    await brandRepository.destroyAll()
    await releaseRepository.destroyAll()
    await styleRepository.destroyAll()
    await categoryRepository.destroyAll()

    sportCat = await categoryRepository.create({
      name: 'Sport'
    })

    // ADIDAS brand, stlye, release and 4 offers
    adidasBrand = await brandRepository.create({
      name: 'Adidas',
      description: 'This is a wonderful brand',
      imgUrl: 'http://moresneakers/url'
    })
    const adidasStyle = await styleRepository.create({
      name: 'Brand Style 1',
      brand: adidasBrand.id,
      category: sportCat.id
    })

    const adidasRelease = await releaseRepository.create({
      name: 'Adidas Consortium',
      sku: 'abc-asd-123',
      description: 'old description',
      hot: true,
      priceEUR: 50,
      priceGBP: 50,
      priceUSD: 50,
      gender: 'Men',
      releaseDate: '2019-03-10',
      color: 'blue',
      customized: false,
      styleId: adidasStyle.id
    })

    await repository.bulkCreate([{
      releaseId: adidasRelease.id,
      priceUSD: 90,
      priceEUR: 100,
      priceGBP: 110,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 1',
      raffle: false
    }, {
      releaseId: adidasRelease.id,
      priceUSD: 80,
      priceEUR: 90,
      priceGBP: 100,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 2',
      raffle: false
    }, {
      releaseId: adidasRelease.id,
      priceUSD: 70,
      priceEUR: 80,
      priceGBP: 100,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 3',
      raffle: false
    }, {
      releaseId: adidasRelease.id,
      priceUSD: 20,
      priceEUR: 30,
      priceGBP: 40,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 4',
      raffle: false,
      displayWhatsNew: true
    }])

    // NIKE brand, style, release and 4 offers
    nikeBrand = await brandRepository.create({
      name: 'Nike',
      description: 'This is a wonderful brand',
      imgUrl: 'http://moresneakers/url'
    })

    nikeStyle = await styleRepository.create({
      name: 'Nike Style',
      brand: nikeBrand.id
    })

    const nikeRelease = await releaseRepository.create({
      name: 'Nike release',
      sku: 'abc-asd-nike',
      description: 'This is a nike release',
      hot: false,
      priceEUR: 35,
      priceGBP: 40,
      priceUSD: 45,
      gender: 'Men',
      releaseDate: '2019-03-10',
      color: 'blue',
      customized: false,
      styleId: nikeStyle.id
    })

    await repository.bulkCreate([{
      releaseId: nikeRelease.id,
      priceUSD: 20,
      priceEUR: 30,
      priceGBP: 40,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 1',
      raffle: false
    }, {
      releaseId: nikeRelease.id,
      priceUSD: 20,
      priceEUR: 30,
      priceGBP: 40,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 2',
      raffle: false,
      displayWhatsNew: true
    }, {
      releaseId: nikeRelease.id,
      priceUSD: 15,
      priceEUR: 18,
      priceGBP: 23,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 3',
      raffle: false
    }, {
      releaseId: nikeRelease.id,
      priceUSD: 10,
      priceEUR: 11,
      priceGBP: 12,
      salePercentage: 1,
      status: 'available',
      shipping: 'worldwide',
      description: 'test offer 4',
      raffle: false,
      displayWhatsNew: true
    }])
  }

  beforeEach((done) => {
    setData().then(() => {
      done()
    })
  })

  describe('POST /offers/search', () => {
    it('should show all the offers', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {}
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(8)
          done(err)
        })
    })

    it('should show an object page', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {},
          offset: 0,
          limit: 3
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(3)
          done(err)
        })
    })

    it('should filter by brand', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            brandId: adidasBrand.id
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(4)
          res.body.data.forEach((offer) => {
            expect(offer).to.include.keys('release')
            expect(offer.release).to.include.keys('style')
            expect(offer.release.style.brandId).to.be.equal(adidasBrand.id)
          })
          done(err)
        })
    })

    it('should filter by category', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            categoryId: sportCat.id
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(4)
          res.body.data.forEach((offer) => {
            expect(offer).to.include.keys('release')
            expect(offer.release).to.include.keys('style')
            expect(offer.release.style.categoryId).to.be.equal(sportCat.id)
          })
          done(err)
        })
    })

    it('should filter by style', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            styleId: nikeStyle.id
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(4)
          res.body.data.forEach((offer) => {
            expect(offer).to.include.keys('release')
            expect(offer.release).to.include.keys('style')
            expect(offer.release.style.id).to.be.equal(nikeStyle.id)
          })
          done(err)
        })
    })

    it('should filter by range price', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            minPrice: 80,
            maxPrice: 100
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(3)
          done(err)
        })
    })

    it('should list the whatsnew offers', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            displayWhatsNew: 1
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(3)
          done(err)
        })
    })

    it('should order by hot', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          ordering: ['-hot']
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(8)
          res.body.data.forEach((offer, ind) => {
            expect(offer.release.hot).to.be.equal(ind < 4)
          })
          done(err)
        })
    })

    it('should allow multi-ordering (by hot and priceEUR)', (done) => {
      request.post(`${BASE_URI}/offers/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          ordering: ['-hot', 'priceEUR']
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(8)
          res.body.data.forEach((offer, ind) => {
            expect(offer.release.hot).to.be.equal(ind < 4)
          })
          done(err)
        })
    })
  })
})
