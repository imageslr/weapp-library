
Page({
  data: {
    loading: true
  },

  onLoading: function () {
    this.setData({loading: true})
  },

  onCancelLoading: function () {
    this.setData({loading: false})
  }
})
