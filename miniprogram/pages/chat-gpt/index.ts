// pages/ChatGPT/index.ts

// import { OpenAIApi, Configuration } from "../../miniprogram_npm/openai/index"
// import {OpenAIApi, Configuration} from "../../../node_modules/openai/index"

// 导入 OpenAI SDK
// const openai = require('openai');

interface Item{
  title:string,
  image:string,
  id:number
}

// // 配置 API 密钥和模型 ID
// openai.api_key = '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';
const model_id = 'text-davinci-003';
const api_key = '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';

// 定义生成请求的参数
const prompt = '周杰伦是谁';
const temperature = 0.5;
const max_tokens = 2000;


// 构造 API 请求的 body 参数
const data = {
  prompt,
  temperature,
  max_tokens,
  model: model_id,
};

// 构造 API 请求的 header 参数
const headers = {
  Authorization: `Bearer ${api_key}`,
  'Content-Type': 'application/json',
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[{title:"聊天", image:"../assets/chatgpt-chat.png", id:0}, 
    {title:"聊天1", image:"../assets/chatgpt-chat.png", id:1}, 
    {title:"聊天2", image:"../assets/chatgpt-chat.png", id:2}, 
    {title:"聊天3", image:"../assets/chatgpt-chat.png", id:3}, 
    {title:"聊天4", image:"../assets/chatgpt-chat.png", id:4}, 
    {title:"聊天5", image:"../assets/chatgpt-chat.png", id:5}, 
    {title:"聊天6", image:"../assets/chatgpt-chat.png", id:6}, 
    {title:"聊天7", image:"../assets/chatgpt-chat.png", id:7}, 
    {title:"聊天8", image:"../assets/chatgpt-chat.png", id:8}, 
    {title:"聊天9", image:"../assets/chatgpt-chat.png", id:9}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
  goBack() {
    console.log("---------");
    wx.navigateBack();

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  pushToNewPage(event:any){
    let item_id:string = event.currentTarget.dataset.item_id ?? "";
    console.log("item_id==", item_id);
    wx.navigateTo({url:"./chat/index"})
  }
})