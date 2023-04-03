// pages/answer/answer.ts
import { Recorder } from "../components/audio-recorder/recorder";
import { Topic } from "../service/default-datas";
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
import { Light } from "XrFrame/components";
import { AppSercive } from "../service/sercive";
import { Base64 } from "../tools/general-tools";
/*
页面基本逻辑.
每次进入到这个页面都要刷新一道题
提交答案时.
必须使用了文字或者语音答题(根据在哪一个tab来判断)
提交答案,页面分为两种,语音和文字.并展示出原来答案,记录学习了一次,并且熟练
忘记答案.跳转到答案查看页面.记录学习一次,不熟练.
*/
enum RecorderState {

  standby,
  //待机状态
  working,
  //录音中
  pause,
  //已暂停
  end,
  //已结束
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
    recorderManager: null,
    recorderDuration: 0,
    timer: null,
    recorderState: RecorderState.standby,
    sliderProgress: 0,
    audioInfo: null,
    topic: null,
    answerType:0,//0语音 1文字
    textAnswer:"",//用户的text答案
    allTopic:[] as Topic[],
    learnType:""

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option:any) {
    console.log("answer-option", option);


    try {
      let datas: Topic[] = wx.getStorageSync('topic')
      
      if (option.type != null && option.type != ""){
        datas = datas.filter((topic:Topic)=>{
          return topic.topicType == option.type;
        })
        console.log("筛选过后--datas", datas);
        
      }
      
      let result = this.getRandomNum(0, datas.length - 1);
      this.setData({
        topic: datas[result],
        allTopic:datas
      })
    } catch {
      console.log("读取数据失败");
      
    }

    let weakThis = this;
    let recorderManager = new Recorder((num: number) => {
      console.log("录制时间回调---", num);
      //录制时间回调
      weakThis.setData({
        recorderDuration: num
      })
    }, (num: number) => {
      //录制状态回调
      console.log("录制状态回调");
      weakThis.setData({
        recorderState: num
      })
    }, (audioInfo:any)=>{
      //录制结束回调
      console.log("audioInfo==", audioInfo);
      weakThis.setData({
        audioInfo:audioInfo,
      })
    })
    this.setData({
      recorderManager: recorderManager,
      learnType:option.type
    })


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
  //tabs标签栏发生变化时
  tabsTap(ev:any){
    this.setData({
      answerType:ev.detail.index
    })
    console.log("tabsTap===", ev.detail.index);
  },
  //开录音
  onStartRecorder() {
    let weakThis = this;

    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        weakThis.data.recorderManager.onStartRecorder();
      }
    })
    
  },
  //结束录音
  onStopRecorder() {
    this.data.recorderManager.onStopRecorder();
  },
  //暂停录音
  onPauseRecorder() {
    this.data.recorderManager.onPauseRecorder();
  },
  //继续录音
  onResumeRecorder() {
    this.data.recorderManager.onResumeRecorder();
  },
  //文字答题时输入框变化
  textChange(ev: any) {
    console.log("textChange==", ev);
    this.setData({
      textAnswer:ev.detail.html
    })
    console.log(this.data.textAnswer);
  },

  //提交答案
  submitAnswer() {

    this.refreshTopicState(1, this.data.topic);
    let id = this.data.topic.id;
    
    let param = `isVoiceAnswer=${this.data.answerType==0}&isForgetAnswer=false&topic_id=${id}`

    if (this.data.answerType==0){
      
      if (this.data.audioInfo!=null){
        let voiceAnswer = {
          duration:(Math.round(this.data.audioInfo.duration)),
          fileSize:(Math.round(this.data.audioInfo.fileSize)),
          tempFilePath:this.data.audioInfo.tempFilePath
        }
        let voiceAnswerStr = JSON.stringify(voiceAnswer);
        
        console.log("voiceAnswerStr==", voiceAnswerStr);
        voiceAnswerStr = Base64.encode(voiceAnswerStr);
        param = param + `&voiceAnswer=${voiceAnswerStr}`
      }else{
        Dialog.alert({
          title: '温馨提示',
          message: '你还没有录制语音',
        }).then(() => {
          // on close
        });
        return;
      }  
    }else{
      if (this.data.textAnswer.length != 0){
        param = param + `&textAnswer=${this.data.textAnswer}`
      }else{
        Dialog.alert({
          title: '温馨提示',
          message: '你还没有输入答案...',
        }).then(() => {
          // on close
        });
        return;
      //文字
      }
    }
    // const reg = /\s+/g;

    let url = `./sub-pages/check-answer/index?${param}`;
    
    console.log("url转义==", url);
    wx.redirectTo({
      url: url,
    })
  },
  //忘记答案
  forgetAnswer() {
    this.refreshTopicState(2, this.data.topic);
    let param = `isForgetAnswer=true&topic_id=${this.data.topic.id}`
    let url = `./sub-pages/check-answer/index?${param}`;
    wx.redirectTo({
      url: url,
    })
  },
  goBack() {
    console.log("---------");
    wx.navigateBack();
    
  },
  getRandomNum(min: number, max: number): number {
    var Range = max - min;
    var Rand = Math.random();
    return (min + Math.round(Rand * Range));
  },
  /**
   *level 学习水平 0 没学过,1已学习,2忘记答案 
  */
  refreshTopicState(level:number, topic:Topic){
      let allTopic = this.data.allTopic;
      console.log("更改前", allTopic);
      allTopic.forEach((objc)=>{
          if (topic.topicTitle  == objc.topicTitle){
            if (level == 1){
              objc.learnNum = objc.learnNum + 1;
            }
            objc.levelLearning = level;
          }
      })
      console.log("更改后", allTopic);
      
    try {
      wx.setStorageSync('topic', allTopic);
    } catch (error) {
      
    }

    // try {
    //   let datas: Topic[] = wx.getStorageSync('topic')
    //   let result = this.getRandomNum(0, datas.length - 1);
    //   this.setData({
    //     topic: datas[result]
    //   })
    // } catch {

    // }
  }

})