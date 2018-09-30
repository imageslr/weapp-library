import { get, post, del } from './request.js'

module.exports = {
  createBooklist: function (params) {
    return post('/booklists', params)
  },
  getRecommendedBooklistsByUserId: function (uid) {
    return get(`/booklists/recommend/${uid}`)
  },
  getBooklistById: function (id, start = 0) {
    return get(`/booklists/${id}?start=${start}`)
  },
  getBooksByBooklistId: function (id, start = 0) {
    return get(`/booklists/${id}/books?start=${start}`)
  },
  updateBooklistById: function (id, params) {
    return post(`/booklists/${id}`, params)
  },
  deleteBooklistById: function (id) {
    return del(`/booklists/${id}`)
  },
  favoriteBooklistById: function (id) {
    return post(`/booklists/${id}/favorite`)
  },
  getBooklistsByKeyword: function (keyword, start = 0) {
    return get('/booklists/search', { keyword, start })
  },
  getBooklistsByUserId: function (uid, type = 'all') {
    return get(`/booklists/users/${uid}?type=${type}`)
  }
}
