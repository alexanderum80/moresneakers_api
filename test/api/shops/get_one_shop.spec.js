/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Get one shop by id', () => {
  const BASE_URI = `/api/${config.version}`

  let id

  beforeEach((done) => {
    repository.destroyAll().then(() => repository.create({
      name: 'Foot Locker',
      active: true,
      address: 'asd',
      shippingDetails: 'world wide',
      currency: 'EUR',
      rank: 5,
      region: 'Europe',
      country: 'France'
    })).then((entity) => {
      id = entity.id
      done()
    })
  })

  describe('GET /shops/{id}', () => {
    it('should list the shops', (done) => {
      request.get(`${BASE_URI}/shops/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Object')
          done(err)
        })
    })
  })
})
