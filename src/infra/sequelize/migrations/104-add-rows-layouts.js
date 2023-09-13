'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('bf84693f-2bfc-4dde-856d-ed7fd627f1f7', 'available_now', 'Available now',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('ac8e341b-49f6-4872-8b34-3144beafac94', 'sold_out', 'Sold out',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('6572bf63-d448-437d-a82e-e69cc2fb5685', 'on_sale', 'On sale',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('a40a9b93-33db-4a5b-bce2-e278e43051e1', 'restocked', 'Restocked', '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`)
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from layouts where id='bf84693f-2bfc-4dde-856d-ed7fd627f1f7'`),
      queryInterface.sequelize.query(`delete from layouts where id='ac8e341b-49f6-4872-8b34-3144beafac94'`),
      queryInterface.sequelize.query(`delete from layouts where id='6572bf63-d448-437d-a82e-e69cc2fb5685'`),
      queryInterface.sequelize.query(`delete from layouts where id='a40a9b93-33db-4a5b-bce2-e278e43051e1'`),
    ]);
  }
};

