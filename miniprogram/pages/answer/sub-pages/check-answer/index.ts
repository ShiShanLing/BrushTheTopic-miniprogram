// pages/answer/sub-pages/check-answer/index.ts
//检查答案页面
/*
如果是查看答案 需要展示现答案和原答案

如果是忘记答案 则只需要展示原答案
*/

import { Topic } from "miniprogram/pages/service/default-datas";
import { Base64 } from "../../../../pages/tools/general-tools";
import { AppSercive } from "../../../../pages/service/sercive";

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
    textAnswer: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {
    



  console.log(option);
  
    // 

    console.log("截止后option====", option);
    let objc:{topic_id:string, isForgetAnswer:string} = option
    console.log("option.topicid", objc.topic_id);
    
    let isForgetAnswer = option.isForgetAnswer;
    console.log("修改之前isForgetAnswer", isForgetAnswer);
    console.log(typeof isForgetAnswer);
    let decodeTopic = option.topic_id;
    console.log("option.topic==", decodeTopic);

    let topic:Topic|undefined = undefined;

    AppSercive.GlobalTopics.forEach(element => {
      if (element.id == option.topic_id){
        topic = element;
      }
    });
    console.log("topic===123321", topic);
    let voiceAnswer:any;
    if (option.voiceAnswer != undefined) {
      voiceAnswer = Base64.decode(option.voiceAnswer)
      console.log("解密后voiceAnswer==", voiceAnswer);
      console.log("type==", (typeof voiceAnswer));
      
      // {"duration":3562.167167663574,"fileSize":316078,"tempFilePath":"wxfile://tmp_c8a13a4344b47e30383a7218d6e6ed19.wav"}
      const reg = /\s+/g;
      voiceAnswer.replace(reg, "\" ")
      voiceAnswer = JSON.parse(voiceAnswer)
      console.log("voiceAnswer===", voiceAnswer);
      this.setData({
        voiceAnswer:voiceAnswer
      })
      console.log("this.data.voiceAnswer==", this.data.voiceAnswer);
      
    }
    //
    let textAnswer = decodeURI(option.textAnswer);
    console.log("option.voiceAnswer==", option.voiceAnswer);
    this.setData({
      isVoiceAnswer: (option.isVoiceAnswer == "true"),
      topic: topic,
      textAnswer: textAnswer ?? "",
      isForgetAnswer: (isForgetAnswer == "true"),
    })
    console.log("修改之后查看",this.data.isForgetAnswer);
    



    
    

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
      if (res != null){
        res.context.setContents({
          html: weakThis.data.textAnswer
        });
      }
    }).exec()
    if (weakThis.data.topic != null) {
      wx.createSelectorQuery().select('#referAnswerEditor').context(function (res) {
        if (res){
          res.context.setContents({
            html: weakThis.data.topic.topicAnswer
          });
        }
      }).exec()
    }
  },
  //下一题
  nextAnswer() {
    wx.redirectTo({
      url: `/pages/answer/answer?type=${this.data.topic.topicType}`,
    })
  },
  goBack(){
    wx.navigateBack();
  }

})