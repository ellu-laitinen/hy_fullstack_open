const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
      
  })
  
 blogsRouter.get('/:id', async (request, response, next) => {



    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
   
})

blogsRouter.post('/', async (request, response) => {
const body = request.body

const user = request.user
    try {
        const blog = new Blog({
        author: body.author,
        title: body.title,
        likes: body.likes === undefined ? 0 :body.likes,
        url: body.url,
        user: user.id.toString()
        })

    const savedBlog = await 
    blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    }catch {
        response.status(400).json({ error: 'error in saving' })

    }

  })

 blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(user._id.toString() === blog.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'unauthorized' })
  }

})


blogsRouter.put('/:id', async (request, response, next) => {
    const {author, title, url, likes} = request.body
        try {
            const updatedBlog =await Blog.findByIdAndUpdate(request.params.id, {author, title, url, likes}, { new: true })
            response.status(200).json(updatedBlog)
        } catch (exception) {
            next(exception)

        }
  })
  

  module.exports = blogsRouter