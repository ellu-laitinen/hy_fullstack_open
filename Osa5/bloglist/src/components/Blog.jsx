import { useState, useImperativeHandle } from 'react'

const Blog = ({ user, blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  /*   useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }) */

  return (

    <div style={blogStyle} className="blog" id={blog.title}>
      <p className="title"> {blog.title}</p>
      {/*  <div style={hideWhenVisible}> */}
      <button style={hideWhenVisible} onClick={toggleVisibility} id='show'>show</button>
      {/*    </div> */}
      <div style={showWhenVisible} className='togglablePart'>
        <p>
          {blog.url}
        </p>
        <p>Likes {blog.likes} <button onClick={handleLike} className='likeBtn'>like</button></p>
        <p>{blog.author}</p>
        {blog.user.name === user.name? <button onClick={handleRemove} id='removeBtn'>remove</button>: null }

        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>

  )
}

export default Blog