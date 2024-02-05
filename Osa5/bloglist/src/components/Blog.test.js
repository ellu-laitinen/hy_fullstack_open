/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<BLog />', () => {
  let container
  const blog = {
    title: 'testing title',
    author: 'indiana',
    url: 'rtbtrbtr',
    likes: 1,
    user: {
      username: 'indiana',
      name: 'JOnes',
      id: '525',
    },
    id: '525',
  }
  const user = {
    name:'indiana'
  }
  /*
  beforeEach(() => {
    container =   render(<><Blog blog={blog} user={user} />
      <div className="testDiv" >
    togglable content
      </div></>)
  }) */


  test('renders title', () => {

    container = render(<Blog blog={blog} user={user}  />)

    const element = container.getByText('testing title')

    screen.debug(element)
    expect(element).toBeDefined()
  })

  /*   test.only('at start the children are not displayed', () => {
    screen.debug(container)
    const div = container.querySelector('.togglablePart')
    expect(div).toHaveStyle('display: none')
  }) */

  /*     test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)


    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  }) */

  test('if like clicked twice, return twice', async () => {
    const blog = {
      title: 'testing title',
      author: 'indiana',
      url: 'rtbtrbtr',
      likes: 1,
      user: {
        username: 'indiana',
        name: 'JOnes',
        id: '525',
      },
      id: '525',
    }
    const user = {
      name:'indiana'
    }




    /*     const button = screen.getByText('show')
    await user.click(button)

    screen.debug(button) */


    const handleLike = jest.fn()

    render(<Blog blog={blog} user={user} handleLike={handleLike} />)

    //const likeButton = container.querySelector('.likeBtn')

    const mockUser = userEvent.setup()
    const likeBtn = screen.getByText('like')

    await mockUser.click(likeBtn)
    await mockUser.click(likeBtn)
    expect(handleLike.mock.calls).toHaveLength(2)


  })

})
