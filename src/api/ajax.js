/*
  封装发送ajax请求函数
  返回值是promise对象

*/

import axios from 'axios';
import {message} from 'antd';


export default function ajax(url,data = {},method = 'GET') {
  let promise = null;
  if(method === "GET"){
    promise = axios.get(url,{params:data})
  }else if(method === 'POST'){
    promise = axios.post(url,data)
  }

  return new Promise((resolve,reject)=>{
    promise
      .then(res =>{
        //将请求回来的数据返回
        resolve(res.data)
      })
      .catch(error =>{
        //处理失败
        console.log(error)
        message.error('请求失败')
      })
  })
}
