/* eslint-disable jsx-quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect, useCallback } from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'

const List:FC=(props:any)=>{
  let { label } = getCurrentInstance().router.params

  const [listData, setListData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async (alabel:any, pageNumber:number) =>{

    Taro.showLoading({
      title: '加载中',
    })
    

    const res:any = await Taro.cloud.callFunction({
      name: 'list',
        data: {
          alabel,
          pageNumber,
        }
      })
      // {
      //   list:[]  
      //   total 总数
      //   totalPage 当前数量
      // }
      
    const {list, total, totalPage} = res.result.data
    
    // console.log('10 > data.length', 10 > list.length)
    // 如果 数据小于10条 或者 当前页大于总页数
    if( 10 > list.length || currentPage > parseInt(totalPage)) {
      setListData([...listData, ...list] as any);
      setHasMore(false)
      Taro.hideLoading()
			return false
		}

    setTimeout(() => {
			setListData([...listData, ...list] as any);
			setCurrentPage(currentPage+1)
      Taro.hideLoading()
		}, 500);
  }

  useEffect(()=>{
    loadMore(label, 1)
  }, [])

  const goDetail = useCallback((item:any) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${item.id}`
    })
  }, [])

  const onScroll =(e:any) =>{
    // console.log(e.detail)
  }

  const scrollTop = 0
  const Threshold = 20

  const onScrollToLower=(event: any)=>{
    if(hasMore) loadMore(label, currentPage)
  }

  return (
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToLower={onScrollToLower}
        onScroll={onScroll}
      >
        <View className='list-container'>
          { listData.length > 0 ?
            listData.map((item:any)=>(
              <View className="item" key={item.id} onClick={()=>goDetail(item)}>
                <Text className="title"> {item.title}</Text>
                {item.content.trim()? <Text  className='desc'> {item.content.trim()}</Text>:''}
              </View>
            )): <Text className='empty'>暂无数据~~</Text>
          }
          {listData.length > 0 && !hasMore? <Text className='empty'>暂无更多~~</Text>:''}
        </View>
    </ScrollView>
  )
}

export default List

