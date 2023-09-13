module.exports = (repository, attrs) => {
    const search = (searchParams) => {
        return Promise
            .resolve()
            .then(() => {
                if (searchParams.filter.status) {
                    let status = Array.isArray(searchParams.filter.status) ? searchParams.filter.status : [searchParams.filter.status]
                    delete searchParams.filter.status
                    return repository.getAll(attrs, searchParams).then(queryResult => {
                        let releases = queryResult.rows
                        return releases.filter(release => {
                            return !!status.find(s => s === release.status)
                        })
                    })                    
                } else {
                    return repository.getAll(attrs, searchParams)
                }
            }
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    const searchUseCase = { search }

    return {
        searchUseCase
    }
}