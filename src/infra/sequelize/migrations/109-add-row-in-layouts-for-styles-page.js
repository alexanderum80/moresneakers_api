'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO layouts(id, page, title, description, keywords, headerImgUrl, headerImgMovil, headerLink, headerDisplay, sliderDisplay,  hottestDisplay, headerDisplayOnPage, sliderDisplayOnPage, hottestDisplayOnPage, createdAt, updatedAt, headerLabel, headingImgUrl, layoutMenuJSON, headingDisplayOnPage, pageTitle, dealsDisplayOnPage, whatWeDo, meta_description) VALUES ('scsag93f-fc28-adde-gdb5-fd627f1f7ed7', 'styles', 'Styles',  '',  '', NULL, NULL, NULL, 'top', 'top', 'bottom', 0, 0, 0, createdAt, updatedAt, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL)`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from layouts where id='scsag93f-fc28-adde-gdb5-fd627f1f7ed7'`),
    ]);
  }
};

