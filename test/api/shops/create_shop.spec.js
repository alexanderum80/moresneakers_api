/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Create a shop', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => {
      done()
    })
  })

  describe('POST /shops', () => {
    it('should create a shop', (done) => {
      request.post(`${BASE_URI}/shops`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Foot Locker',
          active: true,
          address: 'asd',
          shippingDetails: 'world wide',
          currency: 'EUR',
          rank: 5,
          region: 'Europe',
          country: 'France',
          showOnRegion: 'Europe'
        })
        .expect(200)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should validate shop object is not complete', (done) => {
      request.post(`${BASE_URI}/shops`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          active: true,
          address: 'asd',
          shippingDetails: 'world wide',
          currency: 'EUR',
          rank: 5,
          region: 'Europe',
          country: 'France'
        })
        .expect(400)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
