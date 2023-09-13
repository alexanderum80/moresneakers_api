/* eslint-env mocha */

const releaseRepository = require('src/infra/repositories/release')
const repository = require('src/infra/repositories/offer')

describe('Create an offer', () => {
  const BASE_URI = `/api/${config.version}`

  let releaseId

  beforeEach((done) => {
    repository.destroyAll()
      .then(() => releaseRepository.destroyAll())
      .then(() => releaseRepository.create({
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
        customized: false
      }))
      .then((release) => {
        releaseId = release.id
        done()
      })
  })

  describe('POST /offers', () => {
    it('should create an offer', (done) => {
      request.post(`${BASE_URI}/offers`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'Offer description',
          raffle: false
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          done(err)
        })
    })
  })
})
