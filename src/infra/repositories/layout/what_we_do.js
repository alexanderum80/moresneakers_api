const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutWhatWeDo } = require('../../../domain/layout')
const { getBoolean } = require('src/app/layout/helper')

const mapWhatWeDo = (wwdDomain) => {
    let neWwdDomain = LayoutWhatWeDo(wwdDomain)
    neWwdDomain.whatWeDo = wwdDomain.whatWeDo
    return neWwdDomain
}

const unMapWwd = (dbModel) => {
    let wwdDomain = Object.create(dbModel)
    wwdDomain.whatWeDo = dbModel.whatWeDo
    return LayoutWhatWeDo(wwdDomain)
}

module.exports = (database) => {
    const model = database.models.layouts
    const updateWhatWeDo = async (page, wwd) => {
        let layoutDb = await model.findOne({ where: { page: page } })
        if (!layoutDb) {
            throw new EntityNotFound()
        }
        await layoutDb.updateAttributes(mapWhatWeDo(wwd))
        return wwd
    }

    const getWhatWeDo = async (page) => {
        let layoutDB = await model.findOne({ where: { page } })
        if (!layoutDB) {
            throw new EntityNotFound()
        }
        return unMapWwd(layoutDB)
    }

    return {
        updateWhatWeDo,
        getWhatWeDo
    }
}
