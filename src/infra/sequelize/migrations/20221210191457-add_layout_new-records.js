'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('ac8e341b-49f6-4872-8b34-3144beafac99', 'in_stock', 'In Stock',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('ac8e341b-49f6-4872-8b34-3144beafac10', 'releases_coming_soon', 'Upcoming',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('ac8e341b-49f6-4872-8b34-3144beafac13', 'resell_only', 'Resell Only',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from layouts where id='ac8e341b-49f6-4872-8b34-3144beafac99'`),
      queryInterface.sequelize.query(`delete from layouts where id='ac8e341b-49f6-4872-8b34-3144beafac10'`),
      queryInterface.sequelize.query(`delete from layouts where id='ac8e341b-49f6-4872-8b34-3144beafac13'`),
    ]);
  }
};
