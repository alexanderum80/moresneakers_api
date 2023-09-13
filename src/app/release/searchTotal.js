const releaseRepository = require('src/infra/repositories/release')
   const searchTotal = (search, searchParams = {}) => {
        return Promise
            .resolve()
            .then(() =>                  
              releaseRepository.getSearchTotalReleaseList(search, searchParams)          
             )
            .catch(error => {
                throw new Error(error)
            })

    }
    
module.exports = {
    searchTotal
}