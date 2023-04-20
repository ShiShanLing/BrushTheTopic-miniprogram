// pages/CloudDevelop/index.ts

/*
需要做的工作.
进入App如果是新用户,更新数据库,把所有的题目都给他.
比如user-topics这个库新增
*/
Page({
  /**
   * 页面的初始数据
   */
  data: {
    db: wx.cloud.database(),
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      db: wx.cloud.database()
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
  cloudInit() {
    const db = wx.cloud.database({
      env: 'cloud1-5g2j8az1a2b084f6'
    })
    this.data.db = db;
  },
  addData() {
    let db = wx.cloud.database()
    db.collection('topics').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        topicType: "测试数据",
        //学习次数
        learnNum: 999,

        //学习水平 0 没学过,1已学习,2忘记答案
        levelLearning: 999,
        //题目
        topicTitle: "测试数据",
        //答案.
        topicAnswer: "测试数据",
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("存储成功==", res);
      },
      fail: function (error) {
        console.log("添加失败==", error);
      }
    })
  },
  deleteData() {

  },
  changeData() {
    this.data.db.collection('topics').doc('b3fcaf376437b9200017a402347b1fb5').update({
      // data 传入需要局部更新的数据
      data: {
        learnNum: 888,
        levelLearning: 888
      },
      success: function (res) {
        console.log("修改成功===", res.data)
      }
    })
  },
  queryData() {

    //
    /**
     * 获取全部数据
     * 如果需要添加条件
     db.collection('topics').where({
          topicType: 'OC',//符合这个条件的搜索出来
      })
      
     * 
    */
    this.data.db.collection('topics').where({

    }).get({
      success: function (res) {
        console.log("数据获取成功===", res.data);
      },
      fail: function (error) {
        console.log("数据获取失败===", error);
      }
    })

    // let topics = await this.data.db.collection("topics");
    // console.log("this.data.db==", this.data.db);

    // console.log("topics==", topics);
  },
  getUserInfo() {

    wx.getSetting({
      success(res) {

        console.log("getSetting===", res);

        // if (!res.authSetting['scope.record']) {
        //   wx.authorize({
        //     scope: 'scope.record',
        //     success () {
        //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        //       wx.startRecord()
        //     }
        //   })
        // }
      }
    })


    wx.authorize({
      scope: 'scope.userInfo',
      success: function () {
        console.log("用户已授权");
        wx.showToast({
          title: '用户已授权',
          mask: true
        })
      },
      fail: function () {
        console.log("用户未授权");
        wx.showToast({
          title: '用户未NO授权',
          mask: true
        })
      }
    })


    wx.getUserProfile({
      desc:"用于完善会员资料",
      success:(res)=>{
        console.log("success==", res);
        
      },
      complete: (res) => {
        console.log("complete==", res);
      },
      fail: (res) => {
        console.log("fail==", res);
      }
    });

    wx.login({
      success: function(res) {
        const code = res;
        console.log("login==", res);


      }
    })

    


    



  },


  addUser() {
    //如果是新用户
    //获取当前微信用户名称和ID
    let db = wx.cloud.database()
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: "",
        name: "",//用户的名称
        booksRead: [], //"一个数组，包含用户已经阅读的书籍的ID。
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log("存储成功==", res);
      },
      fail: function (error) {
        console.log("添加失败==", error);
      }
    })
  },
  cloudFuncAdd(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success: function(res) {
        console.log("callFunction==", res) // 3
      },
      fail: console.error
    })
  },
  cloudFuncGetOpenid(){
    
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getOpenid',
      // 传给云函数的参数
      data: {
       
      },
      success: function(res) {
        console.log("callFunction==", res) // 3
      },
      fail: console.error
    })
  },
  cloudFuncChatgpt(){
    wx.cloud.callFunction({
      // 云函数名称
      name: 'chargpt',
      // 传给云函数的参数
      data: {
       
      },
      success: function() {
        console.log("callFunction==chargpt") // 3
      },
      fail: console.error
    })
  },
  goBack(){
    wx.navigateBack();
  }

})