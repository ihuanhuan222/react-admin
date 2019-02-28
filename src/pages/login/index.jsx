//用户登录的路由组件
import React,{Component} from 'react';

//引入图片
import logo from '../../assets/images/logo.png';
//引入样式
import './index.less';
//引入其他组件
import LoginForm from '../../componnets/login-form';
import {reqLogin} from '../../api';
import {setItem} from '../../utils/storageUtils';
import MemoryUtils from '../../utils/memoryUtils';

export default class Login extends Component{
  state ={
    errMsg:''
  }
  //登录方法
  login = async(username,password)=>{
    //发送ajax请求
    const result = await reqLogin(username,password)
    console.log(result);
    if(result.status === 0){
      //登录成功 - 保存页面用户信息--并把用户信息保存在内存中--跳转到admin
      setItem(result.data);
      MemoryUtils.user = result.data
      this.props.history.replace('/')

    }else if(result.status ===1){
      //登录失败 -提示错误信息
      this.setState({
        errMsg: result.msg
      })
    }
  }
  render(){
    const {errMsg} =this.state;
    const height = errMsg ? 30:0
    return(
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-form">
          <div className="err-msg" style={{height}}>{errMsg}</div>
          <h2>用户登录</h2>
          <LoginForm login={this.login}/>
        </section>
      </div>
    )
  }
}