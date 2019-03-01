/*
 定义发送请求的模块
 */

import ajax from './ajax';
import jsonp from 'jsonp';

//公共部分
// const prefix = 'http://localhost:5000';
//webpack定义的环境变量 process.env.NODE_ENV ----development  production
const prefix  = process.env.NODE_ENV === "development" ? '':'http://localhost:5000'

//请求登录函数
export const reqLogin = (username,password) => ajax(prefix +'/login',{username,password},'POST')

//请求添加用户函数
export const reqAddLogin = user => ajax(prefix + '/manage/user/add',user,'POST')

//请求天气函数 -- 跟上面一样 返回一个promise对象
export const reqWeather = city =>{
  return new Promise((resolve,reject)=>{
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      (err,data)=>{
        if(!err){
          //请求成功
          // console.log(data.results[0].weather_data[0])
          resolve(data.results[0].weather_data[0])
        }else {
          //请求失败
          console.log('请求天气失败',err)
          reject('请求天气失败')
        }
      }
    )
  })
}

//请求列表数据函数
export const reqCategories = parentId => ajax(prefix + '/manage/category/list',{parentId})

//请求添加分类数据函数
export const reqAddCategory = (parentId,categoryName) => ajax(prefix +'/manage/category/add',{parentId,categoryName},'POST')

//请求修改分类数据函数
export const reqUpdateCategoryName = (categoryId,categoryName) => ajax(prefix + '/manage/category/update',{categoryId,categoryName},'POST')