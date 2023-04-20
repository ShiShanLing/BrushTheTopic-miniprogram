// pages/chat-gpt/chat/index.ts
import { Guid } from "../../../miniprogram_npm/guid-typescript/index";

interface ChatMessages {
  id: string,
  type: string,
  content: string
}


Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    messages: [] as ChatMessages[],
    inputValue: '',
    scrollIntoView: '',
    statsuBarHeight: 0,
    headHeight:40,
    chatListHeight:0,
    keyboardHeight:0,
    messageList:[],
    inutPanelHeight:50,
    toView: "item0",
    curMessage:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statsuBarHeight:systemInfo.statusBarHeight,
    })
    this.setChatListHeight();
    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      console.log("onKeyboardHeightChange=", res);
      
      this.setData({
        keyboardHeight: res.height
      });
      this.setChatListHeight();
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goBack() {
    console.log("---------");
    wx.navigateBack();
  },
  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  onSend: function() {

    wx.cloud.callFunction({
      // 云函数名称
      name: 'chatgpt-chat',
      // 传给云函数的参数
      data: {
        apiKey: "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",
        prompt: "我是一个高度智能的问答机器人。 如果你问我一个有根据的问题，我会给你答案。 如果你问我一个毫无意义的、骗人的或者没有明确答案的问题，我会回答“我不知道”。 Q:周杰伦有多少专辑",
      },
      success: function(res) {
        console.log("云函数调用成功==", res) // 3
      },
      fail: function(res){
        console.log("云函数调用失败==", res);
        
      }
    })

    // const messages = this.data.messages;
    // const inputValue = this.data.inputValue;
    // console.log("inputValue==", inputValue);
    
    // if (inputValue) {
    //   let temp_id = Guid.create().toString();
    //   messages.push({
    //     id: temp_id,
    //     type: 'sent',
    //     content: inputValue
    //   });

    //   this.setData({
    //     messages: messages,
    //     inputValue: '',
    //     scrollIntoView: 'message-' + (messages.length - 1)
    //   });
    // }
  },
  setChatListHeight() {
    this.setData({
      chatListHeight: app.globalData.sysHeight - app.globalData.statsuBarHeight - this.data.headHeight - this.data.keyboardHeight- this.data.inutPanelHeight
    })
  },
  hideKeyboard(){
    wx.hideKeyboard();
    this.hideMediaPanel();
  },
  getInput(e){
    let value = e.detail.value;
    this.setData({
      curMessage: value
    });
  },
  send() {
    let curMessage = this.data.curMessage;
    if (curMessage.trim() === "") {
      wx.showToast({
        title: '请输入聊天内容',
        duration: 2000,
        icon: "none"
      })
      return;
    }
    let messageList = this.data.messageList;
    messageList.push(curMessage);
    this.setData({
      curMessage:"",
      messageList:messageList
    })
  },

})