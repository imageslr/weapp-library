import { get, post, del } from './request.js'

module.exports = {
  getLibraryById: function (id) {
    return get(`/libraries/${id}`)
  }
}
