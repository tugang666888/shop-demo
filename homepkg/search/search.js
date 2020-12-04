// homepkg/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    focus: true,
    timer: null,
    searchResults: [],
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      historyList:JSON.parse(wx.getStorageSync('historyList') || '[]')
    })
  },

  onChange(e) {
    // console.log(e)
    clearTimeout(this.data.timer)
    this.data.timer = setTimeout(() => {
      this.setData({
        value: e.detail
      })
      this.getSearchList()
    }, 500)
  },

  async getSearchList() {
    if (this.data.value.length === 0) {
      this.setData({
        searchResults:[]
      })
      return
    }
    const { data: res } = await wx.$http.get('/api/public/v1/goods/qsearch', {
      query: this.data.value
    })
    if(res.meta.status !== 200) return wx.$showMsg()
    this.setData({
      searchResults:res.message
    })
    this.saveSearchHistory()
  },

  saveSearchHistory() {
    const set = new Set(this.data.historyList)
    set.delete(this.data.value)
    set.add(this.data.value)
    this.setData({
      historyList: Array.from(set)
    })
    wx.setStorageSync('historyList', JSON.stringify(this.data.historyList))
    console.log(Array.from(set))
  },

  gotoDetail(e) {
    let goodsId = e.target.dataset.goodsid
    wx.navigateTo({
      url: '/homepkg/goods_detail/goods_detail?goods_id='+ goodsId,
    })
  },

  clean() {
    this.setData({
      historyList:[]
    })
    wx.setStorageSync('historyList', '[]')
  },

  goGoodsList(e) {
    console.log(e.target.dataset.tagname)
    let tagname = e.target.dataset.tagname
    wx.navigateTo({
      url: '/homepkg/goods_list/goods_list?query='+tagname,
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