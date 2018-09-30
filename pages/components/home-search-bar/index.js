import Promisify from '../../../utils/promisify'
import { showTip } from '../../../utils/tip'
import { isISBN } from '../../../utils/validator'

/**
 * 主页的搜索输入框
 */
Component({
  properties: {

  },

  data: {
    options: {
      selected: '书名',
      list: [
        '书名', '作者', 'ISBN', '标签', '高级搜索'
      ],
      show: false
    },
    focus: false,
    value: ''
  },

  methods: {
    getSelectedOption: function () {
      return this.data.options.selected
    },

    setInputValue: function (value) {
      this.setData({value: value})
    },

    _onFocus: function () {
      this.setData({
        'options.selected': this.data.options.list[0],
        'focus': true
      })
      this.triggerEvent('focus')
    },

    _onClear: function () {
      this.setData({
        'value': ''
      })
    },

    _onCancel: function () {
      this.setData({
        'value': '',
        'focus': false,
        'options.show': false
      })
      this.triggerEvent('cancel')
    },

    _onInput: function (e) {
      this.setData({
        'value': e.detail.value
      })
    },

    _onTapOptionBtn: function () {
      this.setData({
        'options.show': !this.data.options.show // 切换列表显示
      })
    },

    _onSelectOption: function (e) {
      if (e.currentTarget.dataset.option === '高级搜索') {
        wx.navigateTo({ url: './children/advanced-search' })
        return
      }
      if (e.currentTarget.dataset.option === 'ISBN') {
        showTip('SEARCH_SCAN')
      }
      this.setData({
        'options.selected': e.currentTarget.dataset.option,
        'options.show': false
      })
    },

    _onScan: function () {
      var scanfn = Promisify(wx.scanCode)
      scanfn({scanType: ['barCode']}).then(res => {
        if (!isISBN(res.result)) {
          return wx.showModal({
            title: '扫描内容不合法',
            content: '请扫描图书ISBN条形码',
            showCancel: false
          })
        } else {
          wx.navigateTo({
            url: `../book-detail/book-detail?isbn=${res.result}`
          })
        }
      })
    },

    // 在输入框不为空时搜索
    _onSearch: function (e) {
      if (this.data.value) {
        this.triggerEvent('search', {
          type: this.data.options.selected,
          value: this.data.value
        })
      }
    }
  }
})
