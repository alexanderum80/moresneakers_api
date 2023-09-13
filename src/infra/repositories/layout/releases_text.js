const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutReleasesText } = require('../../../domain/layout')
// const { getBoolean } = require('src/app/layout/helper')
const Redis = require('src/redis');

const mapReleasesText = (rtDomain) => {
    let newrtDomain = LayoutReleasesText(rtDomain)
    newrtDomain.releasesText = rtDomain.releasesText
    return newrtDomain
}

const unMapRT = (dbModel) => {
    let rtDomain = Object.create(dbModel)
    rtDomain.releasesText = dbModel.releasesText
    return LayoutReleasesText(rtDomain)
}

module.exports = (database) => {
    const model = database.models.layouts
    const updateReleasesText = async (page, wwd) => {
        let layoutDb = await model.findOne({ where: { page: page } })
        if (!layoutDb) {
            throw new EntityNotFound()
        }
        await layoutDb.updateAttributes(mapReleasesText(wwd))
        await Redis.hdel('layouts', page);   
        return wwd
    }

    const getReleasesText = async (page) => {
        let layoutDB = await model.findOne({ where: { page } })
        if (!layoutDB) {
            throw new EntityNotFound()
        }
        return unMapRT(layoutDB)
    }

    return {
        updateReleasesText,
        getReleasesText
    }
}
