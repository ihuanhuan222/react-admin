//入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import {getItem} from './utils/storageUtils';
import MemoryUtils from './utils/memoryUtils';

import App from './App';


//将localStorage的值读取出来，并且保存在内存中
const user = getItem();
//判断一下有记录没
if(user && user._id){
  MemoryUtils.user = user
}

ReactDOM.render(
  <App/>
  ,document.getElementById('root'));
