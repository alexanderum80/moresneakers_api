/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Delete a shop', () => {
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

  describe('DELETE /shops/{id}', () => {
    it('should return unauthorized if no token', (done) => {
      request.delete(`${BASE_URI}/shops/${id}`)
        .expect(401)
        .end((err, res) => {
          done(err)
        })
    })

    it('should delete a shop', (done) => {
      request.delete(`${BASE_URI}/shops/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.eql(true)
          done(err)
        })
    })
  })
})
