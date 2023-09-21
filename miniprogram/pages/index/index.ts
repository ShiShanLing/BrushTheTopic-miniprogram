// index.ts
// 获取应用实例

import { Topic, TopicType } from "../service/default-datas";
import { AppSercive } from "../service/sercive";
import { dateFormat, dateStrFormatTimestamp } from "../tools/general-tools";
const globalApp = getApp()

/*
需要添加的功能
学习类型和 已学习题目数据绑定.
添加学习类型.
*/

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    navBarHeight: 0,
    menuRight: 0,
    menuTop: 0,
    menuHeight: 0,
    laernDays:-1,//默认给个-1
    menuOption: [] as TopicType[],
    menuValue: "",
    totalNum : 0,
    skilledNum : 0,
    unskilledNum : 0,
    touchstart:0,
    touchend:0,
    isShowChatGPT:false

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  //
  onLoad() {
    let weakThis = this;
    var topicType:TopicType[] = require('../service/default-datas').topicType;

    let menuValue = "";

    let str = "PMGEP";
    for(let i = 0; i<str.length;i++ ){

    }

    try {
      //如果存储过 那么就取出来
      menuValue = wx.getStorageSync("currentLearnType")
    } catch (error) {
      
    }
    topicType = [{text: "All",value: "",}].concat(topicType);
  
    // console.log("onLoad-topicType==", topicType);
    this.setData({
      navBarHeight: globalApp.globalData.navBarHeight,
      menuRight: globalApp.globalData.menuRight,
      menuTop: globalApp.globalData.menuTop,
      menuHeight: globalApp.globalData.menuHeight,
      menuOption:topicType,
      menuValue:menuValue,
    })
    
    
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    // console.log("onShow");
    this.handleData();
    // console.log("handleData");
  },
  handleData(){
    let weakThis = this;
    try {
      let datas: Topic[] = wx.getStorageSync('topic')
      AppSercive.GlobalTopics = datas;
      var learnedDays:{numDays:number, date:number} = wx.getStorageSync("learnedDays");
      // console.log("learnedDays==", learnedDays);
      // console.log("learnedDays-typeof==", (typeof learnedDays));
      
      //处理学习时间
      handleLearnedDate(learnedDays);
      //处理学习的内容
      handleLearnedContent(datas);
    } catch {
      
    }
    //处理学习时间
    function handleLearnedDate(learnedDays:{numDays:number, date:number}){

      if (learnedDays != null ){
        //计算两个时间的时间差.把两个时间转成 number相减 > 0就算新的一天
        let nowTime = new Date(learnedDays.date);
        let oldDateStr = dateFormat(nowTime, "YY-MM-DD")
        let newDateStr = dateFormat(new Date(), "YY-MM-DD")
        oldDateStr = oldDateStr.replace(/-/g, '')
        newDateStr = newDateStr.replace(/-/g, '')
        // console.log("oldDateStr-", oldDateStr, "newDateStr-", newDateStr);
        let oldDateNum = Number(oldDateStr);
        let newDateNum = Number(newDateStr);
        // console.log("oldDateNum-", oldDateNum, "newDateNum-", newDateNum);
        if (newDateNum > oldDateNum){
          //需要计算时间是不是新的一天.然后 numDays + 1
          learnedDays.numDays += 1;
          learnedDays.date = dateStrFormatTimestamp(newDateStr);
          wx.setStorageSync("learnedDays", learnedDays);
          //在这里刷新数据
          weakThis.setData({
            laernDays:learnedDays.numDays
          });
        }
        
      }else{
        let funTest = dateFormat(new Date, "YY-MM-DD")
        let timestamp = dateStrFormatTimestamp(funTest)
        wx.setStorageSync("learnedDays", {numDays:1, date:timestamp});
        weakThis.setData({
          laernDays:1
        });
      }
    }
    //根据学习类型筛选出实际学习题目的数量
    function handleLearnedContent(datas: Topic[]){
      let topicType = weakThis.data.menuValue;
        let newTopic = datas.filter((topic)=>{
          return (topic.topicType == topicType);
        });
        let totalNum = 0;
        let skilledNum = 0;
        let unskilledNum = 0;
        //学习水平 0 没学过,1已学习,2忘记答案
        newTopic.map((topic)=>{
          if(topic.levelLearning != 0){
            totalNum += 1;
          }
          if(topic.levelLearning == 1){
            skilledNum += 1;
          }
          if (topic.levelLearning == 2){
            unskilledNum += 1;
          }
        });
        // console.log(`totalNum==${totalNum} \n skilledNum==${skilledNum} \n unskilledNum==${unskilledNum}`);
        weakThis.setData({
          totalNum:totalNum,
          skilledNum:skilledNum,
          unskilledNum:unskilledNum

        })
  
    }

  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  pushToAddPage(){
    // wx.navigateTo({
    //   url:"../add/add"
    // })
    wx.navigateTo({
      url:`../test-page/test-page`
    })
  },
  //云开发页面
  pushToCloudDevelopPage(){
    wx.navigateTo({
      url:`../../pages-chatgpt/cloud-develop/index`
    })
  },
  //ChatGPT页面
  pushToChatGPTPage(){
    wx.navigateTo({
      url:`../../pages-chatgpt/chat-gpt/index`
    })
  },
  //搜索页面
  pushToSearchPage(){
    wx.navigateTo({
      url:`../search/search`
    })
  },
  //答题页面
  pushToAnswerPage(){
    console.log("pushToAnswerPage", this.data.menuValue);
    wx.navigateTo({
      url:`../answer/answer?type=${this.data.menuValue}`
    })
  },
  onDropdownItemChange(ev: any){
    console.log("onDropdownItemChange==", ev.detail)
    this.setData({
      menuValue:ev.detail
    })
    this.handleData();
    wx.setStorageSync("currentLearnType", ev.detail)
  },
  searchTouchstart(e:any){
    this.setData({
      touchstart:e.timeStamp
    })
  },
  searchTouchend(e:any){

    let touchend = e.timeStamp;
    if((touchend-this.data.touchstart)>=2000){  /*长按三秒*/
      this.setData({
        touchstart:0,
        isShowChatGPT:true
      })
    }

  }

})
