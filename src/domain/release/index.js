const { makeEntity } = require('../helper')

const mostFrequent = (items) => {
  if(items.length === 0) {
    return null
  }
  let sortedItems = items.slice()
  sortedItems.sort()
  let frequency = 1
  let mostFrequent = sortedItems[0]
  let maxFrequency = 1
  for (let i = 1; i < sortedItems.length; i++) {
    let item = sortedItems[i]
    if (item === sortedItems[i - 1]) {
      frequency++
    } else {
      frequency = 1
    }
    if(frequency > maxFrequency) {
      mostFrequent = item
      maxFrequency = frequency
    }
  }
  return mostFrequent
}

const transform = (data) => {
  if (data.style) {
    data.brandId = data.style.brand
  }

  let status_priority = [
    'on_sale',
    'restock',
    'available',
    'live',
    'coming_soon',
    'sold_out',
    'closed'
  ]

  if (!data.offers) {
    data.status = 'coming_soon'
  } else {
    status_priority.forEach(status => {
      let isFound = false;
      data.offers.forEach(offer => {
        if (offer.status === status) {
          isFound = true;
        }
      })
      if (isFound && !data.status) {
        data.status = status
      }
    })
    if(!data.status) {
      data.status = 'coming_soon'
    }
  }
  return data
}

const Release = makeEntity(require('./release'), transform)
const ReleaseImage = makeEntity(require('./release_image'))

module.exports = { Release, ReleaseImage }
