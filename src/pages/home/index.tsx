import React, { FC, useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

if(process.env.TARO_ENV === 'h5'){
  import('./index_h5.scss')
}else{
  import('./index.scss')
}

const Home:FC=(props)=>{
  const [arrList, setArrList] = useState([
     {
       title:'javascript',
       label:'javascript'
     },
     {
      title:'react',
      label:'react'
     },
     {
      title:'vue',
      label:'vue'
     },
     {
      title:'手写系列',
      label:'write'
     },
     {
      title:'性能',
      label:'performance'
     },
     {
      title:'业务/软技能',
      label:'business'
     },
     {
      title:'库',
      label:'lib'
     },
     {
      title:'功能实现',
      label:'effect'
     },
     {
      title:'构建工具',
      label:'buildTools'
     },
     {
      title:'算法',
      label:'algorithm'
     },
     {
      title:'计算机基础',
      label:'computer'
     },
     {
      title:'设计模式',
      label:'designPattern'
     },
     {
      title:'小程序',
      label:'miniPrograms'
     },
     {
      title:'移动',
      label:'mobile'
     },
     {
      title:'css',
      label:'css'
     },
     {
      title:'html',
      label:'html'
     },
     {
      title:'工程化',
      label:'engineering'
     },
     {
      title:'其它',
      label:'other'
     },
   ])

  useEffect(()=>{
    
  }, [])

  const goList = useCallback((item:any) => {
    Taro.navigateTo({
      url: `/pages/list/index?label=${item.label}`
    })
  }, [])

  return (
    <View className='home-container'>
      <View className='list'>
        {arrList.map((item:any)=>(
          <View  className='item' key={item.label} onClick={()=>goList(item)}>{item.title}</View>
        ))}
      </View>
    </View>
  )
}
export default Home

