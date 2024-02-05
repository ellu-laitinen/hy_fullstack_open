import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] =useState(null)
  const [style, setStyle] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('Logging in with ',username, password )
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      setStyle('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  /*   const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        usernameee
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  ) */

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(retunedBlog => {
        setBlogs(blogs.concat(retunedBlog))
      })
    setStyle('confirmation')
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author}`)
    setTimeout(() => {
      setMessage(null)
      setStyle(null)
    }, 5000)

  }

  const handleLike = (id) => {
    console.log('Liked ', id)
    const blog = blogs.find(b => b.id === id)
    const changedBlog={ ...blog, likes: blog.likes+1 }
    console.log('Likes ', changedBlog.likes)

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))

      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const handleRemove = async (blog) => {
    console.log('remove ', blog.id, ' ', blog.title)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService
        .remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const sortedBlogs=blogs.sort((a, b) => b.likes -a.likes)
  console.log(sortedBlogs[0])

  return (
    <div>
      {!user && <div><Notification message={message} style={style} /><LoginForm  handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}/></div>
      }
      {user && <div>
        <h2>blogss</h2>
        <Notification message={message} style={style} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel='create new' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Togglable>


        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            user={user}
            handleLike={() => handleLike(blog.id)}
            handleRemove={() => handleRemove(blog)} />
        )}
      </div>

      }


    </div>
  )
}

export default App