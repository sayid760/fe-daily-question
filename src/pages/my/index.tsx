import React, { FC, useState, useEffect, useCallback } from 'react'
import { View, Text, Navigator, OpenData } from '@tarojs/components'
import { AtAvatar, AtIcon, AtList, AtListItem, AtToast  } from "taro-ui";
import('./index.scss')

const Home:FC=(props)=>{
  const [isOpened, setIsOpened] = useState(false)

  useEffect(()=>{
    
  }, [])

  const handleClick=()=>{
    setIsOpened(true)
    setTimeout(()=>{
      setIsOpened(false)
    }, 1000)
  }

  return (
    <View className='my-container'>
      <AtToast isOpened={isOpened} text="开发中，即将开放..."></AtToast>
      <View className='my-banner'>
        <View className='user-info'>
          <AtAvatar
            className="avatar"
            size="large"
            circle
            openData={{ type: "userAvatarUrl" }}
          ></AtAvatar>  
          <OpenData className="nickname" type="userNickName"></OpenData>
        {/* <OpenData type='userAvatarUrl'/> */}
        </View>
        <View className='user-box'>
          <Text className='item' onClick={handleClick}><AtIcon value='map-pin' size='20' color='#76569a'></AtIcon> 每日打卡</Text>
          <Text className='line'></Text>
          <Text className='item' onClick={handleClick}><AtIcon value='lightning-bolt' size='20' color='#76569a'></AtIcon> 排行榜</Text>
        </View>
        <View className='bg-radius'></View>
      </View>
      <AtList className='my-list'>
        <AtListItem
          title='收藏'
          arrow='right'
          thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          onClick={handleClick}
        />
         <AtListItem
          title='学习提醒'
          arrow='right'
          thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
          onClick={handleClick}
        />
      </AtList>
    </View>
  )
}
export default Home

