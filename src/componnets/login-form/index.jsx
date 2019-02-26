import React,{Component} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
} from 'antd';

//注意事项：不要放在import上面
const Item = Form.Item;

export default class LoginForm extends Component{
  render(){
    return(
      <Form className="login-form-container">
        <Item>
          <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
        </Item>
        <Item>
          <Input placeholder="密码" prefix={<Icon type="safety" />}/>
        </Item>
        <Item>
          <Button type='primary' className='login-form-button'>登录</Button>
        </Item>
      </Form>
    )
  }
}