/* eslint-env mocha */

const styleRepository = require('src/infra/repositories/style')
const releaseRepository = require('src/infra/repositories/release')
const repository = require('src/infra/repositories/offer')

describe('Get all offers', () => {
  const BASE_URI = `/api/${config.version}`

  let releaseId

  beforeEach((done) => {
    repository.destroyAll()
      .then(() => releaseRepository.destroyAll())
      .then(() => styleRepository.destroyAll())
      .then(() => styleRepository.create({
        name: 'new stlye'
      }))
      .then((style) => releaseRepository.create({
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
        styleId: style.id
      }))
      .then((release) => {
        releaseId = release.id
        return repository.bulkCreate([{
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'test offer 1',
          raffle: false
        }, {
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'test offer 2',
          raffle: false
        }, {
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'test offer 3',
          raffle: false
        }, {
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'test offer 4',
          raffle: false
        }])
      })
      .then((offers) => {
        done()
      })
  })

  describe('GET /offers', () => {
    it('should list the offers', (done) => {
      request.get(`${BASE_URI}/offers`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(4)
          done(err)
        })
    })

    it('should list the elements in an page', (done) => {
      request.get(`${BASE_URI}/offers?offset=1&limit=2`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          expect(res.body.data.length).to.be.equal(2)
          done(err)
        })
    })
  })
})
