/* eslint-disable jsx-quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useCallback } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import towxml from '@src/componnets/towxml'
import '@src/componnets/towxml/parse/highlight/style/github.wxss'
import '@src/componnets/towxml/parse/highlight/style/monokai.wxss'

const List:FC=(props)=>{
  let { id } = getCurrentInstance().router.params

  const [data, setData] = useState({
    title:'',
    content:'',
    commit:'',
    user:''
  })

  const getDatas = async() =>{
    Taro.showLoading({
      title: '加载中',
    })
    
    const res1:any = await Taro.cloud.callFunction({
      name: 'detail',
        data: {
          id
        }
      })

    const {title, content, commit} = res1.result.data

    // console.log('res1', res1.result.data)
    // {title:'', content:'', commit:{user:'', commit:''}}

    // 将markdown内容转换为towxml数据
    let data:any = null
    if(commit && commit.commit){
      data = towxml(commit.commit,'markdown')
      data.theme = 'dark'
    }

    setData({
      title: title,
      content: content,
      commit: data?data:null,
      user:''
    })

    setTimeout(() => {
      Taro.hideLoading()
		}, 500);
  
  }

  useEffect(()=>{
    getDatas()
  }, [])

  return (
    <View className="detail-container">
      <View className="top">
        <Text className="title">{data.title}</Text>
        {data.content}
      </View>

      <View className="answer">
        <Text className="title">参考答案</Text>
        <Text >{data.user}</Text>
       {data.commit? 
       <cptowxml nodes={data.commit} />
      //  <Text className="cont">{data.commit}</Text> 
       : <View className="empty" > 暂无内容 </View>} 
        
      </View>
    </View>
  )
}
export default List

