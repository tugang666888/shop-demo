// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[], // 轮播图数据
    navList:[], // 分类导航栏数据
    floorList:[], // 楼层数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },

  // 获取轮播图数据
  async getSwiperList() {
    const {data:res} =await wx.$http.get('/api/public/v1/home/swiperdata')
    console.log(res)
    if (res.meta.status !== 200) return wx.$showMsg()
    this.setData({
      swiperList:res.message
    })
  },

  // 获取分类导航数据
  async getNavList() {
    const {data:res} =await wx.$http.get('/api/public/v1/home/catitems')
    console.log(res)
    if(res.meta.status !==200) return wx.$showMsg()
    this.setData({
      navList:res.message
    })
  },

  // 获取分类数据跳转tabar
  navClickHandler(e) {
    let name = e.target.dataset.name
    console.log(e.target.dataset.name)
    if(name === '分类') {
      wx.switchTab({
        url: '/pages/cate/cate',
      })
    }
  },

  // 获取首页楼层数据方法
  async getFloorList() {
    const {data:res} = await wx.$http.get('/api/public/v1/home/floordata')
    console.log(res.message)
    if(res.meta.status !==200) return wx.$showMsg()
    // 对数据进行处理
    res.message.forEach(floor => {
      floor.product_list.forEach(prod => {
        prod.url = '/homepkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
      })
    })
    this.setData({
      floorList:res.message
    })
  },

  gotoSearch() {
    wx.navigateTo({
      url: '/homepkg/search/search',
    })
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