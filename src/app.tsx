import React, { FC, Component } from 'react'
import { Provider } from 'react-redux'
import Taro from '@tarojs/taro'
import configStore from './store'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.scss'

const store = configStore()

// wx.cloud.init({
//   env:'dqtest-0gnu93rn72e208bb', // 替换环境id
//   traceUser: true //将用户访问接入到用户管理中 
// })

console.log('process.env.TARO_ENV', process.env.TARO_ENV)
if (process.env.TARO_ENV === 'weapp') {
  Taro.cloud.init({
    env:'dqtest-0gnu93rn72e208bb', // 替换环境id
    traceUser: true //将用户访问接入到用户管理中 
  })
}

const App:FC=(props)=>{
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App
