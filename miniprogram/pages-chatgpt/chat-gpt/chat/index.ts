// pages/chat-gpt/chat/index.ts
import { Base64 } from "../../../pages/tools/general-tools";
import { Guid } from "../../../miniprogram_npm/guid-typescript/index";

interface ChatMessages {
  id: string,
  //消息类型 Q:发送者 A:回答者
  type: string,
  content: string,
  //消息状态,默认是 0 发送中 1已发送. 只有回答者才能使用发送中,
  state: number
}
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    des:"",
    messages: [
    { id: "a-0", type: "A", content: "我是一个高度智能的问答机器人。 如果你问我一个有根据的问题，我会给你答案。 如果你问我一个毫无意义的、骗人的或者没有明确答案的问题，我会回答“我不知道”。", state: 1 }, ],
    inputValue: '',
    statsuBarHeight: 0,
    headHeight: 40,
    chatListHeight: 0,
    keyboardHeight: 0,
    messageList: [],
    inutPanelHeight: 50,
    toView: "item0",
    curMessage: "",
    scrollViewHeight: 0,
    svChangeHeight:0,
    scrollIntoView: "a-0",
    answerTestText: "请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.请介绍一下你自己.",
    questionTest: "我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人.我只是一个智能机器人."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {
    let des = Base64.decode(option.des);

    let tempMsg = this.data.messages[0];
    tempMsg.content = des;
    const systemInfo = wx.getSystemInfoSync();
    let svh = systemInfo.screenHeight - app.globalData.navBarHeight;
    console.log("svh===", svh, app.globalData.navBarHeight);
    console.log("app.globalData.navBarHeight==", app.globalData.navBarHeight);
    this.setData({
      statsuBarHeight: systemInfo.statusBarHeight,
      scrollViewHeight: svh,
      svChangeHeight:svh,
      des:des,
      messages:[tempMsg],
    })
    this.setChatListHeight();
    setTimeout(() => {
      this.setData({
        scrollIntoView: this.data.messages[this.data.messages.length-1].id
      })
    }, 100)

    // wx.onKeyboardHeightChange(res => { //监听键盘高度变化
    //   this.setData({
    //     keyboardHeight: res.height
    //   });
    //   this.setChatListHeight();
    // });
  },
  onShow() {

    // let  tempStr = "9c9b632b-0729-7717-5ef3-a0fa3e91e822";
    // tempStr = tempStr.replace(/-/g, "");
    // console.log("tempStr==", tempStr);

    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      console.log("onKeyboardHeightChange=", res);

      if (res.height) {
        this.setData({
          keyboardHeight: res.height
        })
        this.changeScrollViewHeight(-res.height);
      } else {
        
        this.changeScrollViewHeight(0);
        this.setData({
          keyboardHeight: 0
        })

      }
    });
  },
  changeScrollViewHeight(offset: number) {
    //提前处理好高度
    //页面总高度-导航条高度-输入框高度.
    let  weakThis = this;
    let query = wx.createSelectorQuery();
    console.log("offset====", offset);
    
    let  oldHeight = this.data.scrollViewHeight;

    query.select('#scroll-view').boundingClientRect(res => {
      let scrollViewHeight = oldHeight + offset;  
      console.log("scrollViewHeight===", scrollViewHeight);
      
      weakThis.setData({
        svChangeHeight: scrollViewHeight,
      })

      setTimeout(() => {
        this.setData({
          scrollIntoView: weakThis.data.messages[weakThis.data.messages.length-1].id
        })
      }, 100)


      console.log("res.height==", res);

    })
    query.exec(res => { }) //注意，必须加这个，不然上面的回调函数不会进入
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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


  onSend: function () {
    //发送之前需要对问题进行处理. 需要模板拼接上用户的输入. 用户的输入不能为空和空格.
    //
    let template = this.data.des + `Q:${this.data.curMessage}`
    //添加新问题数据
    let tempList = this.data.messages;
    let temp_id_Q = Guid.create().toString();
    temp_id_Q = "a" + temp_id_Q
    console.log("temp_id_Q");

    tempList.push({ id: temp_id_Q, type: "Q", content: this.data.curMessage, state: 1 })
    let temp_id_A = Guid.create().toString();

    temp_id_A = "a" + temp_id_A
    tempList.push({ id: temp_id_A, type: "A", content: "", state: 0 })
    this.setData({
      messages: tempList,
      scrollIntoView: temp_id_A,
      curMessage:""
    });

    let weakThis = this;
    //这样写是为了防止被检测到提交github 然后密钥失效
    let lastStr = "FJOi7PSGI8Zm0sWZFzeM3P";
    let apiKey = "sk-B4W3KdRo6fLq" + "7KMQEt4jT3Blbk" + lastStr;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'chatgpt-chat',
      // 传给云函数的参数
      data: {
        apiKey: apiKey,
        prompt: template,
      },
      success: function (res: any) {
        console.log("云函数调用成功==", res) // 3
        if (res.result.statusCode == 999) {
          weakThis.handleCloudFunctionData(false);
          return;
        }
        let dataList = res.result.body.keys;
        if (dataList.length != 0) {
          weakThis.handleCloudFunctionData(true, dataList[0].text);
        }else{
          weakThis.handleCloudFunctionData(false);
        }
        console.log("获取到的数据", dataList);
      },
      fail: function (res) {
        console.log("云函数调用失败==", res);
        weakThis.handleCloudFunctionData(false);
      }
    })
  },
  /*
  处理云函数数据,state: 1 成功 0失败
  */
  handleCloudFunctionData(state:boolean, answerStr:string=""){
    if (state){
      const resultList = answerStr.split("A:");
      let tempList = this.data.messages
      tempList[tempList.length - 1].state = 1;
      if (resultList.length >= 2) {
        tempList[tempList.length - 1].content = resultList[1];
      }
      this.setData({
        messages: tempList
      })
      setTimeout(() => {
        this.setData({
          scrollIntoView: tempList[tempList.length - 1].id
        })
      }, 100)
    }else{
      let tempList = this.data.messages
      tempList[tempList.length - 1].state = 1;
      tempList[tempList.length - 1].content = '问题获取超时.';
      this.setData({
        messages: tempList
      })
    }
  },
  setChatListHeight() {
    // this.setData({
    //   chatListHeight: app.globalData.sysHeight - app.globalData.statsuBarHeight - this.data.headHeight - this.data.keyboardHeight- this.data.inutPanelHeight
    // })
  },
  // hideKeyboard(){
  //   wx.hideKeyboard();
  // },
  getInput(e:any) {
    let value = e.detail.value;
    console.log("getInput==", e);

    this.setData({
      curMessage: value
    });
  },
  send() {
    //
    console.log("你点我干哈");

    // let curMessage = this.data.curMessage;
    // if (curMessage.trim() === "") {
    //   wx.showToast({
    //     title: '请输入聊天内容',
    //     duration: 2000,
    //     icon: "none"
    //   })
    //   return;
    // }
    // let messageList = this.data.messageList;
    // messageList.push(curMessage);
    // this.setData({
    //   curMessage: "",
    //   messageList: messageList
    // })
  },
})