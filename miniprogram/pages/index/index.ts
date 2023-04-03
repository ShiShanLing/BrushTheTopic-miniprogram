// index.ts
// 获取应用实例

import { Topic, TopicType } from "../service/default-datas";
import { AppSercive } from "../service/sercive";
import { dateFormat, dateStrFormatTimestamp } from "../tools/general-tools";


const globalApp = getApp()



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

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {


    var topicType:TopicType[] = require('../service/default-datas').topicType;

    let menuValue = "";

    try {
      //如果存储过 那么就取出来
      menuValue = wx.getStorageSync("currentLearnType")
    } catch (error) {
      
    }
    topicType = [{text: "All",value: "",}].concat(topicType);
  
    console.log("onLoad-topicType==", topicType);
    this.setData({
      navBarHeight: globalApp.globalData.navBarHeight,
      menuRight: globalApp.globalData.menuRight,
      menuTop: globalApp.globalData.menuTop,
      menuHeight: globalApp.globalData.menuHeight,
      menuOption:topicType,
      menuValue:menuValue,
    })
    this.handleData();
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  handleData(){
    try {
      let datas: Topic[] = wx.getStorageSync('topic')
      AppSercive.GlobalTopics = datas;
      console.log("AppSercive.GlobalTopics==", AppSercive.GlobalTopics);
      console.log("datas===", datas);
      var learnedDays:{numDays:number, date:number} = wx.getStorageSync("learnedDays");
      console.log("learnedDays==", learnedDays);
      //处理学习时间
      handleLearnedDate(learnedDays);
    } catch {

    }
    //处理学习时间
    function handleLearnedDate(learnedDays:{numDays:number, date:number}){
      if (learnedDays != null){
        //计算两个时间的时间差.把两个时间转成 number相减 > 0就算新的一天
        let nowTime = new Date(learnedDays.date);
        let oldDateStr = dateFormat(nowTime, "YY-MM-DD")
        let newDateStr = dateFormat(new Date(), "YY-MM-DD")
        oldDateStr = oldDateStr.replace(/-/g, '')
        newDateStr = newDateStr.replace(/-/g, '')
        console.log("oldDateStr-", oldDateStr, "newDateStr-", newDateStr);
        let oldDateNum = Number(oldDateStr);
        let newDateNum = Number(newDateStr);
        console.log("oldDateNum-", oldDateNum, "newDateNum-", newDateNum);
        if (newDateNum > oldDateNum){
          //需要计算时间是不是新的一天.然后 numDays + 1
          learnedDays.numDays += 1;
          learnedDays.date = dateStrFormatTimestamp(newDateStr);
          wx.setStorageSync("learnedDays", learnedDays);
          //在这里刷新数据
          // this.setData({
          //   laernDays:learnedDays.numDays
          // });
        }
        
      }else{
        let funTest = dateFormat(new Date, "YY-MM-DD")
        let timestamp = dateStrFormatTimestamp(funTest)
        wx.setStorageSync("learnedDays", {numDays:1, date:timestamp});
        // this.setData({
        //   laernDays:1
        // });
      }
    }

  },
  //
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
    wx.navigateTo({
      url:"../add/add"
    })
  },
  pushToSearchPage(){
    wx.navigateTo({
      url:`../search/search`
    })
  },
  pushToAnswerPage(){
    wx.navigateTo({
      url:`../answer/answer?type=${this.data.menuValue}`
    })
  },
  onDropdownItemChange(ev: any){
    console.log("onDropdownItemChange==", ev.detail)
    this.setData({
      menuValue:ev.detail
    })
    wx.setStorageSync("currentLearnType", ev.detail)
  },

})
