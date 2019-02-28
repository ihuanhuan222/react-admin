//后台管理的主路由组件
import React,{Component} from 'react';
import {Row,Col} from 'antd';
import {Route,Switch,Redirect} from 'react-router-dom'

import './index.less';
//引入其他组件
import LeftNav from '../../componnets/left-nav';
import Header from '../../componnets/header';
import Footer from '../../componnets/footer';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user';
import Pie from '../charts/pie';
import Line from '../charts/line';
import Bar from  '../charts/bar';
import MemoryUtils from '../../utils/memoryUtils';

export default class Admin extends Component{
  render(){
    //进行优化，把数据保存到内存中
    // const user = setItem();
    const user = MemoryUtils.user;
    console.log(user);
    //登录验证（保证第一次渲染和重新渲染都要做登陆验证）
    if(!user || !user._id){
      //如果没有登陆过，就跳转到login重新登录
      return <Redirect to='/login'/>
    }

    return(
      <Row className='admin'>
        <Col span={4}>
          <LeftNav />
        </Col>
        <Col span={20}>
          <Header/>
          <div className="admin-main">
            {/*<span>欢迎使用硅谷后台管理系统</span>*/}
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/pie' component={Pie}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/bar' component={Bar}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
