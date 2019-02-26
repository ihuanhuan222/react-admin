import React,{Component} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';

//注意事项：不要放在import上面
const Item = Form.Item;

class LoginForm extends Component{
  //表单验证的规则
  callback=(rule,value,callback)=>{
    if(!value){
      callback('不能为空')
    }else if(value.length <4){
      callback('不能少于4位')
    }else if(value.length >11){
      callback('不能超过11位')
    }else if(!(/^[a-zA-Z0-9_]+$/.test(value))){
      callback('密码必须是大小写英文，数字或者下划线')
    }else {
      callback();
    }
  }

  //收集表单数据
  handleSubmit = e=>{
    e.preventDefault();
    const {validateFields,resetFields} =  this.props.form;

    validateFields((error,values)=>{
      // console.log(error,values);
      if(!error){
        //验证成功
        console.log('收集的数据',values)
      }else {
        //验证失败 ---重置密码
        resetFields(['password'])
        //重新设置错误提醒
        const errMsg = Object.values(error).reduce((pre,cur)=>{
          return pre + cur.errors[0].message + ''
        },'')
        //提示错误
        message.error(errMsg)

      }

    })
  }
  render(){
    //表单验证
    const {getFieldDecorator,getFieldValue} = this.props.form;
    // console.log(getFieldValue)
    return(
      <Form className="login-form-container" onSubmit={this.handleSubmit}>
        <Item>
          {
            getFieldDecorator('usename',{
              rules:[
                {required: true, message: '请输入用户名'},
                {min: 4, message: '用户名必须大于等于4位'},
                {max: 11, message: '用户名不能超过11位'},
                {pattern: /^[a-zA-Z0-9_]+$/, message:'必须是大小写英文，数字或下划线'}
              ]
            })(
              <Input placeholder="用户名" prefix={<Icon type="user"/>}/>
            )
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'password',{
                rules:[
                  {validator:this.callback}
                ]
              }
            )(<Input placeholder="密码" type='password' prefix={<Icon type="safety" />}/>)
          }
        </Item>
        <Item>
          <Button type='primary' htmlType="submit" className='login-form-button'>登录</Button>
        </Item>
      </Form>
    )
  }
}
const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;