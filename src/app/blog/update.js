const blogRepository = require('src/infra/repositories/blog');
const { Blog } = require('src/domain/blog');
const slugify = require('slugify');


const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Blog(body);
      domain.slug = slugify(domain.title.toLowerCase());

      await blogRepository.updateBlog(id, domain);

      resolve(domain);

    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  update
}
