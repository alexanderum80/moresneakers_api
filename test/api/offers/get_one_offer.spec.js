/* eslint-env mocha */

const styleRepository = require('src/infra/repositories/style')
const releaseRepository = require('src/infra/repositories/release')
const repository = require('src/infra/repositories/offer')

describe('Get an offer', () => {
  const BASE_URI = `/api/${config.version}`

  let releaseId
  let id

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
        return repository.create({
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'new description',
          raffle: false
        })
      })
      .then((entity) => {
        id = entity.id
        done()
      })
  })

  describe('GET /offers/{id}', () => {
    it('should get an offer', (done) => {
      request.get(`${BASE_URI}/offers/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Object')
          expect(res.body.data.status).to.be.equal('available')
          expect(res.body.data.description).to.be.equal('new description')
          done(err)
        })
    })
  })
})
