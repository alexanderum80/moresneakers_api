/* eslint-env mocha */

const repository = require('src/infra/repositories/brand')

describe('Routes: POST /brands', () => {
  const BASE_URI = `/api/${config.version}`

  beforeEach((done) => {
    repository.destroyAll().then(() => {
      done()
    })
  })

  describe('Should post brands', () => {
    it('should return create brands', (done) => {
      request.post(`${BASE_URI}/brands`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          name: 'Fila',
          description: 'This is a wonderful brand',
          imgUrl: 'http://moresneakers/url'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          done(err)
        })
    })

    it('should validate brand object is not complete', (done) => {
      request.post(`${BASE_URI}/brands`)
        .set('Authorization', `Bearer ${global.token}`)
        .send({
          description: 'This is a wonderful brand',
          imgUrl: 'http://moresneakers/url'
        })
        .expect(400)
        .end((err, res) => {
          // expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
