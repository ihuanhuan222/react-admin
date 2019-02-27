/*
 定义发送请求的模块
 */

import ajax from './ajax';

//公共部分
// const prefix = 'http://localhost:5000';
//webpack定义的环境变量 process.env.NODE_ENV ----development  production
const prefix  = process.env.NODE_ENV === "development" ? '':'http://localhost:5000'

//请求登录函数
export const reqLogin = (username,password) => ajax(prefix +'/login',{username,password},'POST')

//请求添加用户函数
export const reqAddLogin = user => ajax(prefix + '/manage/user/add',user,'POST')