import Taro from '@tarojs/taro'
// const baseUrl = 'http://localhost:3001/api'
const baseUrl = 'http://localhost:3001/api'
// const baseUrl = 'http://b.sayid760.fun/api'


export const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 301,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
};

interface requestProps{
  options?:(res:any)=>void
  get:(res:any)=>void
  post:(res:any)=>void
  put:(res:any)=>void
  head:(res:any)=>void
  delete:(res:any)=>void
  trace:(res:any)=>void
  connect:(res:any)=>void
}

interface requestAll{
    url?:any
    data?:any
    method?:method
    contentType?:string
}


type method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined

const requestAll=(res:requestAll)=>{
  const {url, data, method, contentType} = res
  return new Promise((reslove) => {
    Taro.request({
      url: url.indexOf('https') !== -1 ? url : baseUrl + url,
      data,
      method: method ? method:'GET',
      header: {
        'content-type': contentType?contentType:'application/json',
        cookie: Taro.getStorageSync('cookies')
      },
      success: (res) => {
        // console.log('res', res)
        // setCookie(res)
        // if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        //   reject(res)
        //   return console.log('api', '请求资源不存在')
        // } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        //   reject(res)
        //   return console.log('api', '服务端出现了问题')
        // } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        //   reject(res)
        //   return console.log('api', '没有权限访问')
        // } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
        //   Taro.clearStorage()
        //   Taro.navigateTo({
        //     url: '/pages/login/index'
        //   })
        //   return console.log('api', '请先登录')
        // } else 
        if (res.statusCode === HTTP_STATUS.SUCCESS) {
          reslove(res)
        }
      },
      fail: (err:any) => {
        console.log('api', '请求接口出现问题', err)
      }
    })
  })
}

const request = {
  get:(res:requestAll) => requestAll(Object.assign(res, { method:'GET'})),
  post:(res:requestAll) => requestAll(Object.assign(res, { method:'POST'})),
}


// const request = () =>{
//   return ['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
//     request[method] = ({ url, data, contentType = '' }) => requestAll(url, data, method as any, contentType)
//   })
// }

// const setCookie = (res) => {
//   if (res.cookies && res.cookies.length > 0) {
//     let cookies = ''
//     res.cookies.forEach((cookie, index) => {
//       // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
//       if (cookie.name && cookie.value) {
//         cookies +=
//           index === res.cookies.length - 1
//             ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}`
//             : `${cookie.name}=${cookie.value};`
//       } else {
//         cookies += `${cookie};`
//       }
//     })
//     Taro.setStorageSync('cookies', cookies)
//   }
//   if (res.header && res.header['Set-Cookie']) {
//     Taro.setStorageSync('cookies', res.header['Set-Cookie'])
//   }
// }

export default request