Page({
  data: {
    tappable: false
  },

  onLoad: function (options) {
    if (options.tappable) {
      this.setData({tappable: true})
    }
  }
})
