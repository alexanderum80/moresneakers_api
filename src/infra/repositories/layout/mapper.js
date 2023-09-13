const { Layout } = require('src/domain/layout')

// Transforms layout from domain to database object
const map = (layoutDomain) => {
  const newLayoutDomain = Layout(layoutDomain)
  return {
    page: newLayoutDomain.page,
    headingJson: JSON.stringify(newLayoutDomain.heading),
    headerJson: JSON.stringify(newLayoutDomain.header),
    sliderJson: JSON.stringify(newLayoutDomain.slider),
    hottestJson: JSON.stringify(newLayoutDomain.hottest),
    dealsDisplayOnPage: layoutDomain.dealsDisplayOnPage,
    whatWeDoJson: newLayoutDomain.whatWeDo,
  }
}

const unmap = (dbModel) => {
  return Layout(dbModel)
}

module.exports = {
  map,
  unmap
}
