const { makeEntity } = require('../helper')

const transform = (data) => {
  return data
}

const Blog = makeEntity(require('./blog'), transform)
const BlogImage = makeEntity(require('./blog_image'))
const CreateBlogImage = makeEntity(require('./create_blog_image'))

module.exports = { Blog, BlogImage, CreateBlogImage }
