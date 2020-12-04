// homepkg/goods_detail/goods_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_info: {},
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    console.log(goods_id)
    const {
      data: res
    } = await wx.$http.get('/api/public/v1/goods/detail', {
      goods_id: goods_id
    })
    if (res.meta.status !== 200) return wx.$showMsg()
    res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp /g, 'jpg')
    this.setData({
      goods_info: res.message
    })
  },

  perview(e) {
    let current = e.currentTarget.dataset.current
    wx.previewImage({
      current: current,
      urls: this.data.goods_info.pics.map(x => x.pics_big)
    })
  },

  onClickIcon(e) {
    if (e.target.dataset.text === '购物车') {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    }
  },

  onClickButton(e) {
    if (e.target.dataset.text === '加入购物车') {
      let cart = wx.getStorageSync('cart') || []
      let index = cart.findIndex(x => x.goods_id === this.data.goods_info.goods_id)
      if (index === -1) {
        // 不存在 第一次添加
        this.data.goods_info.num = 1
        this.data.goods_info.goods_state = false
        cart.push(this.data.goods_info)
      } else {
        // 已存在购物车数据 执行num++
        cart[index].num++
      }
      wx.setStorageSync('cart', cart)
      this.getShopNum()
      wx.$showMsg('加入成功')
    }
  },

  getShopNum() {
    let c = 0
    let shopnum = wx.getStorageSync('cart')
    if (shopnum.length != 0) {
      shopnum.forEach(x => c += x.num)
      wx.setStorageSync('num', c)
      this.setData({
        info: c
      })
    } else return

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getShopNum()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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