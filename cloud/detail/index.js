// 云函数入口文件
const cloud = require('wx-server-sdk')
const request  = require('superagent')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let data
  const access_token='xxxxxx' // 修改成自己的
  try{
    let url = `https://gitee.com/api/v5/repos/sayid760/fe-daily-question/issues/${event.id}?access_token=${access_token}`
    let commitUrl = `https://gitee.com/api/v5/repos/sayid760/fe-daily-question/issues/${event.id}/comments?access_token=${access_token}`
    // 获取问题信息
    const result = await request.get(url)
    // 获取问题答案
    const commitRes = await request.get(commitUrl)

    let resArr=[]
    if(commitRes.status == 200){
        commitRes.body.forEach(item => {
            resArr.push({'user':item.user.login, 'commit': item.body})  
        })
    }
    data = {
      title: result.body.title,
      content: result.body.body,
      commit: resArr[0]
    }
  }catch(err){
    console.log('err', err)
  }
  return {
    data: data,
  }
}