import { getOrderById, cancelOrderByOrderId, renewBookByOrderId, deleteOrderByOrderId } from '../../../../apis/order'

var ORDER_ID // 订单id
var app = getApp()
var NB_TIMER

Page({
  data: {
    pageStatus: 'loading', // error, done
    order: {
      id: undefined,
      status: undefined,
      book: {},
      library: {}
    }
  },

  onLoad: function (options) {
    ORDER_ID = options.id
    this._loadPage()
  },

  onUnload: function () {
    clearTimeout(NB_TIMER)
  },

  onReloadPage: function () {
    this._loadPage()
  },

  /**
   * 续借
   * @event <orderRenewed> 事件在订单列表页(../order-ongoing)被监听
   */
  onRenew: function () {
    this._onAction(
      '续借图书',
      '每本图书只能续借一次，续借时间为一个月',
      '续借',
      'orderRenewed',
      renewBookByOrderId
    )
  },

  /**
   * 取消订单
   * @event <orderCanceled> 事件在订单列表页(../order-ongoing)被监听
   */
  onCancel: function () {
    this._onAction(
      '取消订单',
      '确定取消该订单？这项操作将无法撤销',
      '取消',
      'orderCanceled',
      cancelOrderByOrderId,
      true
    )
  },

  /**
   * 删除订单
   * @event <orderDeleted> 事件在订单历史页(../order-history)被监听
   */
  onDelete: function () {
    this._onAction(
      '删除订单',
      '确定删除该订单？这项操作将无法撤销',
      '删除',
      'orderDeleted',
      deleteOrderByOrderId,
      true
    )
  },

  _onAction: function (title, content, actionName, eventName, func, needGoBack = false) {
    wx.showModal({
      title,
      content,
      success: res => {
        if (res.confirm) {
          wx.showLoading({ title: `${actionName}中`, mask: true })
          func(ORDER_ID).then(() => {
            wx.showToast({ title: `${actionName}成功` })
            app.event.emit(eventName, {order: this.data.order})
            if (needGoBack) NB_TIMER = setTimeout(() => wx.navigateBack(), 700)
          }).finally(() => wx.hideLoading())
        }
      }
    })
  },

  _loadPage: function () {
    this.setData({pageStatus: 'loading'})
    getOrderById(ORDER_ID).then(res => {
      this.setData({
        order: res.data,
        pageStatus: 'done'
      })
    }).catch(() => this.setData({pageStatus: 'error'}))
  }
})
