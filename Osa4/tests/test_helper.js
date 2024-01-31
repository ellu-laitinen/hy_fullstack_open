const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs= [
    {
        author:"juhana",
        title:"ploki1",
        likes:5,
        url:"fhskaöfasff"
    },
    {
    author:"lissu",
    title:"ploki2",
    likes:6,
    url:"fhskaöfasff"
    },
    {
    author:"patsy",
    title:"plogi3",
    likes:18,
    url:"fhskaöfasff"
    },
    {
    author:"dolly",
    title:"blog4",
    likes:15,
    url:"fhskaöfasff"
    },
    
]



const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}