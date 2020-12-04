// pages/cate/cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: 0, // 当前设备可用的高度
    cateList: [], // 分类列表
    active:0,
    cateLevel2:[], // 二级分类列表
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sysInfo = wx.getSystemInfoSync()
    this.setData({
      wh: sysInfo.windowHeight - 50
    })
    this.getCateList()
  },

  // 获取分类列表数据
  async getCateList() {
    const { data: res} = await wx.$http.get('/api/public/v1/categories')
    console.log(res.message)
    if(res.meta.status !== 200) return wx.$showMsg()
    this.setData({
      cateList:res.message,
      cateLevel2:res.message[0].children
    })
  },

  activeChanged(e) {
    console.log(e)
    let active = e.target.dataset.index
    this.setData({
      active:active,
      // 重新为二级列表分类
      cateLevel2:this.data.cateList[active].children,
      scrollTop:this.data.scrollTop === 0 ? 1 : 0
    })
  },

  gotoGoodsList(e) {
    console.log(e)
    let cid = e.currentTarget.dataset.cid
    wx.navigateTo({
      url: '/homepkg/goods_list/goods_list?cid='+ cid,
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