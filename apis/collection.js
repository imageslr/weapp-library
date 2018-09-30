import { get } from './request.js'

module.exports = {
  getCollectionsByBookId: function (id, params = {}) {
    return get(`/books/${id}/collections`, params)
  },
  getCollectionsByBookISBN: function (isbn, params = {}) {
    return get(`/books/isbn/${isbn}/collections`, params)
  }
}
