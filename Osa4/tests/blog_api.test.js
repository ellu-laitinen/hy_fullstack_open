const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
    // await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)  
})

test('identifying field is named id', async () => {
  const response = await api.get('/api/blogs')

 // response.body.map(r => console.log("ID "+r.name))
  expect(response.body.map(r => r.id)).toBeDefined()


})

test('a valid blog can be added ', async () => {
  const newBlog = {
    author: 'svensson',
    title: "ploki88",
    likes: 88,
    url:"rvsiuwoir"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const names = blogsAtEnd.map(n => n.title)
   

  expect(names).toContain(
    'ploki88'
  )
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: "sven",
    url:"plogi555",
    likes:55
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('if likes is not set, set amount to 0', async () => {
  const newBlog = {
    author: "sven",
    title:"lfslf",
    url:"plogi555",

  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
   

    const blogsAtEnd = await helper.blogsInDb()
    console.log("VIKA BLOGI?",blogsAtEnd[blogsAtEnd.length-1])


  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

describe('deletion of a blog post', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    console.log("POISTETTAVA ",blogsAtStart[0])
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})


test.only('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  console.log("blog to udate ", blogToUpdate)

  const newBlog = {
    ... blogToUpdate,
    likes: 22
  }
  console.log("UPDATED? ", newBlog)

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
   

    const resultBlog = await api
    .get(`/api/blogs/${blogToUpdate.id}`)
    .expect(200)

console.log("RESULT ", resultBlog.body)

  
  expect(resultBlog.body.likes).toEqual(22)



})

afterAll(async () => {
  await mongoose.connection.close()
})