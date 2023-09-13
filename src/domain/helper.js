
const { complement, compose, isNil, pickBy } = require('ramda')
const Entity = require('./entity')
const notNull = compose(complement(isNil))
const moment = require('moment')

const isDate = (date) => {
  return moment(date, moment.ISO_8601, true).isValid()
  // return date && (typeof date === 'string') && (new Date(date) !== 'Invalid Date') && !isNaN(new Date(date))
}

/**
 * we need to remove undefined array means not required data.
 */
const cleanData = (entity) => pickBy(notNull, entity)

const cleanDate = (entity) => {
  Object.keys(entity).forEach((key) => {
    if (isDate(entity[key])) {
      entity[key] = new Date(entity[key])
    }
  })
  return entity
}

const makeEntity = (entity, transform) => {
  if (transform) {
    return compose(cleanData, Entity.extend(entity), transform, cleanDate)
  }
  return compose(cleanData, Entity.extend(entity), cleanDate)
}

const makeValueObject = (entity, transform) => {
  if (transform) {
    return compose(cleanData, entity, transform, cleanDate)
  }
  return compose(cleanData, entity, cleanDate)
}

module.exports = {
  cleanData,
  makeEntity,
  makeValueObject
}
