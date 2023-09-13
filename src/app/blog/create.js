const blogRepository = require('src/infra/repositories/blog');
const { Blog } = require('src/domain/blog');
const slugify = require('slugify');


const create = ({ body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Blog(body);

      domain.slug = slugify(domain.title.toLowerCase());

      const blog = await blogRepository.createBlog(domain);

      resolve(blog);

    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  create
}
