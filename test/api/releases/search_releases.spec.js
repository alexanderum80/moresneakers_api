/* eslint-env mocha */

const repository = require('src/infra/repositories/release')
const categoryRepository = require('src/infra/repositories/category')
const brandRepository = require('src/infra/repositories/brand')
const styleRepository = require('src/infra/repositories/style')

describe('Get all releases', () => {
  const BASE_URI = `/api/${config.version}`

  let adidasBrand
  let nikeBrand
  let sportCat
  let nikeStyle

  const setData = async () => {
    // Reset all repositories
    await repository.destroyAll()
    await brandRepository.destroyAll()
    await styleRepository.destroyAll()
    await categoryRepository.destroyAll()

    sportCat = await categoryRepository.create({
      name: 'Sport'
    })

    adidasBrand = await brandRepository.create({
      name: 'Adidas',
      description: 'This is a wonderful brand',
      imgUrl: 'http://moresneakers/url'
    })

    const adidasStyle = await styleRepository.create({
      name: 'Adidas Style',
      brand: adidasBrand.id,
      category: sportCat.id
    })

    nikeBrand = await brandRepository.create({
      name: 'Nike',
      description: 'This is a wonderful brand',
      imgUrl: 'http://moresneakers/url'
    })
    nikeStyle = await styleRepository.create({
      name: 'Nike Style',
      brand: nikeBrand.id,
      category: sportCat.id
    })

    await repository.bulkCreate([{
      name: 'Adidas Release 1',
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
      styleId: adidasStyle.id,
      hiddenDashboard: true
    }, {
      name: 'Adidas Release 2',
      sku: 'abc-asd-123',
      description: 'old description',
      hot: true,
      priceEUR: 50,
      priceGBP: 50,
      priceUSD: 50,
      gender: 'Women',
      releaseDate: '2019-02-25',
      color: 'blue',
      customized: false,
      styleId: adidasStyle.id,
      hiddenDashboard: true
    }, {
      name: 'Nike Release 1',
      sku: 'abc-asd-123',
      description: 'old description',
      hot: true,
      priceEUR: 50,
      priceGBP: 50,
      priceUSD: 50,
      gender: 'Men',
      releaseDate: '2019-02-19',
      color: 'blue',
      customized: false,
      styleId: nikeStyle.id,
      hiddenDashboard: false
    }, {
      name: 'Nike Release 2',
      sku: 'abc-asd-123',
      description: 'old description',
      hot: true,
      priceEUR: 50,
      priceGBP: 50,
      priceUSD: 50,
      gender: 'Women',
      releaseDate: '2019-02-20',
      color: 'blue',
      customized: false,
      styleId: nikeStyle.id,
      hiddenDashboard: false
    }, {
      name: 'Nike Release 3',
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
      styleId: nikeStyle.id,
      hiddenDashboard: false
    }
    ])
  }

  beforeEach((done) => {
    setData().then(() => {
      done()
    })
  })

  describe('POST /releases/search', () => {
    it('should list the releases', (done) => {
      request.get(`${BASE_URI}/releases`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(5)
          done(err)
        })
    })

    it('should paginate', (done) => {
      request.post(`${BASE_URI}/releases/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          offset: 1
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(4)
          done(err)
        })
    })

    it('should filter by name partially', (done) => {
      request.post(`${BASE_URI}/releases/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            name: 'Release 1'
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(2)
          done(err)
        })
    })

    it('should filter by month', (done) => {
      request.post(`${BASE_URI}/releases/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            fromDate: '2019-02-01',
            toDate: '2019-02-28'
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

    it('should filter by week', (done) => {
      request.post(`${BASE_URI}/releases/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            fromDate: '2019-02-18',
            toDate: '2019-02-24'
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(2)
          done(err)
        })
    })

    it('should filter by style', (done) => {
      request.post(`${BASE_URI}/releases/search`)
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
          expect(res.body.data.length).to.be.equal(3)
          res.body.data.forEach((release) => {
            expect(release.styleId).to.be.equal(nikeStyle.id)
          })
          done(err)
        })
    })

    it('should filter by not hidden releases', (done) => {
      request.post(`${BASE_URI}/releases/search`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          filter: {
            hiddenDashboard: 0
          }
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(3)
          res.body.data.forEach((release) => {
            expect(release.hiddenDashboard).to.be.equal(false)
          })
          done(err)
        })
    })
  })
})
