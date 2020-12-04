// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    defultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goods = wx.getStorageSync('cart')
    this.setData({
      cart:goods
    })
    this.setBadge()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let num = wx.getStorageSync('num')
    this.setBadge(num)
  },

  setBadge(num) {
    wx.setTabBarBadge({
      index: 2,
      text: num+'',
    })
  },

  onChange(e) {
    let goodsState = e.target.dataset.goods_state
    let cart1 = wx.getStorageSync('cart')
    const result = cart1.find(x => x.goods_id === e.target.dataset.goodsid)
    if(result) {
      result.goods_state = !goodsState
    }
    wx.setStorageSync('cart', cart1)
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})