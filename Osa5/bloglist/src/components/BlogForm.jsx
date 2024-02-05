/* eslint-disable linebreak-style */
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle]=useState('')
  const [newAuthor, setNewAuthor]=useState('')
  const [newUrl, setNewUrl]=useState('')

  const addBlog= (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      title<input
          id='title'
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          placeholder='write title'
        /><p>author<input
          id='author'
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='write author'
        /></p>
        <p>   url<input
          id='url'
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          placeholder='write url'
        /></p>


        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm