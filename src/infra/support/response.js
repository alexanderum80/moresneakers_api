const { SearchResult } = require('src/domain/search')

module.exports = ({ config }) => {
  const defaultResponse = (success = true) => {
    return {
      success,
      version: config.version,
      date: new Date()
    }
  }

  const Success = (data) => {
    const response = defaultResponse(true)
    if (SearchResult.is(data)) {
      return Object.assign(response, {
        data: data.rows,
        dataCount: data.count
      })
    }
    return Object.assign(response, {
      data: data,
      dataCount: data.length
    })
  }

  const Fail = (data) => {
    const response = defaultResponse(false)
    return Object.assign(response, {
      error: data
    })
  }

  return {
    Success,
    Fail
  }
}
