// pages/answer/sub-pages/check-answer/index.ts
//检查答案页面
/*
如果是查看答案 需要展示现答案和原答案

如果是忘记答案 则只需要展示原答案
*/

import { Topic } from "miniprogram/pages/service/default-datas";

// import { Topic } from "miniprogram/pages/assets/default-datas";

// interface SearchDataTwo {
//   topicType: string,
//   topic: Topic[]
// }


Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*
    页面类型
    提交答案
    查看答案
    如果是提交答案 需要看是语音答题还是文字答题 把两者控制在一个屏幕之内.使用edit限制编写
    */
    isForgetAnswer: false,
    isVoiceAnswer: false,
    topic: null,
    voiceAnswer: {
      /** 录音总时长，单位：ms */
      duration: Number,
      /** 录音文件大小，单位：Byte */
      fileSize: Number,
      /** 录音文件的临时路径 (本地路径) */
      tempFilePath: String
    },
    textAnswer: "<p>当 _UIApplicationHandleEventQueue() 识别了一个手势时，其首先会调用 Cancel 将当前的 touchesBegin/Move/End 系列回调打断。随后系统将对应的 UIGestureRecognizer 标记为待处理。</p><p>苹果注册了一个 Observer 监测 BeforeWaiting (Loop即将进入休眠) 事件，这个 Observer 的回调函数是 _UIGestureRecognizerUpdateObserver()，其内部会获取所有刚被标记为待处理的 GestureRecognizer，并执行GestureRecognizer 的回调。</p><p>当有 UIGestureRecognizer 的变化(创建/销毁/状态改变)时，这个回调都会进行相应处理。</p>",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {

    console.log("option===", option);

    console.log("before- option.topic===", option.topic);
    
    let topic = JSON.parse(option.topic) as Topic;
    console.log("topic===123321", topic);

    let voiceAnswer:any;
    if (option.voiceAnswer != undefined) {
      voiceAnswer = JSON.parse(option.voiceAnswer)
      this.setData({
        voiceAnswer:voiceAnswer
      })
    }
    console.log("option.voiceAnswer==", option.voiceAnswer);
    this.setData({
      isVoiceAnswer: option.isVoiceAnswer,
      topic: topic,
      textAnswer: option.textAnswer,
      isForgetAnswer: option.isForgetAnswer,
    })



    
    

    // console.log("option====", option);
    // this.data.isVoiceAnswer = option.isVoiceAnswer;
    // this.data.topic = JSON.parse(option.topic) as Topic;
    // this.data.textAnswer = option.textAnswer;
    // this.data.voiceAnswer = JSON.parse(option.voiceAnswer);
    // this.data.isForgetAnswer = option.isForgetAnswer;
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
  onEditorReady() {
    //
    let weakThis = this;
    //用户的回答
    wx.createSelectorQuery().select('#editor').context(function (res) {
      res.context.setContents({
        html: weakThis.data.textAnswer
      });
    }).exec()
    if (weakThis.data.topic != null) {
      wx.createSelectorQuery().select('#referAnswerEditor').context(function (res) {
        res.context.setContents({
          html: weakThis.data.topic.topicAnswer
        });
      }).exec()
    }
  
  },
  //下一题
  nextAnswer() {
    // wx.navigateTo({url:'miniprogram/pages/answer/answer'});
    console.log("nextAnswer");


    wx.redirectTo({
      url: '/pages/answer/answer',
    })

    // wx.navigateTo({
    //   url:"/pages/answer/answer"
    // });
  }

  // wx.navigateTo({
  //   url:"../add/add"
  // })

})