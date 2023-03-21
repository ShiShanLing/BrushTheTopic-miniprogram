// pages/search/components/search-list-cell/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topicTitle:String,
    topicAnswer:String,
    learnNum:Number,
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShowAllText:false
  },

  /**
   * 组件的方法列表
   */
  //今年虽然前段工作不好找,不过移动端相对好过了一些.不知道是不是去年疫情都去培训班了.
  methods: {
    changState:function() {
      console.log("123321", this.data.isShowAllText);
      
      this.triggerEvent('customevent', {})
      this.setData({
        isShowAllText: !this.data.isShowAllText
      })
    }
  }
})
