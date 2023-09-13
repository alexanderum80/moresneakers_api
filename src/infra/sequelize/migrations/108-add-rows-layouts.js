'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('8fbag93f-28fc-adde-b5gd-ed7fd627f1f7', 'coming_soon', 'Coming soon',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('4cbe3a18-a9fg-ab72-bb3a-31aa8eaf4c9a', 'just_dropped', 'Just dropped',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('g5728f63-dab-a37d-4b2e-eg9cc2f856b5', 'raffles', 'Raffles',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from layouts where id='8fbag93f-28fc-adde-b5gd-ed7fd627f1f7'`),
      queryInterface.sequelize.query(`delete from layouts where id='4cbe3a18-a9fg-ab72-bb3a-31aa8eaf4c9a'`),
      queryInterface.sequelize.query(`delete from layouts where id='g5728f63-dab-a37d-4b2e-eg9cc2f856b5'`),
    ]);
  }
};

