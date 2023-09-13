const repository = require('src/infra/repositories/layout')
const { getSetting } = require('../settings/get_settings')
const Redis = require('src/redis');

const getLayoutFooterAboutUs = async (page) => {  
  const hash = 'layouts';
  const field = 'FooterAboutUs';
  let data = await Redis.get(hash, field);
  if(data) return data;

  return Promise
    .resolve()
    .then(async () => {
      const privacy = await getSetting('privacy')
      const who_are_we = await getSetting('who_are_we')
      const become_partner = await getSetting('become_partner')
      const data = {
        privacy: { h1Title: privacy.h1Title },
        who_are_we: { h1Title: who_are_we.h1Title },
        become_partner: { h1Title: become_partner.h1Title }
      }
      return Redis.set(hash, field, data);

      // repository.getLayoutFooterAboutUs(page)
    })
}

module.exports = {
  getLayoutFooterAboutUs
}
