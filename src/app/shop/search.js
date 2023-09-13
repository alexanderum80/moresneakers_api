module.exports = (repository, attrs) => {
    const search = (searchParams) => {
        return Promise
            .resolve()
            .then(() => repository.getAll(attrs, searchParams))
            .catch(error => {
                throw new Error(error)
            })
    }

    const searchUseCase = { search }

    return {
        searchUseCase
    }
}