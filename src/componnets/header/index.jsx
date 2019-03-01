import React,{Component} from 'react';
import {Row,Col,Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';

import MemoryUtils from '../../utils/memoryUtils';
import {removeItem} from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import {reqWeather} from '../../api';

import './index.less';

 class Header extends Component{
   state ={
     systime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
     dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
     weather:'晴'
   }

   componentDidMount(){
     this.Updata();
     this.getWeather();
   }

   //更新时间函数
   Updata =()=>{
     this.intervalId = setInterval(()=>{
       this.setState({
         systime:dayjs().format('YYYY-MM-DD HH:mm:ss')
       })
     },1000)
   }

   //天气信息函数
   getWeather = ()=>{
     reqWeather('北京')
       .then(res =>{
         this.setState({
           dayPictureUrl:res.dayPictureUrl,
           weather:res.weather
         })
       })
       .catch(err =>{
         message.error(err);
       })
   }

   componentWillUnmount(){
     //清除定时器
     clearInterval(this.intervalId);
   }

  //退出登录方法
  logOut = ()=>{
    Modal.confirm({
      title: '确定退出登录吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () =>{
        // console.log('OK');
        //清除用户信息（location 和内存中）
        removeItem();
        MemoryUtils.user = {};
        //跳转到login页面 --注意this 改箭头函数
        this.props.history.replace('/login')
      },
    });
  }
  //获取标题方法
  getTitle = menu =>{
    const {pathname} = this.props.location;
    for (let i = 0; i < menu.length; i++) {
      let item = menu[i];
      if(item.children){
        //递归去找是否有匹配的title，如果有才返回
        const title = this.getTitle(item.children)
        if(title){
          // console.log(title);
          return title
        }
      }else {
        if(item.key === pathname){
          console.log(item.title);
          return item.title
        }
      }
    }
   }

  render(){

    //获取用户保存信息
    const {username} = MemoryUtils.user;
    //获取标题
    const title = this.getTitle(menuList)
    //获取时间
    const {systime,weather,dayPictureUrl} = this.state;

    return(
      <div className="header">
        <Row className='header-top'>
          <span>欢迎，{username}</span>
          <a href="javascript:void(0);" onClick={this.logOut}>退出</a>
        </Row>
        <Row className="header-bottom">
          <Col span={6} className='header-bottom-left'>{title}</Col>
          <Col span={18} className='header-bottom-right'>
            <span>{systime}</span>
            <img src={dayPictureUrl} alt="天气"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(Header)