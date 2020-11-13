import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('Blogform calls the event handler and gives the right details.', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} >
    </BlogForm>
  )

  component.debug()

  const inputT = component.container.querySelector('#title')
  const inputA = component.container.querySelector('#author')
  const inputU = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputT, {
    target: { value: 'testing of form author could be easier' }
  })
  fireEvent.change(inputA, {
    target: { value: 'testing of form author could be easier' }
  })
  fireEvent.change(inputU, {
    target: { value: 'testing of form url could be easier' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of form author could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('testing of form author could be easier')
  expect(createBlog.mock.calls[0][0].url).toBe('testing of form url could be easier')
})