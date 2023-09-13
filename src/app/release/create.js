const repository = require('src/infra/repositories/release')
const { Release } = require('src/domain/release')
const thumbnail = require('./thumbnail')

const beforeCreate = (domain) => {
  if (domain.releaseDate === undefined) {
    domain.releaseDate = null
  }
  if (domain.priceUSD === undefined) {
    domain.priceUSD = null
  }
  if (domain.priceEUR === undefined) {
    domain.priceEUR = null
  }
  if (domain.priceGBP === undefined) {
    domain.priceGBP = null
  }
  domain.slug = domain.name
  if (domain.sku) {
    domain.slug += ('-' + domain.sku)
  }
  domain.slug = domain.slug.toLowerCase()
  domain.slug = domain.slug.replace(/ +/g, '-')
  domain.slug = domain.slug.replace(/[^a-zA-Z0-9\-]/g, '')
  domain.slug = domain.slug.trim()
  return domain
}

const create = ({ body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let domain = Release(body)
      domain = beforeCreate(domain)
      const count = await repository.countLikeReleases(domain.slug)
      if (count) {
        domain.slug += ('-' + count)
      }

      const release = await repository.createRelease(domain)
      const objthumbnail = thumbnail(release.mainImage)
      const result = await objthumbnail.makeThumbnail()
      if (result) await repository.modifyThumbnail(id, objthumbnail.getFullUrlThumbnail())

      resolve(release)
      
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  create
}
