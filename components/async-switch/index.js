/**
 * 异步开关：同步、异步、禁用
 * @event <switch>
 */
Component({
  properties: {
    // 是否禁用
    disabled: {
      type: Boolean,
      value: false
    },
    // 是否选中
    checked: {
      type: Boolean,
      value: false
    },
    // 是否正在加载
    loading: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    _onTap: function () {
      {
        let loading = this.data.loading
        let disabled = this.data.disabled

        if (loading || disabled) return

        this.triggerEvent('switch')
      }
    }
  }
})
