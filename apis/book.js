import { get } from './request.js'

module.exports = {
  getBookById: function (id) {
    return get(`/books/${id}`)
  },
  getBookByISBN: function (isbn) {
    return get(`/books/isbn/${isbn}`)
  },
  getRankingBooks: function (start = 0) {
    return get(`/books/ranking?start=${start}`)
  },
  getRecommendedBooksByUserId: function (uid) {
    return get(`/books/recommend/${uid}`)
  },
  getBooksByKeyword: function (keyword, start = 0) {
    return get('/books/search', { keyword, start })
  },
  getBooksByAuthor: function (author, start = 0) {
    return get(`/books/authors/${author}?start=${start}`)
  },
  getBooksByTag: function (tag, start = 0) {
    return get(`/books/tags/${tag}?start=${start}`)
  },
  getBooksByAdvancedSearch: function (params) {
    return get('/books/search/advanced', params)
  },
  getBooksByClassificationNumber: function (classNum, start = 0) {
    return get(`/books/classifications/${classNum}?start=${start}`)
  }
}
