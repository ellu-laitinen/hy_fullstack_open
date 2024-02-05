/* eslint-disable linebreak-style */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  // const input = screen.getByRole('textbox')
  const titleInput = screen.getByPlaceholderText('write title')
  const authorInput = screen.getByPlaceholderText('write author')
  const urlInput = screen.getByPlaceholderText('write url')
  const sendButton = screen.getByText('save')
  screen.debug(sendButton)

  await user.type(titleInput, 'testing title...')
  await user.type(authorInput, 'testing author...')
  await user.type(urlInput, 'testing url...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('create blog',createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url...')
})