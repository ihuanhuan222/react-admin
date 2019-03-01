import React, {Component} from 'react';
import {
  Card,
  Button,
  Icon,
  Table,
  message,
  Modal
} from 'antd';

import {reqCategories,reqAddCategory,reqUpdateCategoryName} from '../../api';
import AddCategoryForm from '../../componnets/add-category-form';
import UpdateCategoryNameForm from '../../componnets/update-category-name-form';


export default class Category extends Component {
  state = {
    categories:[],
    isAddShow: false,
    isupdateShow:false,
    category:{}
  }

  //点击成功添加的方法
  addCategory = async ()=>{
    //获取当前表单数据
    const {parentId,categoryName} =  this.form.getFieldsValue()
    console.log(parentId,categoryName)
    //发送请求，后台添加分类
    const result = await reqAddCategory(parentId,categoryName);
    console.log(result)
    if(result.status === 0){
      //请求成功
      message.success('后台添加分类成功')
      //更新数据 -- 把原来的数据和添加的放到一块
      this.setState({
        categories:[...this.state.categories,result.data],
        isAddShow:false
      })
    }else {
      //请求失败
      message.error('后台添加数据失败')
      //隐藏对话框
      this.setState({
        isAddShow:false
      })
    }

    //清空用户的输入 -- 不传参数就是全部清除
    this.form.resetFields()
  }

  //获取列表数据的方法
  getCategories = async parentId=>{
    const result = await reqCategories(parentId);
    if(result.status === 0){
      //获取列表成功
      this.setState({
        categories:result.data
      })
    }else {
      //获取列表失败
      message.error('获取列表数据失败')
    }

  }

  //修改分类名称的方法
  updateCategoryName = async ()=>{
    //获取修改后的名称
    const categoryName = this.form.getFieldValue('categoryName');
    //获取修改前的名称
    const {name,_id} = this.state.category;
    //判断修改前后是否一致，一致就不用修改
    if(categoryName === name){
      message.warn('请修改分类名称')
    }else {
      //修改名称
      //请求后台数据 - 发送请求 --(要修改的，修改后的)
      const result = await reqUpdateCategoryName(_id,categoryName)
      if(result.status === 0){
        message.success('修改分类成功');
        //关闭对话框
        this.setState({
          isupdateShow: false,
          //更新页面显示 --把数组里的值改成修改后的值
          categories: this.state.categories.map(item => {
            if(item._id === _id){
              item.name = categoryName
            }
            //不管成功和失败都要返回item -- 数组前面的值会没有变成undefinde ,只修改其中一个
            return item

          })
        })

      }else {
        message.error('修改分类失败');
        //关闭对话框
        this.setState({
          isupdateShow: false
        })
      }
    }
  }

  //不要在每次渲染一次就定义一次 --只渲染一次
  componentWillMount(){
    this.columns = [{
      title: '品类名称',
      dataIndex: 'name',
      // render: text =>text,
    }, {
      title: '操作',
      width:400,
      render: category=>{
        console.log(category)
        return <div>
          <a href="javascript:void(0)" onClick={()=> this.setState({isupdateShow:true,category})}>修改名称</a> &nbsp;&nbsp;&nbsp;
          <a href="javascript:void(0)">查看其子品类</a>
        </div>
      }
    }];
  }

  //发送ajax请求
  componentDidMount(){
    this.getCategories('0');
  }

  render () {

    const {categories,isAddShow,isupdateShow,category} = this.state;
    return (
      <Card
        title="一级分类列表"
        extra={<Button type='primary' onClick={()=>this.setState({isAddShow:true})}><Icon type="plus" />添加品类</Button>}
      >
        <Table
          columns={this.columns}
          dataSource={categories}
          bordered
          pagination ={{
            pageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true
          }}
          rowKey ='_id'
          loading ={categories.length === 0}
        />


        <Modal
          title="更新分类"
          okText='确认'
          cancelText='取消'
          visible={isupdateShow}
          onOk={this.updateCategoryName}
          onCancel={()=> this.setState({isupdateShow:false})}
          width={300}
        >
          <UpdateCategoryNameForm categoryName={category.name} setForm={form=>this.form=form}/>
        </Modal>

        <Modal
          title="添加分类"
          okText='确认'
          cancelText='取消'
          visible={isAddShow}
          onOk={this.addCategory}
          onCancel={()=> this.setState({isAddShow:false})}
        >
          <AddCategoryForm categories={categories} setForm={form=>this.form=form}/>
        </Modal>
      </Card>
    )
  }
}