module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`
        UPDATE releases r SET slug =
        REPLACE(
          REPLACE(
              REPLACE(
                  REPLACE(
                    REPLACE(
                      REPLACE(
                        REPLACE(
                          REPLACE(
                            REPLACE(
                                REPLACE( r.slug, "'", ""),
                            "!",""),
                          "!",""),
                        "{",""),
                      "}",""),
                    "[",""),
                  "]",""),
              " ","-"),
           "\\"",""),
         "--","");
      `)
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('releases', 'slug')
    ])
  }
}
