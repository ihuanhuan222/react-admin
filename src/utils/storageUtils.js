/**
 * 用来封装储存的方法
 */

import store from 'store';

//公共部分
const USER_KEY = 'user';

//保存数据的方法
export const setItem = value =>{
  //数据存在或者不能为函数
  if(value && typeof value !== 'function'){
    store.set(USER_KEY,value)
  }else {
    console.log('保存失败')
  }
}

//读取数据方法
export const getItem = ()=>{
  const value = store.get(USER_KEY);
  return value || ''
}

//删除数据方法
export const removeItem = ()=>{
  store.remove(USER_KEY)
}
