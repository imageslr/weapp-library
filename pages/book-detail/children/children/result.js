
Page({
  data: {
    title: undefined,
    first: undefined,
    second: undefined
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({title: options.title})
    this.setData({
      title: options.title,
      first: options.first,
      second: options.second
    })
  },

  onBack: function () {
    wx.navigateBack()
  },

  onSwitch: function () {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
