
Page({
  data: {
  },

  onShowCollapse: function () {
    wx.showModal({
      content: '显示 collapse 内容',
      showCancel: false
    })
  },

  onHideCollapse: function () {
    wx.showModal({
      content: '隐藏 collapse 内容',
      showCancel: false
    })
  },

  onTapAction: function () {
    wx.showModal({
      content: '点击了操作按钮',
      showCancel: false
    })
  }
})
