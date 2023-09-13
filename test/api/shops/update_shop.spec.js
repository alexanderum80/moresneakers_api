/* eslint-env mocha */

const repository = require('src/infra/repositories/shop')

describe('Update a shop', () => {
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

  describe('PUT /shops', () => {
    it('should update a shop', (done) => {
      request.put(`${BASE_URI}/shops/${id}`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Foot Locker',
          active: true,
          address: 'asd',
          shippingDetails: 'world wide',
          currency: 'EUR',
          rank: 5,
          region: 'Europe',
          country: 'France'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.be.an('Object')
          expect(res.body).to.include.keys('data')
          expect(res.body.data.name).to.be.equal('Foot Locker')
          expect(res.body.data.shippingDetails).to.be.equal('world wide')
          expect(res.body.data.currency).to.be.equal('EUR')
          expect(res.body.data.region).to.be.equal('Europe')
          expect(res.body.data.country).to.be.equal('France')
          done(err)
        })
    })
  })
})
