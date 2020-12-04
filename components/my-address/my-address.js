// components/my-address/my-address.js
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
    address: {},
    Jaddress: {},
    sumaddress:''
  },
  attached() {
    this.setData({
      Jaddress: JSON.stringify(this.data.address)
    })
  },

  observers: {
    '**': function () {}
  },


  /**
   * 组件的方法列表
   */
  methods: {
    async chooseAddress() {
      const res = await wx.chooseAddress().catch(err => err)
      console.log(res)
      const sumaddress = res.provinceName+res.cityName+res.countyName+res.detailInfo
      console.log(sumaddress)
      this.setData({
        address: res,
        Jaddress: JSON.stringify(res),
        sumaddress:sumaddress
      })
    }
  },

})