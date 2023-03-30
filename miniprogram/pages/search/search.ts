
import { TopicType, Topic } from "../service/default-datas"

interface SearchData {
  topicType: string,
  topic: Topic[]
}


// pages/search.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active1: [0, 1, 2],
    indexList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    indexListStr: [''],//, "Swift","TS"
    searchValue:"",
    allTopic: [] as Topic[],
    dataSource: [] as SearchData[],
    topicTypes: [] as TopicType[],
    rawData: [] as Topic[],
    realTimeTimer: null,//实时搜索timer
    menuOption: [] as TopicType[],
    menuValue: "",

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    try {
      let topicType: TopicType[] = require('../service/default-datas').topicType;
      let allType: TopicType[] = [{ text: 'All', value: "All" }];
      topicType = allType.concat(topicType)

      console.log("onLoad===>", topicType);

      this.setData({
        topicTypes: topicType,
        menuOption: topicType,
        menuValue: topicType[0].value

      })
    } catch (error) {

    }
    try {
      let datas: Topic[] = wx.getStorageSync('topic')
      this.setData({
        allTopic:datas
      })
      this.topicDataClassify(datas);

      
    } catch (error) {
      let datas: Topic[] = require('../service/default-datas').dataJson
      this.topicDataClassify(datas);

    }
  },
  //给数据分类
  topicDataClassify(datas: Topic[]) {

    //先for循环创建对象  按首字母排序暂时不做--
    let topicDatas: SearchData[] = [];
    /*
    创建对象
    {
      OC:[],
      Swift:[]
    }
    */
    this.data.topicTypes.forEach((type) => {
      topicDatas.push({ topicType: type.text, topic: [] })
    })

    /*
    给对象数组分类/赋值
    */
    datas.forEach((topic) => {
      topicDatas.forEach((objc) => {
        if (topic.topicType == objc.topicType) {
          console.log("进来了?");
          objc.topic.push(topic);
        }
      })
    });
    //筛选掉空数组
    topicDatas = topicDatas.filter((topic) => {
      return topic.topic.length != 0;
    })

    let indexListStr = ["搜索"];
    topicDatas.forEach((topic) => {
      indexListStr.push(topic.topicType)
    });

    this.setData({
      indexListStr: indexListStr,
      dataSource: topicDatas
    })
    //初始化右边栏

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
  //点击了搜索
  onSearch() {
    console.log("点击了搜索");
  },
  //搜索框内容发生变化
  onSearchValueChange(ev: any) {
    console.log("搜索框内容发生了变化", ev.detail)
    if (ev.detail == ""){

      this.setData({
        searchValue:""
      })
      this.onTopicFilter();
      return;
    }
    
    //延迟执行,在第二个延迟开始的时候取消第一个.
    let weakThis = this;
    let realTimeSearch = {
      delayQuery: () => {
        if (weakThis.data.realTimeTimer != null) {
          console.log("取消倒计时");
          clearTimeout(weakThis.data.realTimeTimer),
            weakThis.data.realTimeTimer = null
        };
        this.data.realTimeTimer = setTimeout(() => {
          console.log('开始搜索');
          realTimeSearch.onStartQuery();
        }, 800)
        console.log("赋值后查询数据==>", this.data.realTimeTimer);
      },
      onStartQuery: () => {
        weakThis.setData({
          searchValue:ev.detail
        })
        console.log("187--", weakThis.data.searchValue);
        this.onTopicFilter();
      }
    };
    
    realTimeSearch.delayQuery();
  },
  /*
  整理一下逻辑
  更改类型和搜索框之后都要刷新页面,搜索是两个条件都要加上.
  */
  onDropdownItemChange({ detail }) {

    console.log("onDropdownItemChange==", detail);
    this.setData({
      menuValue: detail
    })
    console.log("onDropdownItemChange==", this.data.menuValue);
    this.onTopicFilter();
  },
  /*题目筛选*/
  onTopicFilter() {

    //类型筛选
    let datas: Topic[] = this.data.allTopic;
    let newDatas: Topic[] = [];
    if (this.data.menuValue == "All") {
      newDatas = datas;
    } else {
      newDatas = datas.filter((topic) => {
        return (topic.topicType == this.data.menuValue);
      })
    };
    
    //关键字筛选
    newDatas = newDatas.filter((topic) => {
      let regex = new RegExp(`${this.data.searchValue}`);
      return (topic.topicTitle.search(regex) != -1);
    })
    console.log("newDatas===", newDatas.length, "-----", newDatas);

    this.topicDataClassify(newDatas);

  },


  pageEventListener: function (params: any) {
    console.log("pageEventListener");
    console.log(this.data.dataSourceTemp);
  }



})