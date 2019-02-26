//用户登录的路由组件
import React,{Component} from 'react';

//引入图片
import logo from './logo.png';
//引入样式
import './index.less';
//引入其他组件
import LoginForm from '../../componnets/login-form';

export default class Login extends Component{
  render(){
    return(
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-form">
          <h2>用户登录</h2>
          <LoginForm/>
        </section>
      </div>
    )
  }
}