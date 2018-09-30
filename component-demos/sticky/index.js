
Page({
  data: {
    scrollTop: 0,
    eventInfo: {}
  },

  onPageScroll: function (e) {
    this.setData({scrollTop: e.scrollTop})
  },

  onSticky: function (e) {
    this.setData({eventInfo: e.detail})
  }
})
