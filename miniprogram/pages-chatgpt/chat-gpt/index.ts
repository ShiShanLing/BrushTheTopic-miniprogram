

interface Item{
  title:string,
  image:string,
  id:number
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:[{title:"聊天", image:"../../pages/assets/chatgpt-chat.png", id:0}, 
    {title:"聊天1", image:"../../pages/assets/chatgpt-chat.png", id:1}, 
    {title:"聊天2", image:"../../pages/assets/chatgpt-chat.png", id:2}, 
    {title:"聊天3", image:"../../pages/assets/chatgpt-chat.png", id:3}, 
    {title:"聊天4", image:"../../pages/assets/chatgpt-chat.png", id:4}, 
    {title:"聊天5", image:"../../pages/assets/chatgpt-chat.png", id:5}, 
    {title:"聊天6", image:"../../pages/assets/chatgpt-chat.png", id:6}, 
    {title:"聊天7", image:"../../pages/assets/chatgpt-chat.png", id:7}, 
    {title:"聊天8", image:"../../pages/assets/chatgpt-chat.png", id:8}, 
    {title:"聊天9", image:"../../pages/assets/chatgpt-chat.png", id:9}]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  goBack() {
    console.log("---------");
    wx.navigateBack();

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  pushToNewPage(event:any){
    let item_id:string = event.currentTarget.dataset.item_id ?? "";
    console.log("item_id==", item_id);
    wx.navigateTo({url:"./chat/index"})
  }
})