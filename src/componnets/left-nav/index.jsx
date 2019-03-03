import React,{Component} from 'react';
import {Menu,Icon} from 'antd';
import {NavLink,withRouter} from 'react-router-dom';

import './index.less';
import logo from '../../assets/images/logo.png';
import menuList from '../../config/menuConfig';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class LeftNav extends Component{

  //渲染前得到菜单项
  componentWillMount(){
    //把生成的菜单挂载到this上
    this.menu = this.createMenu(menuList)
  }

  createMenu = menu =>{
    return menu.map(item =>{
      //判断是否有子菜单
      if(item.children){
         //得到当前路径
          const {pathname} =this.props.location;
        //找是否有与children中匹配的pathname  -- indexOf：刷新时-自动展开左边列表，有带product的都能打开
          const result = item.children.find(item=>pathname.indexOf(item.key) ===0 );
          if(result){
            this.openKey = item.key;
          }

        return <SubMenu key={item.key} title={<span><Icon type={item.icon}/>{item.title}</span>}>
          {
            this.createMenu(item.children)
          }
        </SubMenu>
      }else {
        //没有子菜单
        return  <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }
    })
  }
  render(){
    //获取路由路径
    let {pathname} =this.props.location;

    //左边菜单自动选中
    if(/^\/product/.test(pathname)){
      pathname ='/product'
    }
    return(
      <div className="left-nav">
        <header>
          <NavLink to="/home" className="left-nav-header">
            <img src={logo} alt="logo"/>
            <h2>硅谷后台</h2>
          </NavLink>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={[this.openKey]}
        >
          {
            this.menu
          }
        </Menu>
      </div>
    )
  }
}
//withRouter是高阶组件
export default withRouter(LeftNav)