import { login, isLogin } from '../../utils/permission'

/**
 * 判断登录状态并跳转
 */
Page({
  onLoad: function () {
    login("123", {id: 123}) // demo 使用，默认登录

    if (isLogin()) {
      wx.switchTab({ url: '/pages/home/home' })
    } else {
      wx.redirectTo({url: '/pages/register/register'})
    }
  }
})
