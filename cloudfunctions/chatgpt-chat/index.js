// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require("axios");
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const apiUrl = "https://pydwn3hduw5znut3hw4wpdhsbm0jpseo.lambda-url.us-east-2.on.aws"

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const apiKey = event.apiKey;
  // 构造请求参数
  const prompt = event.prompt;
  let requestBody = {
    "apiKey":apiKey,
    "prompt":prompt
  }

  try {
    const response = await axios.post(apiUrl, requestBody);
    console.log("网络请求成功==", response);
    return {
      statusCode: 200,
      body: {"msg":"获取成功", "requestBody":requestBody,"keys":response},
    }
  } catch (error) {
    console.log("网络请求失败");
    return {
      statusCode: 999,
      msg:"网络请求失败",
      body: {"msg":"获取失败 ","keys":"","error":error, "requestBody":requestBody},
  };
  }

}