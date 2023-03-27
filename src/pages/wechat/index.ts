// // const WorkWechat = require('node-work-wechat')
// import type { APIRoute } from "astro"
// import WorkWechat from 'node-work-wechat'

// const config = {
//   token: 'xxxxxx', // 随机数，用于消息服务器验证
//   encodingAESKey: 'xxxxxx', // 消息加密密钥
//   corpid: 'wxe20e1a873ad6ccc1', // 公司ID
//   secret: '4iY3hsBL7uHZfeMkOxig3rs90k5xBAlj0uwfS9iEvLs', // 应用密钥
//   agentid: 1000158, // 应用ID
//   touser: 'KD016103', // userID
// }

// export const get: APIRoute = async () => {
//   try {
//     const wxcpt = new WorkWechat(config)
//     wxcpt.updateToken()
//     return new Response('刷新token成功')
//   } catch (e) {
//     console.log(`运行错误\n${String(e)}`)
//   }
//   return new Response(`ok`)
// }
