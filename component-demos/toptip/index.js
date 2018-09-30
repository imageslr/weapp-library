
var toptip

Page({
  onReady: function () {
    toptip = this.selectComponent('#toptip')
  },

  onShowDefault: function () {
    toptip.show('我是一个顶部提示')
  },

  onShowType: function (e) {
    let type = e.currentTarget.dataset.type
    toptip.show('我是一个顶部提示', { type })
  },

  onShowDuration: function () {
    toptip.show('我在五秒钟后会消失', {duration: 5000})
  }
})
