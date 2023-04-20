
// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境



// 云函数入口函数
// 云函数入口函数
exports.main = async (event, context) => {
  // 获取 API Key 等配置信息
  const apiKey = "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"
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'
  const model_id = 'text-davinci-003';
  // 构造请求参数
  const prompt = 'Hello, world!'
  const maxTokens = 100
  const responseFormat = 'text'
  const requestBody = {
    prompt,
    max_tokens: maxTokens,
    response_format: responseFormat,
    engine: model_id,
  }

  // 发送 HTTP 请求并处理响应结果
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: { Authorization: `Bearer ${apiKey}` }
    })
    console.log("获取成功");
    console.log(response.data.choices[0].text)
    return "成功";
  } catch (error) {
    console.log("获取失败", error);
    return "失败";
    
  }
}
