// homepkg/goods_list/goods_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 请求参数对象
    queryObj:{
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },
    // 商品列表的数据
    goodsList:[],
    // 总数量，用来实现分页功能
    total:0,
    // 默认图片地址
    defultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    isloading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'queryObj.query':options.query || '',
      'queryObj.cid':options.cid || ''
    })
    this.getGoodsList()
  },

  // 获取商品列表的数据
  async getGoodsList(cb) {
    // 打开节流阀
    this.setData({
      isloading:true
    })
    const { data:res } = await wx.$http.get('/api/public/v1/goods/search',this.data.queryObj)
    // 关闭节流阀
    this.setData({
      isloading:false
    })
    cb && cb()
    if(res.meta.status !== 200) return wx.$showMsg()
    let goodsList = [...this.data.goodsList,...res.message.goods]
    this.setData({
      goodsList:goodsList,
      total:res.message.total
    })
  },

  gotoDetail(e) {
    let goodsid = e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: '/homepkg/goods_detail/goods_detail?goods_id='+goodsid,
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
    this.setData({
      total:0,
      'queryObj.pagenum':1,
      isloading:false,
      goodsList:[]
    })
    this.getGoodsList(() => {wx.stopPullDownRefresh()})
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否还有下一页数据
    if(this.data.queryObj.pagenum * this.data.queryObj.pagesize >= this.data.total) return wx.$showMsg('数据加载完毕')
    // 判断是否正在请求其他数据，如果是，则不发起额外请求
    if(this.data.isloading == true) return
    this.data.queryObj.pagenum++
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})