import { Base64 } from "../../pages/tools/general-tools";

interface Item{
  title:string,
  image:string,
  id:number,
  des:string
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {title:"严谨的机器人", image:"../../pages/assets/chatgpt-chat.png", id:0, des:"我是一个高度智能的问答机器人。 如果你问我一个有根据的问题，我会给你答案。 如果你问我一个毫无意义的、骗人的或者没有明确答案的问题，我会回答“我不知道”。",}, 
      {title:"思维灵活的机器人", image:"../../pages/assets/chatgpt-chat.png", id:1, des:"我是一个高度智能的问答机器人。 我乐于助人、富有创造力、聪明而且非常友好。",}, 
      {title:"没耐心的机器人", image:"../../pages/assets/chatgpt-chat.png", id:1, des:"我是一个高度智能的问答机器人。 我性格大大咧咧、没有耐心、说话比较尖锐。",},
    ]
  },
  /**
   * //
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
    let tempItem:Item|undefined = undefined;
    this.data.items.forEach((item)=>{
      if (item.id == Number(item_id)){
        tempItem = item;
      }
    })
    console.log("tempItem.des===", tempItem.des);
    
    let  baseStr = Base64.encode(tempItem.des);
    
    wx.navigateTo({url:`./chat/index?des=${baseStr}`})
  }
})