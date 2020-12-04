// components/my-login/my-login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    token:'',
    userinfo:{}
  },

  lifetimes:{
    attached() {
      const userinfo = wx.getStorageSync('userinfo') || {}
      this.setData({
        userinfo:userinfo
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo(e) {
      console.log(e)
      if(e.detail.errMsg === 'getUserInfo:fail auth deny') return wx.$showMsg('您取消了登录授权!')
      // console.log(e.detail.userInfo)
      this.setData({
        userinfo:e.detail.userInfo
      })
      wx.setStorageSync('userinfo', e.detail.userInfo)
      this.getToken(e.detail)
    },
    async getToken(info) {
      const res = await wx.login().catch(err => err)
      if(res.errMsg !== 'login:ok') return wx.$showMsg('登录失败')
      // console.log(res)
      // 准备参数
      const query = {
        code:res.code,
        encryptedData:info.encryptedData,
        iv:info.iv,
        rawData:info.rawData,
        signature:info.signature
      }
      // console.log(res.code)
      // console.log(info)
      const { data:loginResult } = await wx.$http.post('/api/public/v1/users/wxlogin',query)
      console.log(loginResult)
      if(loginResult.meta.status !== 200) return wx.$showMsg('登录失败！')
      
      wx.$showMsg('登录成功！')
    }
  }
})
