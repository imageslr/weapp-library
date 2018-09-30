import Promisify from '../../utils/promisify'
import { updateUserInfoById } from '../../apis/user'
import { logout, getUID } from '../../utils/permission'

var app = getApp()

Page({
  data: {
    showLoginBtn: false
  },

  onLoad: function () {
    // 获取用户授权，更新用户昵称与头像
    Promisify(wx.getUserInfo)()
      .then(this._updateUserInfo)
      .catch(() => this.setData({showLoginBtn: true}))
  },

  onLogout: function () {
    wx.showModal({
      content: '确定退出登录？',
      success: res => {
        if (res.confirm && logout()) {
          wx.reLaunch({ url: '/pages/register/register' })
        }
      }
    })
  },

  onClickLoginBtn: function (e) {
    let { errMsg } = e.detail
    if (errMsg.indexOf('fail') === -1) {
      this._updateUserInfo(e.detail).then(() => {
        this.setData({showLoginBtn: false})
      })
      wx.showToast({title: '授权成功'})
    }
  },

  _updateUserInfo: function (userInfo) {
    return updateUserInfoById(getUID(), {
      nickname: userInfo.userInfo.nickName,
      avatar: userInfo.userInfo.avatarUrl
    }).then(res => app.setUserInfo(res))
  }
})
