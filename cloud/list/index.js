// 云函数入口文件
const cloud = require('wx-server-sdk')
const request  = require('superagent')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let data
  const access_token='xxxxxx' // 修改成自己的
  try{
    // 根据label获取列表
    let url = `https://gitee.com/api/v5/repos/sayid760/fe-daily-question/issues?access_token=${access_token}&labels=${event.alabel}&page=${event.pageNumber}&per_page=20`
    const result = await request.get(url)
    let resArr=[]
    if(result.status == 200){
      result.body.forEach((item)=>{
          resArr.push({
              id: item.number,
              title: item.title,
              content: item.body,
              labelsName: event.alabel
          })
      })
    }
    data = {
      list:resArr, 
      "total": result.headers.total_count,
      "totalPage": result.headers.total_page,
    }
  }catch(err){
    console.log('err', err)
  }
  return {
    data: data,
  }
}