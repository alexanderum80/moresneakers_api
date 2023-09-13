/* eslint-env mocha */

const releaseRepository = require('src/infra/repositories/release')
const repository = require('src/infra/repositories/offer')

describe('Delete an offer', () => {
  const BASE_URI = `/api/${config.version}`

  let releaseId
  let id

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
        return repository.create({
          releaseId: releaseId,
          priceUSD: 90,
          priceEUR: 90,
          priceGBP: 90,
          salePercentage: 1,
          status: 'available',
          shipping: 'worldwide',
          description: 'The best pairs out there for a running session. More than 30000 people are wearing it this summer',
          raffle: false
        })
      })
      .then((entity) => {
        id = entity.id
        done()
      })
  })

  describe('DELETE /offers/{id}', () => {
    it('should return unauthorized if no token', (done) => {
      request.delete(`${BASE_URI}/offers/${id}`)
        .expect(401)
        .end((err, res) => {
          done(err)
        })
    })

    it('should delete a offer', (done) => {
      request.delete(`${BASE_URI}/offers/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.eql(true)
          done(err)
        })
    })
  })
})
