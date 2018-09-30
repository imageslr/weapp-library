
var toast

Page({
  onReady: function () {
    toast = this.selectComponent('#toast')
  },

  onShowDefault: function () {
    toast.show('我是一个浮动提示')
  },

  onShowPostion: function (e) {
    let position = e.currentTarget.dataset.pos
    toast.show('我是一个浮动提示', { position })
  },

  onShowDuration: function () {
    toast.show('我在五秒钟后会消失', {duration: 5000})
  }
})
