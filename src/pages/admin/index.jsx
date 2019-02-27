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

export default class Admin extends Component{
  render(){
    return(
      <Row className='admin'>
        <Col span={4}>
          <LeftNav />
        </Col>
        <Col span={20}>
          <Header/>
          <div className="admin-main">
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Redirect to='/home'/>
            </Switch>
          </div>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
