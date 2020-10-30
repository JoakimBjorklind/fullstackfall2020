const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let fav = blogs[0]
  blogs.forEach((blog) => {
      if (blog.likes > fav.likes) {
          fav = blog
      }
  })

  delete fav._id
  delete fav.__v
  delete fav.url
  return fav
}

  module.exports = {
     dummy, totalLikes, favoriteBlog
  }