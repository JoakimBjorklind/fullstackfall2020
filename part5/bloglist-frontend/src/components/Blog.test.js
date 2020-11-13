import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render title and author only visible', () => {
  const user = {
    username: 'test',
    password: 'badOne',
  }

  const blog = {
    title: 'testBlog',
    author: 'tester',
    url: 'www.ttttttt.com',
    likes: 22,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user}>
    </Blog>
  )

  component.debug()

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)

})

test('by pressing "view" button, number of likes and url are shown', () => {
  const user = {
    username: 'test',
    password: 'badOne',
  }

  const blog = {
    title: 'testBlog',
    author: 'tester',
    url: 'www.ttttttt.com',
    likes: 22,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user}>
    </Blog>
  )

  component.debug()

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})