const repository = require('src/infra/repositories/release')
const offerRepository = require('src/infra/repositories/offer')
const { Release } = require('src/domain/release')
const thumbnail = require('./thumbnail')
const Redis = require('src/redis')

const beforeUpdate = (domain) => {
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
}

const saveImagesOrder = async (body, id) => {
  let imagesOrder = body['allImages']
  const release = await repository.getById(id)
  let imagesRelease = release.images
  for (let imageOrder in imagesOrder) {
    let currentOrder = imagesOrder[imageOrder]
    for (let imageRelease in imagesRelease) {
      if (imagesRelease[imageRelease]['imgUrl'] === currentOrder['imgUrl']) {
        await repository.setImageOrder(currentOrder['imgUrl'], parseInt(imageOrder) + 1)
      }
    }
  }
}

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldRelease = await repository.getById(id);
      if("offers_mass_edit" in body){
        const offers = body.offers_mass_edit;
        const massUpdateResult = await offerRepository.bulkUpdate(offers);
        resolve(massUpdateResult);

        // const offers = b.offers_mass_edit;
        // delete b.offers_mass_edit;
        // const updateOnDuplicate = []
        // const fm = Object.entries(b)
        // offers.forEach(o=>{
        //   fm.forEach(([field,value])=>{
        //     o[field] = value;
        //     updateOnDuplicate.push(field)
        //   })
        // })
        // const massUpdateResult = await offerRepository.bulkUpdate(offers,{
        //   updateOnDuplicate
        // });
        // resolve(massUpdateResult);
      }
      else{
        const domain = Release(body)
        beforeUpdate(domain)
        await repository.updateRelease(id, domain)
  
        let newUpdatedAt = oldRelease.updatedAt
        if (domain.updatedAt) {
          newUpdatedAt = domain.updatedAt
        }
        await repository.modifyUpdatedAt(id, newUpdatedAt)
        await saveImagesOrder(body, { id }.id)
  
        const objthumbnail = thumbnail(domain.mainImage, oldRelease.thumbnail)
        const result = await objthumbnail.makeThumbnail()      
        if (result) await repository.modifyThumbnail(id, objthumbnail.getFullUrlThumbnail())
  
        resolve(domain)
      }
    } catch (error) {
      reject(error)
    }
  })
}

const massOffersUpdate = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const massUpdateResult = await offerRepository.bulkUpdate(body);
      resolve(massUpdateResult);

    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  update,
  massOffersUpdate
}
