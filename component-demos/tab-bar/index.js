
Page({
  onActiveTab: function (e) {
    let tabs = this.selectComponent('#tab-bar')
    tabs.setActiveIndex((e.currentTarget.dataset.index - 0 + 1) % 4)
  }
})
