// pages/add/add.ts

import { TopicType } from "../service/default-datas";
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

import { Topic } from "../assets/default-datas";


Page(
  {
  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    topic:"",//题目
    answer:"",//答案

    menuOption: [] as TopicType[],
    menuValue: "",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let topicType:TopicType[] = require('../service/default-datas').topicType;

    console.log("topicTyp===", topicType);
    this.setData({
      menuOption:topicType,
      menuValue:topicType[0].value
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
  /*
  返回上个页面
  */
  goBack(){
    wx.navigateBack();
  },
  /*
  题目change
  */
 onTopicChange(event:any){
  console.log(event.detail);
  this.setData({
    topic:event.detail
  })
 },
 /*
 答案change
 */
  onAnswerChange(event:any){
      console.log(event.detail);
      this.setData({
        answer:event.detail
      })
  },
  onDropdownItemChange({detail}){
    console.log("onDropdownItemChange==", detail);
    this.setData({
      menuValue:detail
    })
  },
  /*
  点击提交保存数据,然后清空页面.
  */
 onSubmit(){

    if (this.data.topic.length == 0 && this.data.answer.length == 0){
      Dialog.alert({
        title: '温馨提示',
        message: '题目和答案都不能为空呦!',
      }).then(() => {
        // on close
      });
      return;
    }


    let funcObjc = {
      getCache:():Topic[]=>{
        try {
          let datas: Topic[] = wx.getStorageSync('topic');
          return datas;
        } catch (error) {
          Toast.fail('数据存储失败.');
          return [];
        }
      },
      dataStorage:(datas:Topic[])=>{
        console.log("999");
        try {
          wx.setStorageSync("topic", datas);
          console.log("888");
          Toast.success('存储成功');
          this.setData({
            answer:'',
            topic:'',
          })
        } catch (error) {
          Toast.fail('数据存储失败.');
        }
      },

    }
  

    let tempTopic:Topic = {
      topicType:this.data.menuValue,
      learnNum:0,
      levelLearning:0,
      topicTitle:this.data.topic,
      topicAnswer:this.data.answer,
    }

    console.log("tempTopic==", tempTopic);
    
    let datas = funcObjc.getCache();
    console.log("datas===", datas);
    
    let repet = datas.filter((topic)=>{
      return topic.topicTitle == tempTopic.topicTitle;
    })
    if (repet.length != 0){
      Dialog.alert({
        title: '温馨提示',
        message: '题目重复',
      }).then(() => {
        // on close
      });
      return;
    }
    datas.push(tempTopic);
    funcObjc.dataStorage(datas);
    console.log("topic===", this.data.topic);
    console.log("answer===", this.data.answer);
 }



})