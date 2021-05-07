import { uploadIdCardImg, updateUserInfoById } from '../../../../apis/user'
import Promisify from '../../../../utils/promisify'
import { getUID } from '../../../../utils/permission'
import { DOMAIN_NAME } from '../../../../apis/request'

var toptip // 保存toptip组件的引用
var app = getApp()
var isFromRegisterPage = false // 如果是从注册页进入，则在上传完资料后自动跳转到主页
var NB_TIMER

Page({
  data: {
    userInfo: {
      name: '',
      birthday: '',
      id_number: '',
      postcode: '',
      address: '',
      id_card_img: {
        front: '',
        back: ''
      }
    }
  },

  onLoad: function (options) {
    wx.showModal({
      title: '注意',
      content: '本项目仅作演示，切勿上传真实身份信息，否则后果自负！',
      showCancel: false
    })

    if (options.from === 'register') {
      isFromRegisterPage = true
      return
    }

    wx.showLoading({title: '加载中', mask: true})
    app.getUserInfo().then(userInfo => this.setData({
      'userInfo.name': userInfo.name,
      'userInfo.birthday': userInfo.birthday,
      'userInfo.id_number': userInfo.id_number,
      'userInfo.postcode': userInfo.postcode,
      'userInfo.address': userInfo.address,
      'userInfo.id_card_img.front': userInfo.id_card_img.front,
      'userInfo.id_card_img.back': userInfo.id_card_img.back
    })).finally(() => wx.hideLoading())
  },

  onUnload: function () {
    clearTimeout(NB_TIMER)
  },

  onReady: function () {
    toptip = this.selectComponent('#toptip')
  },

  onInput: function (e) {
    var params = {}
    let label = e.currentTarget.dataset.label
    params['userInfo.' + label] = e.detail.value
    this.setData(params)
  },

  onChooseImage: function (e) {
    var prop = 'userInfo.id_card_img.' + e.currentTarget.dataset.type
    Promisify(wx.chooseImage)({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'] // 可以指定来源是相册还是相机，默认二者都有
    }).then(res => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var params = {}
      params[prop] = res.tempFilePaths[0]
      this.setData(params)
    })
  },

  onPreviewImage: function (e) {
    let { front, back } = this.data.userInfo.id_card_img
    let type = e.currentTarget.dataset.type
    wx.previewImage({
      // 当前显示图片的http链接
      current: this.data.userInfo.id_card_img[type],
      // 需要预览的图片http链接列表，filter过滤空url
      urls: [front, back].filter(e => e)
    })
  },

  onDeleteImage: function (e) {
    var params = {}
    params['userInfo.id_card_img.' + e.currentTarget.dataset.type] = ''
    this.setData(params)
  },

  /**
   * 修改用户信息
   * 如果是从注册页进入，则在修改完成后跳转到主页
   * 如果是从个人资料页进入，则返回上一页
   */
  onSubmit: function () {
    if (this._validate() !== true) return

    wx.showToast({title: '修改成功', mask: true})

    return

    // 先上传身份证照片，获取图片url，再上传用户信息
    this._uploadIdCardImgs().then(this._updateUserInfo).then(res => {
      wx.showToast({title: '修改成功', mask: true})
      if (isFromRegisterPage) {
        NB_TIMER = setTimeout(() => wx.switchTab({url: '/pages/home/home'}), 1000)
      } else {
        NB_TIMER = setTimeout(() => wx.navigateBack(), 1000)
      }
    }).catch(() => wx.hideLoading())
  },

  /**
   * 上传身份证图片，返回图片url数组
   */
  _uploadIdCardImgs: function () {
    let { id_card_img: { front, back } } = this.data.userInfo
    let res = []

    // 如果是刚刚选择的本地照片，需要上传
    // 如果是服务器url，那么直接返回
    var upload = function (imgPath) {
      return new Promise((resolve, reject) => {
        if (imgPath.indexOf(DOMAIN_NAME) === -1) {
          wx.showLoading({title: '上传身份证中', mask: true})
          uploadIdCardImg(imgPath)
            .then(res => resolve(res))
            .catch(err => reject(err))
        } else {
          resolve(imgPath)
        }
      })
    }

    // 一张一张传，不用promise.all()
    return upload(front).then(frontPath => {
      res[0] = frontPath
      return upload(back)
    }).then(backPath => {
      res[1] = backPath
      return res
    })
  },

  /**
   * 将服务器返回的图片路径加入到参数中，上传个人信息
   */
  _updateUserInfo: function (imgPaths) {
    wx.showLoading({title: '修改中', mask: true})
    let uid = getUID()
    let userInfo = {
      ...this.data.userInfo,
      id_card_img: {
        front: imgPaths[0],
        back: imgPaths[1]
      }
    }
    return updateUserInfoById(uid, userInfo).then(res => {
      app.setUserInfo(res.data)
    })
  },

  _validate: function () {
    let {
      name, birthday, address, id_number, postcode,
      id_card_img: { front, back }
    } = this.data.userInfo

    // 检查信息是否全部填写
    if (!name) return toptip.show('请填写姓名')
    if (!birthday) return toptip.show('请填写出生日期')
    if (!id_number) return toptip.show('请填写身份证号')
    if (id_number.length !== 18) return toptip.show('身份证号必须为18位')
    if (!address) return toptip.show('请填写详细地址')
    if (!postcode) return toptip.show('请填写邮政编码')
    if (!front) return toptip.show('请上传身份证正面照片')
    if (!back) return toptip.show('请上传身份证反面照片')

    return true
  }
})
