/* eslint-env mocha */

const repository = require('src/infra/repositories/brand')

describe('Routes: GET /brands', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => {
      done()
    })
  })

  describe('Should show a list of brands', () => {
    it('should return create brands', (done) => {
      request.get(`${BASE_URI}/brands`)
        .set('Authorization', `Bearer ${global.token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.be.an('Array')
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
