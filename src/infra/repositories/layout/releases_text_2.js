const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutReleasesText2 } = require('../../../domain/layout')
// const { getBoolean } = require('src/app/layout/helper')
const Redis = require('src/redis');

const mapReleasesText2 = (rtDomain) => {
    let newrtDomain = LayoutReleasesText2(rtDomain)
    newrtDomain.releasesText2 = rtDomain.releasesText2
    return newrtDomain
}

const unMapRT = (dbModel) => {
    let rtDomain = Object.create(dbModel)
    rtDomain.releasesText2 = dbModel.releasesText2
    return LayoutReleasesText2(rtDomain)
}

module.exports = (database) => {
    const model = database.models.layouts
    const updateReleasesText2 = async (page, wwd) => {
        let layoutDb = await model.findOne({ where: { page: page } })
        if (!layoutDb) {
            throw new EntityNotFound()
        }
        await layoutDb.updateAttributes(mapReleasesText2(wwd))
        await Redis.hdel('layouts', page);   
        return wwd
    }

    const getReleasesText2 = async (page) => {
        let layoutDB = await model.findOne({ where: { page } })
        if (!layoutDB) {
            throw new EntityNotFound()
        }
        return unMapRT(layoutDB)
    }

    return {
        updateReleasesText2,
        getReleasesText2
    }
}
